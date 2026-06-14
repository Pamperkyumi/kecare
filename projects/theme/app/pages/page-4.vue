                <script setup lang="ts">
                import BlogLanding from "~/components/blog-landing.vue";
                useHead({
                    title: '首页',
                })
                const articles = [
  {
    "lang": "zh-CN",
    "title": "菜单系统",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "菜单系统 Kecare 提供统一的菜单配置方式，用于生成侧边导航栏。 创建菜单 菜单文件存放在 .kecare/menus/ 目录，命名格式为 .menu.source.ts： 文件名前缀（如 kecare-docs）是文章中引用的 men...",
    "hash": "4ee23999",
    "relativePath": "/菜单系统.md",
    "frontMatter": {
      "cover": "https://free.picui.cn/free/2026/05/20/6a0dcd06916f0.jpg",
      "title": "菜单系统",
      "menu": "test",
      "tags": [
        "菜单",
        "导航",
        "测试",
        "Kecare"
      ],
      "desc": "菜单系统 Kecare 提供统一的菜单配置方式，用于生成侧边导航栏。 创建菜单 菜单文件存放在 .kecare/menus/ 目录，命名格式为 .menu.source.ts： 文件名前缀（如 kecare-docs）是文章中引用的 men...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 0,
      "author": "Pamper",
      "date": "2026-03-01",
      "hidden": false
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\4ee23999.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/4ee23999",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\4ee23999.vue",
    "urlPath": "articles/zh-CN/4ee23999"
  }
]
                const currentPage = 4
                const totalPages = 4
                const totalArticles = 16
                const totalTags = 9

                </script>
                <template>
                    <BlogLanding :articles="articles" :current-page="currentPage" :total-pages="totalPages" :total-articles="totalArticles" :total-tags="totalTags" />
                </template>
            