import type { ArticleVariant, KecareContext, ModuleListTS } from "kecare";
import { Glob, write } from "bun";
import { join } from "node:path";


/**
 * 创建文章列表模块处理程序
 * 会读取 *.list.ts 文件，调用其 generator 方法，生成文章列表页面
 * @param context 
 * @returns 
 */
async function createListModuleHandler(context: KecareContext) {
    // 开始：这里的代码，在初始化的时候就会被执行，只执行一次
    const modulePath = join(context.projectPath, '.kecare');
    const glob = new Glob(`${modulePath}/**/*.{list.ts}`);

    const modules: Array<Promise<ModuleListTS>> = [];
    for await (const file of glob.scan(".")) modules.push(await import(file));

    // 结束：这里的代码，在初始化的时候就会被执行，只执行一次
    const articles: Parameters<ModuleListTS['generator']>[1] = {};

    const module = {
        async handle(article: ArticleVariant) {
            // 在此阶段，我们需要记录文章的真实写入文件的路径和 URL 路径，然后整理一份全部文章的列表 (变量 articles)
            const fsPath = article.__REAL_FS_PATHS__; // 上一阶段记录的真实写入文件的路径
            const urlPath = article.__REAL_RELATIVE_PATHS__; // 上一阶段记录的 URL 路径
            if (!(article.hash in articles)) articles[article.hash] = {};
            const articleData = articles[article.hash]!;
            articleData[article.lang] = {
                ...article,
                fsPath,
                urlPath,
                html: undefined, // 将 html 字段设为 undefined，来节约内存
                rawMarkdown: undefined,
            };
        },
        async finish(context: KecareContext) {
            for (const module of modules) {
                const moduleAwaited = await module;
                if (!moduleAwaited.generator) continue;
                let generatorResult = await moduleAwaited.generator(context, articles);
                if (!Array.isArray(generatorResult)) generatorResult = [generatorResult];

                for (const result of generatorResult) {
                    if (typeof result !== 'object' || !result.fsPath || !result.template) continue;
                    await write(result.fsPath, result.template);
                    console.log(`[list] 已生成 ${result.fsPath}`);
                }
            }
            return articles;
        },
    }
    return module;
}

let instancePromise: Promise<any> | null = null;

export function useListModuleHandler(context: KecareContext): Promise<ReturnType<typeof createListModuleHandler>> {
    if (!instancePromise) instancePromise = createListModuleHandler(context);
    return instancePromise as Promise<ReturnType<typeof createListModuleHandler>>;
}
