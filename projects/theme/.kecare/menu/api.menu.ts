import type { NavItem } from 'kecare-tools';

export const navItems: NavItem[] = [
  {
    text: '这是第二个导航栏',
    level: 1,
    items: [
      {
        text: '切换显示',
        link: './shishifanyi',
        level: 2,
      },
      {
        text: '222',
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
        text: '333',
        link: './333',
        level: 3,
      },
    ],
  },
];
