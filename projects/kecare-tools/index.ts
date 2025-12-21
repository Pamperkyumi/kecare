
export type Article = {
  id: string;
  title: string;
  desc: string;
  coverSrc: string;
  contentHtml: string;
  createdAt: string;
  author: string;
  to: string;
  headings: Heading[];
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
export type Heading = HeadingH1 | HeadingH2

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

export type NavItem=
| { text: string; link: string }
| { text: string; items: NavItem[]}

export const nav:NavItem[]=[
  {text: '首页',
    items: [
      {
        text: '开始',
        link: '/start'
      },
      {
        text: '文档',
        link: '/docs'
      },
      {
        text: 'API',
        link: '/api'
      }
    ]
  },
  {
    text: '关于',
    items: [
      {
        text: '关于',
        link: '/about'
      }
    ]
  }
]


export function defineArticleListGenerator<Generator extends ArticleListGenerator>(yourGenerator: Generator) {
  return yourGenerator;
}
