import type { ArticleVariant, KecareContext, ModuleArticleTS } from "kecare";
import { Glob, write } from "bun";
import { join } from "node:path";
import { useProductRegistry } from "../utils/product-registry.ts";

/**
 * 创建文章模块处理程序
 * 会读取 *.article.ts 文件，调用其 generator 方法，生成文章详情页面
 * @param context 
 * @returns 
 */
async function createArticleModuleHandler(context: KecareContext) {
    // 开始：这里的代码，在初始化的时候就会被执行，只执行一次
    const modulePath = join(context.projectPath, '.kecare');
    const glob = new Glob(`${modulePath}/**/*.{article.ts}`);



    const modules: Array<Promise<ModuleArticleTS>> = [];
    for await (const file of glob.scan(".")) modules.push(await import(file));
    // 结束：这里的代码，在初始化的时候就会被执行，只执行一次

    const module = {
        async handle(article: ArticleVariant) {
            // 缓存命中且产物完好时跳过重新生成，但已有产物仍需登记到产物登记表，供 clean 命令清理
            if (article.__SKIP_ARTICLE_GENERATOR__) {
                const realFsPaths = article.__REAL_FS_PATHS__;
                if (Array.isArray(realFsPaths)) {
                    for (const realFsPath of realFsPaths) useProductRegistry(context).register(realFsPath);
                }
                return;
            }

            // 重新生成前重置产物登记（缓存重建场景下 article 上可能残留上一轮的旧路径）
            article.__REAL_FS_PATHS__ = [];
            article.__REAL_RELATIVE_PATHS__ = [];

            // 此方法在处理实际文章时，才会被调用
            for (const module of modules) {
                const moduleAwaited = await module;
                if (!moduleAwaited.generator) continue; // 没有 generator 方法，跳过
                const generatorResult = await moduleAwaited.generator(context, article);
                if (typeof generatorResult !== 'object' || !generatorResult.fsPath || !generatorResult.urlPath) continue; // 没有路径，跳过

                await write(generatorResult.fsPath, generatorResult.template);
                console.log(`[article] 已生成 ${generatorResult.fsPath}`);

                // 登记生成的产物路径：多个模板会产出多个文件，必须全部记录，
                // 供缓存重建判断、hidden 清理、dev 孤儿清理与 clean 命令使用
                article.__REAL_FS_PATHS__!.push(generatorResult.fsPath);
                article.__REAL_RELATIVE_PATHS__!.push(generatorResult.urlPath);
                useProductRegistry(context).register(generatorResult.fsPath);
            }
        }

    }
    return module;
}

// 以 context 为键缓存处理器实例：每次 gen 都会创建新的 context，
// 因此同进程多次调用（测试、watch 模式）不会复用上一轮的处理器及其内部状态
const instances = new WeakMap<KecareContext, ReturnType<typeof createArticleModuleHandler>>();

export function useArticleModuleHandler(context: KecareContext): ReturnType<typeof createArticleModuleHandler> {
    let instance = instances.get(context);
    if (!instance) {
        instance = createArticleModuleHandler(context);
        instances.set(context, instance);
    }
    return instance;
}
