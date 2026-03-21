                <script setup lang="ts">
                import BlogLanding from "~/components/blog-landing.vue";
                useHead({
                    title: '首页',
                })
                const articles = [
  {
    "lang": "zh-CN",
    "title": "关于我",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "👋Hello Kecare 简介 Kecare是一个开源的的静态网站生成器，它与框架无关，核心特点是非侵入式设计——把内容系统从主题/框架中解耦。只需要了解少量 TypeScript，编写对应的页面生成模板，就可以基于组件自由组合页面，在...",
    "hash": "2f0fd1f2",
    "relativePath": "/关于我.md",
    "frontMatter": {
      "cover": "http://pichost.cloud/files/874a924352100b2931c947d68c92dac886c5b02bde9ed6cc1cfcd4c5076b03a3.jpg",
      "title": "关于我",
      "menu": "test",
      "tags": [],
      "desc": "👋Hello Kecare 简介 Kecare是一个开源的的静态网站生成器，它与框架无关，核心特点是非侵入式设计——把内容系统从主题/框架中解耦。只需要了解少量 TypeScript，编写对应的页面生成模板，就可以基于组件自由组合页面，在...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 3,
      "date": "2026-03-10"
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\2f0fd1f2.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/2f0fd1f2",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\2f0fd1f2.vue",
    "urlPath": "articles/zh-CN/2f0fd1f2"
  },
  {
    "lang": "zh-CN",
    "title": "Kecare从这里开始喵",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "关于 Kecare Kecare 是一个静态博客生成器，核心特点是非侵入式设计——把内容系统从主题/框架中解耦，让你的博客能力变成\"可插拔模块\"。 核心优势 传统博客方案（如 Hexo）会绑定特定技术栈，更换技术栈就得重来。 Kecare...",
    "hash": "70e6923c",
    "relativePath": "/Kecare从这里开始喵.md",
    "frontMatter": {
      "cover": "http://pichost.cloud/files/d409bed9b5cb6706b27a548332ead440da1bdfa23428561a66d59b753c190ac2.jpg",
      "title": "Kecare从这里开始喵",
      "menu": "test",
      "tags": [],
      "desc": "关于 Kecare Kecare 是一个静态博客生成器，核心特点是非侵入式设计——把内容系统从主题/框架中解耦，让你的博客能力变成\"可插拔模块\"。 核心优势 传统博客方案（如 Hexo）会绑定特定技术栈，更换技术栈就得重来。 Kecare...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 2,
      "date": "2026-03-10"
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\70e6923c.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/70e6923c",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\70e6923c.vue",
    "urlPath": "articles/zh-CN/70e6923c"
  },
  {
    "lang": "zh-CN",
    "title": "在已有项目上使用kecare",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "在已有项目上使用 Kecare 在已有项目中集成 Kecare，为项目添加文档/博客功能。 目录结构 安装 ::: tabs @tab bun @tab npm @tab pnpm ::: 文章详情页生成器 创建 .article.ts 文...",
    "hash": "95140e73",
    "relativePath": "/在已有项目上使用kecare.md",
    "frontMatter": {
      "cover": "http://pichost.cloud/files/d409bed9b5cb6706b27a548332ead440da1bdfa23428561a66d59b753c190ac2.jpg",
      "title": "在已有项目上使用kecare",
      "menu": "test",
      "tags": [],
      "desc": "在已有项目上使用 Kecare 在已有项目中集成 Kecare，为项目添加文档/博客功能。 目录结构 安装 ::: tabs @tab bun @tab npm @tab pnpm ::: 文章详情页生成器 创建 .article.ts 文...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 1,
      "date": "2026-03-11"
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\95140e73.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/95140e73",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\95140e73.vue",
    "urlPath": "articles/zh-CN/95140e73"
  },
  {
    "lang": "zh-CN",
    "title": "主题开发前言",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "感谢你为 Kecare 主题生态做出贡献 Kecare 诞生不久，在主题生态中，远远不及其他博客或文档站框架，所以 Kecare 非常欢迎大家贡献主题，为 Kecare 主题生态贡献力量~ 本目录将带你开始如何编写一个主题供大家使用 开始了...",
    "hash": "e5dbc117",
    "relativePath": "/主题开发前言.md",
    "frontMatter": {
      "cover": "http://pichost.cloud/files/874a924352100b2931c947d68c92dac886c5b02bde9ed6cc1cfcd4c5076b03a3.jpg",
      "title": "主题开发前言",
      "menu": "test",
      "tags": [
        "主题开发",
        "落地页",
        "列表页"
      ],
      "desc": "感谢你为 Kecare 主题生态做出贡献 Kecare 诞生不久，在主题生态中，远远不及其他博客或文档站框架，所以 Kecare 非常欢迎大家贡献主题，为 Kecare 主题生态贡献力量~ 本目录将带你开始如何编写一个主题供大家使用 开始了...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 0,
      "date": "2026-03-21"
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\e5dbc117.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/e5dbc117",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\e5dbc117.vue",
    "urlPath": "articles/zh-CN/e5dbc117"
  },
  {
    "lang": "zh-CN",
    "title": "主题开发落地页",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "落地页 当将 Kecare 用作博客时，我们需要一个落地页（即首页），用于展示博客的文章列表。 什么是落地页模板 落地页模板是一个 .list.ts 文件，存放在 .kecare/ 目录下。生成器会在处理完所有文章后调用它，用于生成文章列表...",
    "hash": "e52553ad",
    "relativePath": "/主题开发落地页.md",
    "frontMatter": {
      "cover": "http://pichost.cloud/files/874a924352100b2931c947d68c92dac886c5b02bde9ed6cc1cfcd4c5076b03a3.jpg",
      "title": "主题开发落地页",
      "menu": "test",
      "tags": [
        "主题开发",
        "落地页",
        "列表页"
      ],
      "desc": "落地页 当将 Kecare 用作博客时，我们需要一个落地页（即首页），用于展示博客的文章列表。 什么是落地页模板 落地页模板是一个 .list.ts 文件，存放在 .kecare/ 目录下。生成器会在处理完所有文章后调用它，用于生成文章列表...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 0,
      "date": "2026-03-21"
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\e52553ad.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/e52553ad",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\e52553ad.vue",
    "urlPath": "articles/zh-CN/e52553ad"
  }
]
                const currentPage = 1
                const totalPages = 3
                const totalArticles = 13

                </script>
                <template>
                    <BlogLanding :articles="articles" :current-page="currentPage" :total-pages="totalPages" :total-articles="totalArticles" />
                </template>
            