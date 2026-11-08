import type { ArticleVariant, KecareContext } from "kecare";
import { useArticleModuleHandler } from "./article.ts";
import { useListModuleHandler } from "./list.ts";
import { useArchivesModuleHandler } from "./archives.ts";
import { useSearchModuleHandler } from "./search.ts";
import { useArticleCollector } from "./article-collector.ts";
import { useProductRegistry } from "../utils/product-registry.ts";

/**
 * 在处理每篇文章时，会调用此方法。
 * article 处理器先完成页面生成与产物登记，然后统一收集一次文章数据；
 * list / search / archives / stats 全部在 finish 阶段从收集器派生各自视图，
 * 替代原先四份平行的 handle 阶段收集
 */
export async function emitArticleHandle(context: KecareContext, article: ArticleVariant) {
    await (await useArticleModuleHandler(context)).handle(article);
    useArticleCollector(context).collect(article);
}

/**
 * 在所有处理完成时，会调用此方法
 */
export async function emitModuleFinish(context: KecareContext) {
    // 集中计算聚合统计数据，供所有 finish() 处理器与模板读取
    useArticleCollector(context).computeStats(context);

    await (await useListModuleHandler(context)).finish(context);
    await (await useSearchModuleHandler(context)).finish(context);
    await (await useArchivesModuleHandler(context)).finish(context);

    // 产物登记表落盘，供 clean 命令按真实产物路径清理
    await useProductRegistry(context).save();
}
