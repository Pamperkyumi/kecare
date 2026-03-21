import type { ArticleVariant, KecareContext, SearchArticleData } from "kecare";
import { Glob, write } from "bun";
import { join, basename, } from "node:path";
import { copyFile, mkdir, rm } from "node:fs/promises";

interface SearchIndexArticle {
    title: string;
    lang: string;
    hash: string;
    tags: string[];
    date: string;
    urlPath: string;
    file: string;
}

interface SearchIndex {
    articles: SearchIndexArticle[];
}

async function createSearchModuleHandler(context: KecareContext) {
    const articles: SearchArticleData[] = [];
    const indexArticles: SearchIndexArticle[] = [];

    const publicPath = join(context.projectPath, 'public', 'articles');

    await rm(publicPath, { recursive: true, force: true });
    await mkdir(publicPath, { recursive: true });


    const module = {
        async handle(article: ArticleVariant) {
            const urlPath = article.__REAL_RELATIVE_PATHS__;
            const jsonFileName = `${article.hash}.${article.lang}.json`;

            articles.push({
                title: article.title,
                lang: article.lang,
                hash: article.hash,
                tags: article.frontMatter.tags,
                date: article.frontMatter.date,
                urlPath: urlPath,
                content: article.lang === 'zh-CN' ? article.rawMarkdown : article.translatedMarkdown
            });

            indexArticles.push({
                title: article.title,
                lang: article.lang,
                hash: article.hash,
                tags: article.frontMatter.tags,
                date: article.frontMatter.date,
                urlPath: urlPath,
                file: jsonFileName
            });
        },
        async finish(context: KecareContext) {

            for (const article of articles) {
                const jsonFileName = `${article.hash}.${article.lang}.json`;
                const jsonPath = join(publicPath, jsonFileName);
                await write(jsonPath, JSON.stringify(article, null, 2));
            }

            const indexPath = join(publicPath, 'search-index.json');
            const indexData: SearchIndex = { articles: indexArticles };
            await write(indexPath, JSON.stringify(indexData, null, 2));
        }
    };
    return module;
}

let instancePromise: Promise<any> | null = null;

export function useSearchModuleHandler(context: KecareContext): Promise<ReturnType<typeof createSearchModuleHandler>> {
    if (!instancePromise) instancePromise = createSearchModuleHandler(context);
    return instancePromise as Promise<ReturnType<typeof createSearchModuleHandler>>;
}
