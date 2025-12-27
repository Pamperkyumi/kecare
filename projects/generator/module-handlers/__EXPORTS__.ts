import { articleDetailModuleHandler } from './article-detail';
import { articleListModuleHandler } from './article-list';
import { archivesModuleHandler } from './archives';

export const moduleHandlers = {
  'article-detail': articleDetailModuleHandler,
  'article-list': articleListModuleHandler,
  'blog-archives': archivesModuleHandler,
};
