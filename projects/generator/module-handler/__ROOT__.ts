import type { ArticleVariant, KecareContext } from "kecare";
import { useArticleModuleHandler } from "./article.ts";
import { useListModuleHandler } from "./list.ts";
import { useMenuModuleHandler } from "./menu.ts";
import { useArchivesModuleHandler } from "./archives.ts";
import { useSearchModuleHandler } from "./search.ts";

/**
 * 在处理每篇文章时，会调用此方法
 */
export async function emitArticleHandle(context: KecareContext, article: ArticleVariant) {
    await (await useArticleModuleHandler(context)).handle(article);
    await (await useListModuleHandler(context)).handle(article);
    await (await useArchivesModuleHandler(context)).handle(article);
    await (await useSearchModuleHandler(context)).handle(article);
}

/**
 * 在所有处理完成时，会调用此方法
 */
export async function emitModuleFinish(context: KecareContext) {
    await (await useMenuModuleHandler(context)).finish();
    await (await useListModuleHandler(context)).finish(context);
    await (await useSearchModuleHandler(context)).finish(context);
    await (await useArchivesModuleHandler(context)).finish(context);
}
