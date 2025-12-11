
export type Article = {
  id: string;
  title: string;
  desc: string;
  coverSrc: string;
  contentHtml: string;
  createdAt: string;
  author: string;
  to: string;
};

export type ArticleListGenerator = (params: {
  projectPath: string;
  page: number;
  cards: any[];
  isIndex: boolean;
  pageSize: number;
  totalPages: number;
  totalArticles: number;
  listTitle?: string;

}) => Promise<{
  path: string;
  template: string;
}>;

export function defineArticleListGenerator<Generator extends ArticleListGenerator>(yourGenerator: Generator) {
  return yourGenerator;
}
