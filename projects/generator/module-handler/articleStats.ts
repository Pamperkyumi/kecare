import type { ArticleVariant, KecareContext, ArchiveArticleData, ArticleStats } from "kecare";

// 全局收集的文章元数据，用于计算聚合统计
let articlesList: ArchiveArticleData[] = [];

/**
 * 在 emitArticleHandle 中调用，收集文章元数据
 */
export function collectArticleData(article: ArticleVariant) {
    articlesList.push({
        title: article.title,
        lang: article.lang,
        hash: article.hash,
        tags: article.frontMatter.tags,
        date: article.frontMatter.date,
        fsPath: article.__REAL_FS_PATHS__ || '',
        urlPath: article.__REAL_RELATIVE_PATHS__ || '',
    });
}

/**
 * 在 emitModuleFinish 中调用，集中计算聚合统计数据并写入 context
 */
export function computeArticleStats(context: KecareContext) {
    const allTagsSet = new Set<string>();
    const perLang: ArticleStats['perLang'] = {};

    for (const article of articlesList) {
        if (!perLang[article.lang]) {
            perLang[article.lang] = { total: 0, tags: {} };
        }
        perLang[article.lang]!.total++;

        for (const tag of article.tags) {
            allTagsSet.add(tag);
            if (!perLang[article.lang]!.tags[tag]) {
                perLang[article.lang]!.tags[tag] = 0;
            }
            perLang[article.lang]!.tags[tag]!;
        }
    }

    context.articleStats = {
        perLang,
        allTags: [...allTagsSet],
        totalArticles: articlesList.length,
    };
}