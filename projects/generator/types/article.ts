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

