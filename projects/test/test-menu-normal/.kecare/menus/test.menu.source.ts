import type { NavItem } from "kecare";

export const navItems: NavItem[] = [
    {
        text: '入门指南',
        level: 1,
        items: [
            { text: '快速开始', link: './quick-start.md', level: 2 },
            { text: '安装指南', link: './installation.md', level: 2 },
        ],
    },
    {
        text: '进阶',
        level: 1,
        items: [
            { text: '配置选项', link: './config.md', level: 2 },
            { text: '插件开发', link: './plugin.md', level: 2 },
        ],
    },
];
