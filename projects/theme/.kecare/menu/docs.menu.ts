import type { NavItem } from 'kecare-tools';

export const navItems: NavItem[] = [
  {
    text: '这是第一个导航栏',
    level: 1,
    items: [
      {
        text: '切换显示',
        link: './aaa',
        level: 2,
      },
      {
        text: '标题',
        link: './222',
        level: 2,
      },
    ],
  },
  {
    text: 'API',
    level: 1,
    items: [
      {
        text: 'www',
        link: './333',
        level: 3,
      },
    ],
  },
];
