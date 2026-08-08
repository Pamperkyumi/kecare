<script lang="ts" setup>
interface ArticleData {
    title: string
    lang: string
    hash: string
    tags: string[]
    date: string
    urlPath: string
    content: string
}

interface SearchResult {
    article: ArticleData
    score: number
    contexts: string[]
    contentSearched: boolean
}

interface SearchIndexArticle {
    title: string
    lang: string
    hash: string
    tags: string[]
    date: string
    urlPath: string
    file: string
}

interface SearchIndexPayload {
    articles: SearchIndexArticle[]
}

const visible = ref(false)
const keyword = ref('')
const results = ref<SearchResult[]>([])
const loading = ref(false)
const contentSearching = ref(false)
const errorMessage = ref('')
const selectedLang = ref<string>('all')

const LANG_OPTIONS = [
    { value: 'all', label: '全部' },
    { value: 'zh-CN', label: '中文' },
    { value: 'en-US', label: 'English' },
    { value: 'ja-JP', label: '日本語' },
]

const indexArticles = shallowRef<SearchIndexArticle[]>([])
const contentCache = new Map<string, ArticleData>()

let initialized = false
let initPromise: Promise<void> | null = null
let searchTimer: ReturnType<typeof setTimeout> | null = null
let searchVersion = 0

const MAX_RESULTS = 10
const SEARCH_DELAY = 180
const BATCH_SIZE = 20

const normalizeText = (text: string): string => {
    return text
        .normalize('NFKC')
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s]/gu, ' ')
        .replace(/\s+/g, ' ')
        .trim()
}

const tokenize = (text: string): string[] => {
    const normalized = normalizeText(text)
    if (!normalized) return []

    const tokens: string[] = []
    const words = normalized.split(/\s+/)

    for (const word of words) {
        if (!word) continue

        // CJK（中日汉字）或日文假名，拆字 + 2gram
        if (/[\u3040-\u30ff\u3400-\u9fff]/u.test(word)) {
            for (let i = 0; i < word.length; i++) {
                tokens.push(word[i]!)
            }
            for (let i = 0; i < word.length - 1; i++) {
                tokens.push(word.slice(i, i + 2))
            }
            continue
        }

        if (word.length >= 2) {
            tokens.push(word)
        }
    }

    return uniqueTokens(tokens)
}

const uniqueTokens = (tokens: string[]): string[] => {
    return [...new Set(tokens)]
}

const escapeRegExp = (str: string): string => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
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

const calculateTitleScore = (query: string, article: SearchIndexArticle): number => {
    const normalizedQuery = normalizeText(query)
    const titleText = normalizeText(article.title)
    const tagsText = normalizeText((article.tags || []).join(' '))

    let score = 0

    if (titleText.includes(normalizedQuery)) {
        score += 10
        if (titleText.startsWith(normalizedQuery)) {
            score += 5
        }
    }

    if (tagsText.includes(normalizedQuery)) {
        score += 5
    }

    const queryTokens = uniqueTokens(tokenize(query))
    for (const token of queryTokens) {
        if (titleText.includes(token)) {
            score += 3
        }
        if (tagsText.includes(token)) {
            score += 2
        }
    }

    return score
}
const getFilteredArticles = (): SearchIndexArticle[] => {
    return indexArticles.value.filter((article) => {
        if (selectedLang.value === 'all') return true
        return article.lang === selectedLang.value
    })
}

const buildArticleDataFromIndex = (article: SearchIndexArticle): ArticleData => {
    return {
        title: article.title,
        lang: article.lang,
        hash: article.hash,
        tags: article.tags,
        date: article.date,
        urlPath: article.urlPath,
        content: ''
    }
}

const getCacheKey = (article: SearchIndexArticle): string => {
    return `${article.hash}.${article.lang}`
}

const loadArticleData = async (indexArticle: SearchIndexArticle): Promise<ArticleData | null> => {
    const cacheKey = getCacheKey(indexArticle)

    if (contentCache.has(cacheKey)) {
        return contentCache.get(cacheKey)!
    }

    try {
        const response = await fetch(`/articles/${indexArticle.file}`)
        if (!response.ok) {
            return null
        }

        const articleData = await response.json() as ArticleData

        // 无论是否命中搜索，都缓存正文，避免重复请求
        contentCache.set(cacheKey, articleData)
        return articleData
    } catch (error) {
        console.warn(`[search] Failed to load ${indexArticle.file}:`, error)
        return null
    }
}

const calculateContentScore = (
    query: string,
    content: string
): { score: number; contexts: string[] } => {
    const normalizedQuery = normalizeText(query)
    const contentText = normalizeText(content || '')
    const queryTokens = uniqueTokens(tokenize(query))

    let score = 0
    let matched = false

    if (normalizedQuery && contentText.includes(normalizedQuery)) {
        score += 8
        matched = true
    }

    for (const token of queryTokens) {
        if (!token) continue
        if (contentText.includes(token)) {
            score += token.length >= 2 ? 2 : 1
            matched = true
        }
    }

    return {
        score,
        contexts: matched ? extractAllContexts(content, query) : []
    }
}

const initializeIndex = async () => {
    if (initialized) return
    if (initPromise) return initPromise

    initPromise = (async () => {
        loading.value = true
        errorMessage.value = ''

        try {
            const response = await fetch('/articles/search-index.json')
            if (!response.ok) {
                throw new Error(`Failed to load search-index.json: ${response.status}`)
            }

            const payload = await response.json() as SearchIndexPayload
            indexArticles.value = Array.isArray(payload.articles) ? payload.articles : []

            initialized = true
        } catch (error) {
            console.error('[search] Failed to initialize index:', error)
            errorMessage.value = '搜索索引加载失败,对不起对不起对不起！'
            indexArticles.value = []
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


const searchNow = async () => {
    const currentVersion = ++searchVersion
    const query = keyword.value.trim()

    if (!query) {
        results.value = []
        contentSearching.value = false
        return
    }

    await initializeIndex()

    if (currentVersion !== searchVersion) return

    const filteredArticles = getFilteredArticles()

    // 先快速给一个标题 / 标签命中的预览结果
    const previewResults = filteredArticles
        .map((article) => {
            const score = calculateTitleScore(query, article)
            return { article, score }
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, MAX_RESULTS)

    const resultMap = new Map<string, SearchResult>()

    for (const item of previewResults) {
        const key = `${item.article.hash}.${item.article.lang}`
        resultMap.set(key, {
            article: buildArticleDataFromIndex(item.article),
            score: item.score,
            contexts: [],
            contentSearched: false
        })
    }

    results.value = [...resultMap.values()]
    contentSearching.value = true

    for (let i = 0; i < filteredArticles.length; i += BATCH_SIZE) {
        if (currentVersion !== searchVersion) {
            contentSearching.value = false
            return
        }

        const batch = filteredArticles.slice(i, i + BATCH_SIZE)

        const batchResults = await Promise.all(
            batch.map(async (indexArticle) => {
                const titleScore = calculateTitleScore(query, indexArticle)
                const articleData = await loadArticleData(indexArticle)

                if (!articleData) {
                    return {
                        indexArticle,
                        articleData: null,
                        totalScore: titleScore,
                        contexts: [],
                        matched: titleScore > 0
                    }
                }

                const contentMatch = calculateContentScore(query, articleData.content || '')
                const totalScore = titleScore + contentMatch.score

                return {
                    indexArticle,
                    articleData,
                    totalScore,
                    contexts: contentMatch.contexts,
                    matched: totalScore > 0
                }
            })
        )

        for (const item of batchResults) {
            const key = `${item.indexArticle.hash}.${item.indexArticle.lang}`
            const existing = resultMap.get(key)

            if (!item.matched) {
                if (existing) {
                    existing.contentSearched = true
                }
                continue
            }

            const baseArticle = item.articleData ?? buildArticleDataFromIndex(item.indexArticle)

            if (existing) {
                existing.article = baseArticle
                existing.score = item.totalScore
                existing.contexts = item.contexts
                existing.contentSearched = true
            } else {
                resultMap.set(key, {
                    article: baseArticle,
                    score: item.totalScore,
                    contexts: item.contexts,
                    contentSearched: true
                })
            }
        }

        results.value = [...resultMap.values()]
            .sort((a, b) => b.score - a.score)
            .slice(0, MAX_RESULTS)
    }

    contentSearching.value = false
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
                            <span v-if="contentSearching && !result.contentSearched"
                                class="item-searching">搜索内容中...</span>
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

:global(.dark) .search-container {
    background: rgba(31, 41, 55, 0.95);
}

.search-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

:global(.dark) .search-header {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
    color: #4fc3f7;
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
    background: #fff;
    color: #333;
}

:global(.dark) .search-input {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(55, 65, 81, 1);
    color: #e5e7eb;
}

.search-input:focus {
    border-color: #4fc3f7;
    box-shadow: 0 0 0 3px rgba(79, 195, 247, 0.15);
}

.search-input::placeholder {
    color: #999;
}

:global(.dark) .search-input::placeholder {
    color: #9ca3af;
}

.search-input:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
}

:global(.dark) .search-input:disabled {
    background: rgba(55, 65, 81, 0.5);
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

:global(.dark) .search-lang-select {
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #e5e7eb;
    background: rgba(55, 65, 81, 1);
}

.search-lang-select:focus {
    border-color: #4fc3f7;
    box-shadow: 0 0 0 3px rgba(79, 195, 247, 0.15);
}

.search-lang-select:hover {
    border-color: rgba(79, 195, 247, 0.3);
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

:global(.dark) .search-close {
    background: rgba(255, 255, 255, 0.1);
    color: #9ca3af;
}

.search-close:hover {
    background: rgba(79, 195, 247, 0.15);
    color: #4fc3f7;
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
    background: rgba(79, 195, 247, 0.08);
}

.item-title {
    font-size: 15px;
    font-weight: 600;
    color: #333;
    margin-bottom: 6px;
}

:global(.dark) .item-title {
    color: #e5e7eb;
}

.item-meta {
    display: flex;
    gap: 12px;
    margin-bottom: 6px;
}

.item-lang {
    font-size: 12px;
    color: #4fc3f7;
    background: rgba(79, 195, 247, 0.1);
    padding: 2px 8px;
    border-radius: 4px;
}

.item-date {
    font-size: 12px;
    color: #999;
}

:global(.dark) .item-date {
    color: #9ca3af;
}

.item-searching {
    font-size: 12px;
    color: #ffa726;
    background: rgba(255, 167, 38, 0.1);
    padding: 2px 8px;
    border-radius: 4px;
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

:global(.dark) .item-desc {
    color: #9ca3af;
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

:global(.dark) .item-context {
    color: #9ca3af;
}

.item-context :deep(.highlight) {
    background: rgba(79, 195, 247, 0.25);
    color: #4fc3f7;
    padding: 0 2px;
    border-radius: 2px;
    font-weight: 500;
}

.item-title :deep(.highlight) {
    background: rgba(79, 195, 247, 0.25);
    color: #4fc3f7;
    padding: 0 2px;
    border-radius: 2px;
}
</style>
