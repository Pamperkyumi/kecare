import type { Article } from 'kecare-tools';

export type InputDriverOptions = {
  projectPath: string;
  articles: Array<Article>;
  tsFile: string;
  module: any;
};
export type ArticleListDriverOptions = InputDriverOptions & {
  pageSize: number;
  listTitle: string;
};
