                <script setup lang="ts">
                import BlogLanding from "~/components/blog-landing.vue";
                useHead({
                    title: '首页',
                })
                const articles = [
  {
    "lang": "zh-CN",
    "title": "贡献指南",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "贡献指南 感谢你对 Kecare 项目的关注！ 开发环境 Node.js Bun（推荐） 项目结构 本地开发 代码规范 项目使用 oxlint 和 oxfmt 进行代码检查和格式化： 提交前请确保代码通过检查。 提交规范 提交信息格式： 类...",
    "hash": "43fc313b",
    "relativePath": "/贡献指南.md",
    "frontMatter": {
      "cover": "http://pichost.cloud/files/852b35d10178459edcf216fdd842d331da8f390a56f8fda74f8d68b2ed3f4fc7.png",
      "title": "贡献指南",
      "menu": "test",
      "tags": [
        "菜单",
        "导航",
        "测试",
        "Kecare"
      ],
      "desc": "贡献指南 感谢你对 Kecare 项目的关注！ 开发环境 Node.js Bun（推荐） 项目结构 本地开发 代码规范 项目使用 oxlint 和 oxfmt 进行代码检查和格式化： 提交前请确保代码通过检查。 提交规范 提交信息格式： 类...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 0,
      "date": "2026-03-02"
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\43fc313b.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/43fc313b",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\43fc313b.vue",
    "urlPath": "articles/zh-CN/43fc313b"
  },
  {
    "lang": "zh-CN",
    "title": "菜单系统",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "菜单系统 Kecare 提供统一的菜单配置方式，用于生成侧边导航栏。 创建菜单 菜单文件存放在 .kecare/menus/ 目录，命名格式为 .menu.source.ts： 文件名前缀（如 kecare-docs）是文章中引用的 men...",
    "hash": "4ee23999",
    "relativePath": "/菜单系统.md",
    "frontMatter": {
      "cover": "http://pichost.cloud/files/af0e1cec4766b50bcf61b741cf78d77530c2a24019bc0ba3d17a88624e04ce34.jpg",
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
      "date": "2026-03-01"
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\4ee23999.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/4ee23999",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\4ee23999.vue",
    "urlPath": "articles/zh-CN/4ee23999"
  }
]
                const currentPage = 3
                const totalPages = 3
                const totalArticles = 12

                </script>
                <template>
                    <BlogLanding :articles="articles" :current-page="currentPage" :total-pages="totalPages" :total-articles="totalArticles" />
                </template>
            