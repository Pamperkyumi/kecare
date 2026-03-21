                <script setup lang="ts">
                import BlogLanding from "~/components/blog-landing.vue";
                useHead({
                    title: '首页',
                })
                const articles = [
  {
    "lang": "zh-CN",
    "title": "国际化处理",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "国际化处理 Kecare 可使用 Ai 为你的文章翻译成多种语言， 让文章触达多语言读者。 启用翻译 在 Kecare 中使用翻译也非常简单，仅需在所需翻译的文章 Front Matter 中添加 translate 字段： 第一个语言代码...",
    "hash": "493f5fa2",
    "relativePath": "/国际化处理.md",
    "frontMatter": {
      "cover": "http://pichost.cloud/files/874a924352100b2931c947d68c92dac886c5b02bde9ed6cc1cfcd4c5076b03a3.jpg",
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
      "date": "2026-03-03"
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\493f5fa2.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/493f5fa2",
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
      "cover": "http://pichost.cloud/files/874a924352100b2931c947d68c92dac886c5b02bde9ed6cc1cfcd4c5076b03a3.jpg",
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
      "cover": "http://pichost.cloud/files/d409bed9b5cb6706b27a548332ead440da1bdfa23428561a66d59b753c190ac2.jpg",
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
                const totalArticles = 13

                </script>
                <template>
                    <BlogLanding :articles="articles" :current-page="currentPage" :total-pages="totalPages" :total-articles="totalArticles" />
                </template>
            