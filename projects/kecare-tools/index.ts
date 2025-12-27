export type Article = {
  id: string;
  title: string;
  desc?: string;
  coverSrc: string;
  contentHtml: string;
  createdAt: string;
  author?: string;
  to: string;
  menu?: string | null;
  menudata?: NavItem[] | null;
  headings: Heading[];
};
export type HeadingH1 = {
  depth: 1;
  text: string;
  id: string;
  children: HeadingH2[];
};

export type HeadingH2 = {
  depth: 2;
  text: string;
  id: string;
};
export type Heading = HeadingH1 | HeadingH2;

export type ArticleListGenerator = (params: { projectPath: string; article: Article; totalArticles: number; articles: Article[]; NavItems: NavItem[] }) => Promise<{
  path: string;
  template: string;
}>;

export type PagesListGenerator = (params: { projectPath: string; page: number; cards: []; isIndex: number; pageSize: number; totalPages: number; totalArticles: number; listTitle: number }) => Promise<{
  path: string;
  template: string;
}>;

export type NavItem = { text: string; link: string; level: number; desc?: string; icon?: string } | { text: string; items: NavItem[]; level: number };

export function defineArticleListGenerator<Generator extends ArticleListGenerator>(yourGenerator: Generator) {
  return yourGenerator;
}

export function PagesListGenerator<Generator extends PagesListGenerator>(yourGenerator: Generator) {
  return yourGenerator;
}
