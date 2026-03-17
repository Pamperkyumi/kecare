import type { NavItem } from "kecare";

export const navItems: NavItem[] = [
    { text: '中文文件名', link: './测试文章.md', level: 1 },
    { text: '特殊字符', link: './test-file_2024.md', level: 1 },
    {
        text: '分组菜单',
        level: 1,
        items: [
            { text: '嵌套中文', link: './嵌套测试.md', level: 2 },
        ],
    },
];
