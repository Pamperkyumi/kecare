import type { NavItem } from 'kecare';

export const navItems: NavItem[] = [
    {
        text: '入门指南',
        level: 1,
        items: [
            {
                text: '引言',
                link: './Kecare从这里开始喵',
                level: 2,
            },
            {
                text: '快速开始',
                link: './快速开始',
                level: 2,
            },
        ],
    },
    {
        text: '基本操作',
        level: 1,
        items: [
            {
                text: '写作',
                link: './写作',
                level: 2,
            },
            {
                text: '资源文件夹',
                link: './资源文件夹',
                level: 2,
            },
        ],
    },
    {
        text: '部署',
        level: 1,
        items: [
            {
                text: 'GitHub Pages',
                link: './GitHub Pages',
                level: 2,
            },
            {
                text: 'Vercel',
                link: './Vercel',
                level: 2,
            },
            {
                text: 'gitLab Pages',
                link: './gitLab Pages',
                level: 2,
            },
        ],
    },
    {
        text: '自定义',
        level: 1,
        items: [
            {
                text: '自定义主题',
                link: './自定义主题',
                level: 2,
            },
            {
                text: '自定义生成器',
                link: './自定义生成器',
                level: 2,
            },
        ],
    },
    {
        text: '其他',
        level: 1,
        items: [
            {
                text: '贡献',
                link: './贡献',
                level: 2,
            },
        ],
    },
];
