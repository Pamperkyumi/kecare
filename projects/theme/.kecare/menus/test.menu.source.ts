import type { NavItem } from "kecare";

export const navItems: NavItem[] = [
    {
        text: '入门指南',
        level: 1,
        items: [
            { text: '什么是Kecare', link: './什么是Kecare.md', level: 2 },
            { text: '快速开始', link: './快速开始.md', level: 2 },
        ],
    },
    {
        text: '基本操作',
        level: 1,
        items: [
            { text: '写作', link: './写作.md', level: 2 },
            { text: 'frontmatter', link: './frontmatter.md', level: 2 },
            { text: 'Markdown扩展', link: './markdown扩展.md', level: 2 },
            { text: '菜单系统', link: './菜单系统.md', level: 2 },
            { text: '国际化处理', link: './国际化处理.md', level: 2 },
        ],
    },
    {
        text: '部署',
        level: 1,
        items: [{ text: 'GitHub Pages', link: './Github pages.md', level: 2 }],
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
        text: '贡献与协作',
        level: 1,
        items: [{ text: '贡献指南', link: './贡献指南.md', level: 2 }],
    },
];
