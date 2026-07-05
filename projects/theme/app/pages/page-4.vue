                <script setup lang="ts">
                import BlogLanding from "~/components/blog-landing.vue";
                useHead({
                    title: '首页',
                })
                const articles = [
  {
    "lang": "zh-CN",
    "title": "快速开始",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "快速开始 按照Kecare相当简单，仅需安装Kecare CLI 即可帮你从0开始一个 Kecare 项目。它将引导你完成设置新项目的每一步，并允许你从几个不同的官方入门模板中进行选择。如果你只是想为你的已有项目中快速接入一个博客/文档站，...",
    "hash": "95bb100b",
    "relativePath": "/快速开始.md",
    "frontMatter": {
      "cover": "https://free.picui.cn/free/2026/05/20/6a0dcd06916f0.jpg",
      "title": "快速开始",
      "menu": "test",
      "tags": [],
      "desc": "快速开始 按照Kecare相当简单，仅需安装Kecare CLI 即可帮你从0开始一个 Kecare 项目。它将引导你完成设置新项目的每一步，并允许你从几个不同的官方入门模板中进行选择。如果你只是想为你的已有项目中快速接入一个博客/文档站，...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 0,
      "author": "Pamper",
      "date": "2026-03-04",
      "hidden": false
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\95bb100b.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/95bb100b",
    "__SKIP_ARTICLE_GENERATOR__": true,
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\95bb100b.vue",
    "urlPath": "articles/zh-CN/95bb100b"
  },
  {
    "lang": "zh-CN",
    "title": "国际化处理",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "国际化处理 Kecare 可使用 Ai 为你的文章翻译成多种语言， 让文章触达多语言读者。 启用翻译 在 Kecare 中使用翻译也非常简单，仅需在所需翻译的文章 Front Matter 中添加 translate 字段： 第一个语言代码...",
    "hash": "493f5fa2",
    "relativePath": "/国际化处理.md",
    "frontMatter": {
      "cover": "https://free.picui.cn/free/2026/05/20/6a0dcd06916f0.jpg",
      "title": "国际化处理",
      "menu": "test",
      "tags": [],
      "desc": "国际化处理 Kecare 可使用 Ai 为你的文章翻译成多种语言， 让文章触达多语言读者。 启用翻译 在 Kecare 中使用翻译也非常简单，仅需在所需翻译的文章 Front Matter 中添加 translate 字段： 第一个语言代码...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 0,
      "author": "Pamper",
      "date": "2026-03-03",
      "hidden": false
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\493f5fa2.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/493f5fa2",
    "__SKIP_ARTICLE_GENERATOR__": true,
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\493f5fa2.vue",
    "urlPath": "articles/zh-CN/493f5fa2"
  },
  {
    "lang": "zh-CN",
    "title": "贡献指南",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "贡献指南 感谢你对 Kecare 项目的关注！ 开发环境 Node.js Bun（推荐） 项目结构 本地开发 代码规范 项目使用 oxlint 和 oxfmt 进行代码检查和格式化： 提交前请确保代码通过检查。 提交规范 提交信息格式： 类...",
    "hash": "43fc313b",
    "relativePath": "/贡献指南.md",
    "frontMatter": {
      "cover": "https://free.picui.cn/free/2026/05/20/6a0dcd06916f0.jpg",
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
      "author": "Pamper",
      "date": "2026-03-02",
      "hidden": false
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\43fc313b.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/43fc313b",
    "__SKIP_ARTICLE_GENERATOR__": true,
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
    "__SKIP_ARTICLE_GENERATOR__": true,
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\4ee23999.vue",
    "urlPath": "articles/zh-CN/4ee23999"
  }
]
                const currentPage = 4
                const totalPages = 4
                const totalArticles = 19
                const totalTags = 9

                </script>
                <template>
                    <BlogLanding :articles="articles" :current-page="currentPage" :total-pages="totalPages" :total-articles="totalArticles" :total-tags="totalTags" />
                </template>
            