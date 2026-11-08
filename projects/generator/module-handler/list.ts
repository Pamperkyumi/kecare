import type { KecareContext, ModuleListTS } from "kecare";
import { Glob, write } from "bun";
import { join } from "node:path";
import { useProductRegistry } from "../utils/product-registry.ts";
import { useArticleCollector } from "./article-collector.ts";


/**
 * 创建文章列表模块处理程序
 * 会读取 *.list.ts 文件，调用其 generator 方法，生成文章列表页面。
 * 文章数据不再在 handle 阶段平行收集，finish 时统一从 article-collector 派生
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

    const module = {
        async finish(context: KecareContext) {
            // 全部文章数据（含产物路径）统一从收集器派生
            const articles = useArticleCollector(context).toArticlesRecord();

            for (const module of modules) {
                const moduleAwaited = await module;
                if (!moduleAwaited.generator) continue;
                let generatorResult = await moduleAwaited.generator(context, articles);
                if (!Array.isArray(generatorResult)) generatorResult = [generatorResult];

                for (const result of generatorResult) {
                    if (typeof result !== 'object' || !result.fsPath || !result.template) continue;
                    await write(result.fsPath, result.template);
                    console.log(`[list] 已生成 ${result.fsPath}`);
                    // 登记产物路径，供 clean 命令按真实路径清理
                    useProductRegistry(context).register(result.fsPath);
                }
            }
            return articles;
        },
    }
    return module;
}

// 以 context 为键缓存处理器实例：每次 gen 都会创建新的 context，
// 因此同进程多次调用（测试、watch 模式）不会复用上一轮的处理器及其内部状态
const instances = new WeakMap<KecareContext, ReturnType<typeof createListModuleHandler>>();

export function useListModuleHandler(context: KecareContext): ReturnType<typeof createListModuleHandler> {
    let instance = instances.get(context);
    if (!instance) {
        instance = createListModuleHandler(context);
        instances.set(context, instance);
    }
    return instance;
}
