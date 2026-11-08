import type { ArchiveArticleData, ArticleStats, ArticleVariant, ArticlesRecord, KecareContext, SearchArticleData } from "kecare";

/**
 * 统一的文章数据收集器。
 *
 * 原先 list（articles）、search（articles + indexArticles）、archives（archivesData）、
 * articleStats（collectArticleData）四处在 emitArticleHandle 中各自收集一份相同数据，
 * 收集逻辑重复且容易漂移。现在 emitArticleHandle 只调用一次 collect()，
 * finish 阶段各模块从同一份数据派生各自需要的视图：
 *   - toArticlesRecord()   → list 模板（ArticlesRecord）
 *   - toSearchArticles()   → 搜索索引 JSON（SearchArticleData[]）
 *   - toArchiveArticles()  → 归档模板（ArchiveArticleData[]）
 *   - computeStats()       → context.articleStats 聚合统计
 *
 * collect() 在 article 处理器之后调用，此时 __REAL_FS_PATHS__ 等产物登记已写入 variant；
 * html 在收集时立即丢弃（finish 阶段没有消费者需要），控制全量文章驻留内存。
 *
 * 文章是并发处理的（executeInputDrivers 按批 Promise.all），完成顺序每次不同；
 * 派生视图前按 relativePath + lang 排序，保证列表 / 归档 / 搜索索引的输出顺序确定，
 * 否则相同输入会产生漂移的产物（模板中稳定排序遇到相同日期的平局会保留这个随机顺序）。
 */

// 收集后的文章数据：html 已丢弃，其余字段完整保留（搜索需要 rawMarkdown / translatedMarkdown）
type CollectedArticle = Omit<ArticleVariant, 'html'> & { html?: undefined };

type ArticleCollectorModule = {
    collect: (article: ArticleVariant) => void;
    toArticlesRecord: () => ArticlesRecord;
    toSearchArticles: () => SearchArticleData[];
    toArchiveArticles: () => ArchiveArticleData[];
    computeStats: (context: KecareContext) => void;
};

function createArticleCollector(): ArticleCollectorModule {
    // hash → lang → 变体 的两级 Map
    const store = new Map<string, Map<string, CollectedArticle>>();

    // 按 relativePath + lang 排序出全部变体（代码单元序，跨环境稳定，不用 localeCompare），
    // 供各派生视图使用，保证输出顺序确定
    function sortedEntries(): CollectedArticle[] {
        const entries: CollectedArticle[] = [];
        for (const langMap of store.values()) {
            for (const article of langMap.values()) entries.push(article);
        }
        entries.sort((a, b) => {
            const pathA = String(a.relativePath);
            const pathB = String(b.relativePath);
            if (pathA < pathB) return -1;
            if (pathA > pathB) return 1;
            if (a.lang < b.lang) return -1;
            if (a.lang > b.lang) return 1;
            return 0;
        });
        return entries;
    }

    return {
        collect(article: ArticleVariant) {
            // html 无消费者，收集时立即丢弃以节约内存
            const collected: CollectedArticle = { ...article, html: undefined };
            let langMap = store.get(article.hash);
            if (!langMap) {
                langMap = new Map();
                store.set(article.hash, langMap);
            }
            langMap.set(article.lang, collected);
        },

        toArticlesRecord(): ArticlesRecord {
            // record 的 key 顺序即文章遍历顺序，同样按排序后的顺序写入
            const record: ArticlesRecord = {};
            for (const article of sortedEntries()) {
                let langRecord = record[article.hash];
                if (!langRecord) {
                    langRecord = {};
                    record[article.hash] = langRecord;
                }
                // 保持原有输出形状：完整变体数据 + 产物代表路径，正文与原文置空节约内存
                langRecord[article.lang] = {
                    ...article,
                    fsPath: article.__REAL_FS_PATHS__?.[0] ?? '',
                    urlPath: article.__REAL_RELATIVE_PATHS__?.[0] ?? '',
                    html: undefined,
                    rawMarkdown: undefined,
                };
            }
            return record;
        },

        toSearchArticles(): SearchArticleData[] {
            const searchArticles: SearchArticleData[] = [];
            for (const article of sortedEntries()) {
                searchArticles.push({
                    title: article.title,
                    lang: article.lang,
                    hash: article.hash,
                    tags: article.frontMatter.tags,
                    date: article.frontMatter.date,
                    urlPath: article.__REAL_RELATIVE_PATHS__?.[0] ?? '',
                    // 原始语言取原文、译文语言取译文
                    // （原实现硬编码 zh-CN 判断，非中文原创站点会把原文塞进译文索引）
                    content: (article.isOriginalLang ? article.rawMarkdown : article.translatedMarkdown) ?? '',
                });
            }
            return searchArticles;
        },

        toArchiveArticles(): ArchiveArticleData[] {
            const archiveArticles: ArchiveArticleData[] = [];
            for (const article of sortedEntries()) {
                archiveArticles.push({
                    title: article.title,
                    lang: article.lang,
                    hash: article.hash,
                    tags: article.frontMatter.tags,
                    date: article.frontMatter.date,
                    fsPath: article.__REAL_FS_PATHS__?.[0] ?? '',
                    urlPath: article.__REAL_RELATIVE_PATHS__?.[0] ?? '',
                });
            }
            return archiveArticles;
        },

        computeStats(context: KecareContext) {
            const allTagsSet = new Set<string>();
            const perLang: ArticleStats['perLang'] = {};

            for (const langMap of store.values()) {
                for (const article of langMap.values()) {
                    if (!perLang[article.lang]) {
                        perLang[article.lang] = { total: 0, tags: {} };
                    }
                    perLang[article.lang]!.total++;

                    const langTags = perLang[article.lang]!.tags;
                    for (const tag of article.frontMatter.tags) {
                        allTagsSet.add(tag);
                        // noUncheckedIndexedAccess 下 langTags[tag] 为 number | undefined，用 ?? 兜底再累加
                        langTags[tag] = (langTags[tag] ?? 0) + 1;
                    }
                }
            }

            // 全部变体总数（与原先 collectArticleData 收集的条目数一致）
            let totalArticles = 0;
            for (const langMap of store.values()) totalArticles += langMap.size;

            context.articleStats = {
                perLang,
                allTags: [...allTagsSet],
                totalArticles,
            };
        },
    };
}

// 以 context 为键缓存收集器实例：每次 gen 都会创建新的 context，
// 收集器随 context 重建，避免 dev 多周期间残留上一轮数据
const instances = new WeakMap<KecareContext, ArticleCollectorModule>();

export function useArticleCollector(context: KecareContext): ArticleCollectorModule {
    let instance = instances.get(context);
    if (!instance) {
        instance = createArticleCollector();
        instances.set(context, instance);
    }
    return instance;
}
