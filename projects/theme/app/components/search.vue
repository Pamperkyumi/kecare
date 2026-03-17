<script lang="ts" setup>
interface ArticleData {
    title: string
    lang: string
    hash: string
    tags: string[]
    date: string
    urlPath: string
    desc: string
    content: string
}

interface SearchResult {
    article: ArticleData
    score: number
    contexts: string[]
}

interface SearchIndexPayload {
    files: string[]
}

interface PreparedArticle {
    article: ArticleData
    tf: Map<string, number>
    docLength: number
    titleText: string
    descText: string
    tagsText: string
}

const visible = ref(false)
const keyword = ref('')
const results = ref<SearchResult[]>([])
const loading = ref(false)
const errorMessage = ref('')
const selectedLang = ref<string>('all')

const LANG_OPTIONS = [
    { value: 'all', label: '全部' },
    { value: 'zh-CN', label: '中文' },
    { value: 'en-US', label: 'English' },
    { value: 'ja-JP', label: '日本語' },
]

const preparedArticles = shallowRef<PreparedArticle[]>([])

let avgDocLength = 1
let initialized = false
let initPromise: Promise<void> | null = null
let searchTimer: ReturnType<typeof setTimeout> | null = null
let searchVersion = 0

const idfMap = new Map<string, number>()

const K1 = 1.2
const B = 0.75
const MAX_RESULTS = 10
const SEARCH_DELAY = 180

const FIELD_WEIGHT = {
    title: 4,
    tags: 3,
    desc: 2,
    content: 1,
} as const

const normalizeText = (text: string): string => {
    return text
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
}

const extractAllContexts = (content: string, query: string, contextLength: number = 100, maxContexts: number = 2): string[] => {
    const normalizedContent = content.toLowerCase()
    const normalizedQuery = query.toLowerCase().trim()
    const contexts: string[] = []
    const usedRanges: Array<{ start: number; end: number }> = []

    if (!normalizedQuery) return contexts

    const tokens = uniqueTokens(tokenize(query))
    const searchTerms = [normalizedQuery, ...tokens.map(t => t.toLowerCase())]

    for (const term of searchTerms) {
        if (contexts.length >= maxContexts) break
        if (!term) continue

        let searchPos = 0
        while (searchPos < normalizedContent.length && contexts.length < maxContexts) {
            const index = normalizedContent.indexOf(term, searchPos)
            if (index === -1) break

            const start = Math.max(0, index - contextLength)
            const end = Math.min(content.length, index + term.length + contextLength)

            const overlapsExisting = usedRanges.some(range =>
                (start >= range.start && start < range.end) ||
                (end > range.start && end <= range.end) ||
                (start <= range.start && end >= range.end)
            )

            if (!overlapsExisting) {
                contexts.push(content.slice(start, end))
                usedRanges.push({ start, end })
            }

            searchPos = index + 1
        }
    }

    return contexts
}

const highlightKeyword = (text: string, query: string): string => {
    if (!query.trim() || !text) return text

    const tokens = uniqueTokens(tokenize(query))
    if (tokens.length === 0) return text

    let result = text

    const sortedTokens = [...tokens].sort((a, b) => b.length - a.length)

    for (const token of sortedTokens) {
        const regex = new RegExp(`(${escapeRegExp(token)})`, 'gi')
        result = result.replace(regex, '<mark class="highlight">$1</mark>')
    }

    return result
}

const escapeRegExp = (str: string): string => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const tokenize = (text: string): string[] => {
    const normalized = normalizeText(text)
    if (!normalized) return []

    const tokens: string[] = []
    const words = normalized.split(' ')

    for (const word of words) {
        if (!word) continue

        // 中文：单字 + 双字切片
        if (/[\u4e00-\u9fa5]/.test(word)) {
            for (let i = 0; i < word.length; i++) {
                tokens.push(word[i]!)
            }
            for (let i = 0; i < word.length - 1; i++) {
                tokens.push(word.slice(i, i + 2))
            }
            continue
        }

        // 英文 / 数字
        if (word.length >= 2) {
            tokens.push(word)
        }
    }

    return tokens
}

const uniqueTokens = (tokens: string[]): string[] => {
    return [...new Set(tokens)]
}

const addWeightedTokens = (
    tf: Map<string, number>,
    tokens: string[],
    weight: number,
) => {
    for (const token of tokens) {
        tf.set(token, (tf.get(token) || 0) + weight)
    }
}

const buildPreparedArticle = (article: ArticleData): PreparedArticle => {
    const titleTokens = tokenize(article.title)
    const tagsTokens = tokenize((article.tags || []).join(' '))
    const descTokens = tokenize(article.desc || '')
    const contentTokens = tokenize(article.content || '')

    const tf = new Map<string, number>()

    addWeightedTokens(tf, titleTokens, FIELD_WEIGHT.title)
    addWeightedTokens(tf, tagsTokens, FIELD_WEIGHT.tags)
    addWeightedTokens(tf, descTokens, FIELD_WEIGHT.desc)
    addWeightedTokens(tf, contentTokens, FIELD_WEIGHT.content)

    let docLength = 0
    for (const value of tf.values()) {
        docLength += value
    }

    return {
        article,
        tf,
        docLength,
        titleText: normalizeText(article.title),
        descText: normalizeText(article.desc || ''),
        tagsText: normalizeText((article.tags || []).join(' ')),
    }
}

const initializeIndex = async () => {
    if (initialized) return
    if (initPromise) return initPromise

    initPromise = (async () => {
        loading.value = true
        errorMessage.value = ''

        try {
            const response = await fetch('/search-index.json')
            if (!response.ok) {
                throw new Error(`Failed to load search-index.json: ${response.status}`)
            }

            const payload = await response.json() as SearchIndexPayload
            const files = Array.isArray(payload.files) ? payload.files : []

            const articles: ArticleData[] = []
            for (const file of files) {
                try {
                    const articleResponse = await fetch(`/${file}`)
                    if (articleResponse.ok) {
                        const articleData = await articleResponse.json() as ArticleData
                        articles.push(articleData)
                    }
                } catch (e) {
                    console.warn(`[search] Failed to load ${file}:`, e)
                }
            }

            const tempPrepared = articles.map(buildPreparedArticle)

            const documentFrequency = new Map<string, number>()
            let totalLength = 0

            for (const doc of tempPrepared) {
                totalLength += doc.docLength

                for (const token of doc.tf.keys()) {
                    documentFrequency.set(token, (documentFrequency.get(token) || 0) + 1)
                }
            }

            preparedArticles.value = tempPrepared
            avgDocLength = tempPrepared.length > 0 ? totalLength / tempPrepared.length : 1

            idfMap.clear()
            const N = tempPrepared.length || 1

            for (const [token, n] of documentFrequency) {
                const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5))
                idfMap.set(token, idf)
            }

            initialized = true
        } catch (error) {
            console.error('[search] Failed to initialize index:', error)
            errorMessage.value = '搜索索引加载失败,对不起对不起对不起！'
            preparedArticles.value = []
            avgDocLength = 1
        } finally {
            loading.value = false
        }
    })()

    try {
        await initPromise
    } finally {
        initPromise = null
    }
}

const calculateBM25Score = (
    queryTokens: string[],
    normalizedQuery: string,
    doc: PreparedArticle,
): number => {
    let score = 0
    let matchedTerms = 0

    for (const token of queryTokens) {
        const f = doc.tf.get(token) || 0
        if (f <= 0) continue

        matchedTerms++

        const idf = idfMap.get(token) || 0
        const numerator = f * (K1 + 1)
        const denominator = f + K1 * (1 - B + B * (doc.docLength / avgDocLength))

        score += idf * (numerator / denominator)
    }

    if (matchedTerms === 0) return 0

    // 多词查询时，命中词越全越加分
    if (queryTokens.length > 1) {
        score *= matchedTerms / queryTokens.length
    }

    // 精确包含加分
    if (normalizedQuery) {
        if (doc.titleText.includes(normalizedQuery)) {
            score += 8
        } else if (doc.tagsText.includes(normalizedQuery)) {
            score += 5
        } else if (doc.descText.includes(normalizedQuery)) {
            score += 2
        }
    }

    return score
}

const searchNow = async () => {
    const currentVersion = ++searchVersion
    const query = keyword.value.trim()

    if (!query) {
        results.value = []
        return
    }

    await initializeIndex()

    // 如果这次搜索已经过时，就直接丢弃
    if (currentVersion !== searchVersion) return

    const normalizedQuery = normalizeText(query)
    const queryTokens = uniqueTokens(tokenize(query))

    if (queryTokens.length === 0) {
        results.value = []
        return
    }

    const ranked = preparedArticles.value
        .filter((doc) => {
            if (selectedLang.value === 'all') return true
            return doc.article.lang === selectedLang.value
        })
        .map((doc) => ({
            article: doc.article,
            score: calculateBM25Score(queryTokens, normalizedQuery, doc),
            contexts: extractAllContexts(doc.article.content, query),
        }))
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, MAX_RESULTS)

    if (currentVersion !== searchVersion) return

    results.value = ranked
}

const scheduleSearch = () => {
    if (searchTimer) {
        clearTimeout(searchTimer)
    }

    if (!keyword.value.trim()) {
        results.value = []
        return
    }

    searchTimer = setTimeout(() => {
        void searchNow()
    }, SEARCH_DELAY)
}

const open = () => {
    visible.value = true
    void initializeIndex()
}

const close = () => {
    visible.value = false
    keyword.value = ''
    results.value = []
    errorMessage.value = ''
    selectedLang.value = 'all'
    searchVersion++

    if (searchTimer) {
        clearTimeout(searchTimer)
        searchTimer = null
    }
}

watch(keyword, () => {
    scheduleSearch()
})

watch(selectedLang, () => {
    scheduleSearch()
})

defineExpose({
    open,
    close,
})
</script>

<template>
    <div v-if="visible" class="search-overlay" @click.self="close">
        <div class="search-container">
            <div class="search-header">
                <div class="search-logo">
                    <span class="logo-icon">🔍</span>
                    <span class="logo-text">搜索</span>
                </div>
                <input v-model="keyword" type="text" class="search-input" placeholder="输入关键词搜索文章..."
                    :disabled="loading" />
                <select v-model="selectedLang" class="search-lang-select">
                    <option v-for="opt in LANG_OPTIONS" :key="opt.value" :value="opt.value">
                        {{ opt.label }}
                    </option>
                </select>
                <button class="search-close" @click="close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div class="search-results">
                <div v-if="loading" class="search-loading">
                    <span class="loading-text">正在加载索引... 不要着急哦宝宝~</span>
                </div>
                <div v-else-if="keyword.trim() && results.length === 0" class="search-empty">
                    <span class="empty-text">未找到相关文章，宝宝可以尝试搜索其他关键词哦~</span>
                </div>
                <div v-else-if="results.length > 0" class="search-list">
                    <NuxtLink v-for="result in results" :key="result.article.hash + result.article.lang"
                        :to="`/${result.article.urlPath}`" class="search-item" @click="close">
                        <div class="item-title" v-html="highlightKeyword(result.article.title, keyword)"></div>
                        <div class="item-meta">
                            <span class="item-lang">{{ result.article.lang }}</span>
                            <span class="item-date">{{ result.article.date }}</span>
                        </div>
                        <div v-for="(ctx, idx) in result.contexts" :key="idx" class="item-context"
                            v-html="highlightKeyword(ctx, keyword)">
                        </div>
                    </NuxtLink>
                </div>
                <div v-else class="search-placeholder">
                    <span class="placeholder-text">输入关键词开始搜索</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.search-overlay {
    position: fixed;
    inset: 0;
    z-index: 2000;
    display: grid;
    place-items: flex-start center;
    padding-top: 15vh;
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(4px);
}

.search-container {
    width: 90%;
    max-width: 600px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
    overflow: hidden;
}

.search-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.search-logo {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
}

.logo-icon {
    font-size: 20px;
}

.logo-text {
    font-size: 16px;
    font-weight: 600;
    color: #ff6b93;
}

.search-input {
    flex: 1;
    height: 40px;
    padding: 0 16px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    font-size: 15px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.search-input:focus {
    border-color: #ff6b93;
    box-shadow: 0 0 0 3px rgba(255, 107, 147, 0.15);
}

.search-input::placeholder {
    color: #999;
}

.search-input:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
}

.search-lang-select {
    height: 40px;
    padding: 0 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    font-size: 14px;
    color: #333;
    background: #fff;
    cursor: pointer;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    flex-shrink: 0;
}

.search-lang-select:focus {
    border-color: #ff6b93;
    box-shadow: 0 0 0 3px rgba(255, 107, 147, 0.15);
}

.search-lang-select:hover {
    border-color: rgba(255, 107, 147, 0.3);
}

.search-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.05);
    color: #666;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    flex-shrink: 0;
}

.search-close:hover {
    background: rgba(255, 107, 147, 0.15);
    color: #ff6b93;
}

.search-results {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
}

.search-loading,
.search-empty,
.search-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    color: #999;
    font-size: 14px;
}

.search-list {
    padding: 8px 0;
}

.search-item {
    display: block;
    padding: 12px 20px;
    text-decoration: none;
    color: inherit;
    transition: background 0.2s;
    cursor: pointer;
}

.search-item:hover {
    background: rgba(255, 107, 147, 0.08);
}

.item-title {
    font-size: 15px;
    font-weight: 600;
    color: #333;
    margin-bottom: 6px;
}

.item-meta {
    display: flex;
    gap: 12px;
    margin-bottom: 6px;
}

.item-lang {
    font-size: 12px;
    color: #ff6b93;
    background: rgba(255, 107, 147, 0.1);
    padding: 2px 8px;
    border-radius: 4px;
}

.item-date {
    font-size: 12px;
    color: #999;
}

.item-desc {
    font-size: 13px;
    color: #666;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}

.item-context {
    font-size: 13px;
    color: #666;
    line-height: 1.6;
    margin-top: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.item-context :deep(.highlight) {
    background: rgba(255, 107, 147, 0.25);
    color: #ff6b93;
    padding: 0 2px;
    border-radius: 2px;
    font-weight: 500;
}

.item-title :deep(.highlight) {
    background: rgba(255, 107, 147, 0.25);
    color: #ff6b93;
    padding: 0 2px;
    border-radius: 2px;
}
</style>
