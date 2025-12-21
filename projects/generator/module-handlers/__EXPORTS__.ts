import { articleDetailModuleHandler } from "./article-detail";
import { articleListModuleHandler } from "./article-list";
import { archivesModuleHandler } from "./archives"
import { sidebarModuleHandler } from "./sidebar"
import { docsIndexModuleHandler } from "./docs-index";

export const moduleHandlers = {
    "article-detail": articleDetailModuleHandler,
    "article-list": articleListModuleHandler,
    "blog-archives": archivesModuleHandler,
    "blog-sidebar": sidebarModuleHandler,
    "docs-index": docsIndexModuleHandler,
}