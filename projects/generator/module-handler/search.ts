import type { KecareContext } from "kecare";
import { write } from "bun";
import { join } from "node:path";
import { mkdir, rm } from "node:fs/promises";
import { useArticleCollector } from "./article-collector.ts";

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

/**
 * 搜索模块处理程序（内建模块，无模板文件）。
 * 文章数据统一从 article-collector 派生，索引条目再从同一份数据派生，
 * 不再维护 articles + indexArticles 两份平行数组
 */
async function createSearchModuleHandler(context: KecareContext) {
    const publicPath = join(context.projectPath, 'public', 'articles');

    // 每次生成都重建搜索索引目录，避免残留已删除文章的 JSON
    await rm(publicPath, { recursive: true, force: true });
    await mkdir(publicPath, { recursive: true });

    const module = {
        async finish(context: KecareContext) {
            const searchArticles = useArticleCollector(context).toSearchArticles();

            // 每篇文章每个语言一份 JSON，正文供前端搜索读取
            for (const article of searchArticles) {
                const jsonFileName = `${article.hash}.${article.lang}.json`;
                const jsonPath = join(publicPath, jsonFileName);
                await write(jsonPath, JSON.stringify(article, null, 2));
            }

            // 索引条目从同一份搜索数据派生，仅去掉 content、补上文件名
            const indexArticles: SearchIndexArticle[] = [];
            for (const article of searchArticles) {
                indexArticles.push({
                    title: article.title,
                    lang: article.lang,
                    hash: article.hash,
                    tags: article.tags,
                    date: article.date,
                    urlPath: article.urlPath,
                    file: `${article.hash}.${article.lang}.json`,
                });
            }

            const indexPath = join(publicPath, 'search-index.json');
            const indexData: SearchIndex = { articles: indexArticles };
            await write(indexPath, JSON.stringify(indexData, null, 2));
        }
    };
    return module;
}

// 以 context 为键缓存处理器实例：每次 gen 都会创建新的 context，
// 因此同进程多次调用（测试、watch 模式）不会复用上一轮的处理器及其内部状态
const instances = new WeakMap<KecareContext, ReturnType<typeof createSearchModuleHandler>>();

export function useSearchModuleHandler(context: KecareContext): ReturnType<typeof createSearchModuleHandler> {
    let instance = instances.get(context);
    if (!instance) {
        instance = createSearchModuleHandler(context);
        instances.set(context, instance);
    }
    return instance;
}
