import type { Article, NavItem} from './article';

export type InputDriverOptions = {
  projectPath: string;
  articles: Array<Article>;
  tsFile: string;
  module: any;
};

export type ArticleListHandlerOptions = InputDriverOptions & {
  pageSize?: number;
  listTitle?: string;
};

export type DocsIndexHandlerOptions = InputDriverOptions & {
  NavItem: Array<NavItem>;
}


