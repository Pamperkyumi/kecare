import { Glob, write } from "bun";
import type { KecareContext, ModuleArchiveTS } from "kecare";
import { join } from "node:path";
import { useProductRegistry } from "../utils/product-registry.ts";
import { useArticleCollector } from "./article-collector.ts";

/**
 * 归档模块处理程序
 * 会读取 *.archives.ts 文件，调用其 generator 方法，生成归档页面。
 * 文章数据不再在 handle 阶段平行收集，finish 时统一从 article-collector 派生
 */
async function createArchivesModuleHandler(context: KecareContext) {
    const modulePath = join(context.projectPath, '.kecare')
    const glob = new Glob(`${modulePath}/**/*.{archives.ts}`)

    const modules: Array<Promise<ModuleArchiveTS>> = []

    for await (const file of glob.scan(".")) modules.push(await import(file))

    const module = {
        async finish(context: KecareContext) {
            // 全部文章数据统一从收集器派生
            const archivesData = useArticleCollector(context).toArchiveArticles();

            for (const module of modules) {
                const moduleAwaited = await module;
                if (!moduleAwaited.generator) continue;
                const generatorResult = await moduleAwaited.generator(context, archivesData);
                if (typeof generatorResult !== 'object' || !generatorResult.fsPath || !generatorResult.template) continue;
                await write(generatorResult.fsPath, generatorResult.template);
                console.log(`[archives] 已生成 ${generatorResult.fsPath}`);
                // 登记产物路径，供 clean 命令按真实路径清理
                useProductRegistry(context).register(generatorResult.fsPath);
            }
        }
    }
    return module;
}
// 以 context 为键缓存处理器实例：每次 gen 都会创建新的 context，
// 因此同进程多次调用（测试、watch 模式）不会复用上一轮的处理器及其内部状态
const instances = new WeakMap<KecareContext, ReturnType<typeof createArchivesModuleHandler>>();

export function useArchivesModuleHandler(context: KecareContext): ReturnType<typeof createArchivesModuleHandler> {
    let instance = instances.get(context);
    if (!instance) {
        instance = createArchivesModuleHandler(context);
        instances.set(context, instance);
    }
    return instance;
}
