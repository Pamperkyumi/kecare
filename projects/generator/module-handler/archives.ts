import { Glob, write } from "bun";
import type { KecareContext, ModuleArchiveTS, ArchiveArticleData, ArticleVariant } from "kecare";
import { join } from "node:path";

/**
 * 归档模块处理程序
 * 会读取 *.archives.ts 文件，调用其 generator 方法，生成归档页面
 */
async function createArchivesModuleHandler(context: KecareContext) {
    const modulePath = join(context.projectPath, '.kecare')
    const glob = new Glob(`${modulePath}/**/*.{archives.ts}`)

    const modules: Array<Promise<ModuleArchiveTS>> = []

    for await (const file of glob.scan(".")) modules.push(await import(file))

    let archivesData: ArchiveArticleData[] = [];

    const module = {
        async handle(article: ArticleVariant) {
            const fsPath = article.__REAL_FS_PATHS__; // 上一阶段记录的真实写入文件的路径
            const urlPath = article.__REAL_RELATIVE_PATHS__; // 上一阶段记录的 URL 路径
            archivesData.push({
                title: article.title,
                lang: article.lang,
                hash: article.hash,
                tags: article.frontMatter.tags,
                date: article.frontMatter.date,
                fsPath: fsPath,
                urlPath: urlPath,

            })
        },
        async finish(context: KecareContext) {
            for (const module of modules) {
                const moduleAwaited = await module;
                if (!moduleAwaited.generator) continue;
                const generatorResult = await moduleAwaited.generator(context, archivesData);
                if (typeof generatorResult !== 'object' || !generatorResult.fsPath || !generatorResult.template) continue;
                await write(generatorResult.fsPath, generatorResult.template);
                console.log(`[archives] 已生成 ${generatorResult.fsPath}`);
            }
        }
    }
    return module;
}
let instancePromise: Promise<any> | null = null;

export function useArchivesModuleHandler(context: KecareContext): Promise<ReturnType<typeof createArchivesModuleHandler>> {
    if (!instancePromise) instancePromise = createArchivesModuleHandler(context);
    return instancePromise as Promise<ReturnType<typeof createArchivesModuleHandler>>;
}