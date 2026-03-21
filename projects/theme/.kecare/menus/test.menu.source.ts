import type { NavItem } from "kecare";

export const navItems: NavItem[] = [
    {
        text: 'Hello World',
        level: 1,
        items: [
            { text: '关于我', link: './关于我.md', level: 2 },
            { text: '快速开始', link: './快速开始.md', level: 2 },
        ],
    },
    {
        text: '基本操作',
        level: 1,
        items: [
            { text: '写作', link: './写作.md', level: 2 },
            { text: 'Markdown扩展', link: './markdown扩展.md', level: 2 },
            { text: '菜单系统', link: './菜单系统.md', level: 2 },
            { text: '国际化处理', link: './国际化处理.md', level: 2 },
            { text: '部署到GitHub Pages', link: './Github pages.md', level: 2 },
        ],
    },
    {
        text: '进阶',
        level: 1,
        items: [
            {
                text: '在已有项目上使用kecare',
                link: './在已有项目上使用kecare.md',
                level: 2,
            },
        ],
    },
    {
        text: '主题开发',
        level: 1,
        items: [
            { text: '前言', link: './主题开发前言.md', level: 2 },
            { text: '落地页', link: './主题开发落地页.md', level: 2 },
            { text: '文章页', link: './主题开发文章页.md', level: 2 },
        ],
    },
    {
        text: '贡献与协作',
        level: 1,
        items: [{ text: '贡献指南', link: './贡献指南.md', level: 2 }],
    },
];
