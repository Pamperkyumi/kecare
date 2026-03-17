import type { ArticleVariant, KecareContext } from "kecare";
import { Glob, write } from "bun";
import { join, basename, parse } from "node:path";
import { copyFile, mkdir } from "node:fs/promises";

interface SearchArticleData {
    title: string;
    lang: string;
    hash: string;
    tags: Array<string>;
    date: string;
    urlPath: string;
    content: string;
}

interface SearchIndex {
    files: string[];
}

async function createSearchModuleHandler(context: KecareContext) {
    const articles: SearchArticleData[] = [];
    const files: string[] = [];

    const articlesPath = join(context.projectPath, '.kecare', 'articles');
    const publicPath = join(context.projectPath, 'public');

    await mkdir(publicPath, { recursive: true });

    const module = {
        async handle(article: ArticleVariant) {
            const urlPath = article.__REAL_RELATIVE_PATHS__;
            articles.push({
                title: article.title,
                lang: article.lang,
                hash: article.hash,
                tags: article.frontMatter.tags,
                date: article.frontMatter.date,
                urlPath: urlPath,
                content: article.lang === 'zh-CN' ? article.rawMarkdown : article.translatedMarkdown
            });
        },
        async finish(context: KecareContext) {

            for (const article of articles) {
                const jsonFileName = `${article.hash}.${article.lang}.json`;
                const jsonPath = join(publicPath, jsonFileName);
                await write(jsonPath, JSON.stringify(article, null, 2));
                files.push(jsonFileName);
            }

            const indexPath = join(publicPath, 'search-index.json');
            const indexData: SearchIndex = { files };
            await write(indexPath, JSON.stringify(indexData, null, 2));

            const glob = new Glob(`${articlesPath}/**/*.md`);
            for await (const file of glob.scan(".")) {
                const fileName = basename(file);
                const destPath = join(publicPath, fileName);
                await copyFile(file, destPath);
            }
        }
    };
    return module;
}

let instancePromise: Promise<any> | null = null;

export function useSearchModuleHandler(context: KecareContext): Promise<ReturnType<typeof createSearchModuleHandler>> {
    if (!instancePromise) instancePromise = createSearchModuleHandler(context);
    return instancePromise as Promise<ReturnType<typeof createSearchModuleHandler>>;
}
