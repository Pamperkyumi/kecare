import type { NavItem } from "kecare";

export const navItems: NavItem[] = [
    {
        text: '入门指南',
        level: 1,
        items: [
            { text: 'Kecare从这里开始喵', link: './Kecare从这里开始喵.md', level: 2 },
            { text: '快速开始', link: './快速开始.md', level: 2 },
            { text: '项目结构约定', link: './项目结构约定.md', level: 2 },
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
                text: '生成器 CLI',
                level: 2,
                items: [
                    { text: '生成器CLI', link: './生成器CLI.md', level: 3 },
                    { text: '自定义生成器CLI', link: './自定义生成器CLI.md', level: 3 },
                ],
            },
        ],
    },
    {
        text: '贡献与协作',
        level: 1,
        items: [{ text: '贡献指南', link: './贡献指南.md', level: 2 }],
    },
];
