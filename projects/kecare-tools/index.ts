
export type Article = {
  id: string;
  title: string;
  desc: string;
  coverSrc: string;
  contentHtml: string;
  createdAt: string;
  author: string;
  to: string;
  headings: heading[];
};
export type HeadingH1 = {
  depth: 1;
  text: string;
  id:string;
  children: HeadingH2[];
}

export type HeadingH2 = {
  depth: 2;
  text: string;
  id:string;
}
export type heading = HeadingH1|HeadingH2

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
