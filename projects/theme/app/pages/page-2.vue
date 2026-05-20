                <script setup lang="ts">
                import BlogLanding from "~/components/blog-landing.vue";
                useHead({
                    title: '首页',
                })
                const articles = [
  {
    "lang": "zh-CN",
    "title": "主题开发前言",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "感谢你为 Kecare 主题生态做出贡献 Kecare 诞生不久，在主题生态中，远远不及其他博客或文档站框架，所以 Kecare 非常欢迎大家贡献主题，为 Kecare 主题生态贡献力量~ 本目录将带你开始如何编写一个主题供大家使用 开始了...",
    "hash": "e5dbc117",
    "relativePath": "/主题开发前言.md",
    "frontMatter": {
      "cover": "https://free.picui.cn/free/2026/05/20/6a0dcd06916f0.jpg",
      "title": "主题开发前言",
      "menu": "test",
      "tags": [],
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
    "desc": "落地页 当将 Kecare 用作博客时，我们需要一个落地页（即首页），用于展示博客的文章列表。 落地页模板 落地页模板是一个 .list.ts 文件，存放在 .kecare/ 目录下。生成器会在处理完所有文章后调用它，用于生成文章列表页面。...",
    "hash": "e52553ad",
    "relativePath": "/主题开发落地页.md",
    "frontMatter": {
      "cover": "https://free.picui.cn/free/2026/05/20/6a0dcd06916f0.jpg",
      "title": "主题开发落地页",
      "menu": "test",
      "tags": [
        "主题开发",
        "落地页",
        "列表页"
      ],
      "desc": "落地页 当将 Kecare 用作博客时，我们需要一个落地页（即首页），用于展示博客的文章列表。 落地页模板 落地页模板是一个 .list.ts 文件，存放在 .kecare/ 目录下。生成器会在处理完所有文章后调用它，用于生成文章列表页面。...",
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
  },
  {
    "lang": "zh-CN",
    "title": "markdown扩展",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "Markdown 扩展 Kecare 在标准 Markdown 语法的基础上，提供了丰富的扩展功能，让你的文档更加生动和专业。 Front Matter YAML Front Matter 开箱即用，你可以在文章开头添加元数据： 这些数据将...",
    "hash": "b40d18d1",
    "relativePath": "/markdown扩展.md",
    "frontMatter": {
      "cover": "https://free.picui.cn/free/2026/05/20/6a0dcd06916f0.jpg",
      "title": "markdown扩展",
      "menu": "test",
      "tags": [],
      "desc": "Markdown 扩展 Kecare 在标准 Markdown 语法的基础上，提供了丰富的扩展功能，让你的文档更加生动和专业。 Front Matter YAML Front Matter 开箱即用，你可以在文章开头添加元数据： 这些数据将...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 0,
      "date": "2026-03-09"
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\b40d18d1.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/b40d18d1",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\b40d18d1.vue",
    "urlPath": "articles/zh-CN/b40d18d1"
  },
  {
    "lang": "zh-CN",
    "title": "Github pages",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "部署到 GitHub Pages 将 Kecare 博客部署到 GitHub Pages 前置准备 在开始部署之前，请确保你已经准备好以下内容： Github账号 Git 和 Node.js 创建 GitHub 仓库 在 GitHub 创建...",
    "hash": "39f6b230",
    "relativePath": "/Github pages.md",
    "frontMatter": {
      "cover": "https://free.picui.cn/free/2026/05/20/6a0dcd06916f0.jpg",
      "title": "Github pages",
      "menu": "test",
      "tags": [],
      "desc": "部署到 GitHub Pages 将 Kecare 博客部署到 GitHub Pages 前置准备 在开始部署之前，请确保你已经准备好以下内容： Github账号 Git 和 Node.js 创建 GitHub 仓库 在 GitHub 创建...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 0,
      "date": "2026-03-08"
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\39f6b230.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/39f6b230",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\39f6b230.vue",
    "urlPath": "articles/zh-CN/39f6b230"
  },
  {
    "lang": "zh-CN",
    "title": "写作",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "写作 在 Kecare 中，文章存放在 主题目录/.kecare/articles/ 目录下，目前仅支持 Markdown 文件。 创建文章 在 .kecare/articles/ 目录下创建 .md 文件 编写内容 文章结构 文章由 Fr...",
    "hash": "6e8c5f0b",
    "relativePath": "/写作.md",
    "frontMatter": {
      "cover": "https://free.picui.cn/free/2026/05/20/6a0dcd06916f0.jpg",
      "title": "写作",
      "menu": "test",
      "tags": [],
      "desc": "写作 在 Kecare 中，文章存放在 主题目录/.kecare/articles/ 目录下，目前仅支持 Markdown 文件。 创建文章 在 .kecare/articles/ 目录下创建 .md 文件 编写内容 文章结构 文章由 Fr...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 0,
      "date": "2026-03-06"
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\6e8c5f0b.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/6e8c5f0b",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\6e8c5f0b.vue",
    "urlPath": "articles/zh-CN/6e8c5f0b"
  }
]
                const currentPage = 2
                const totalPages = 3
                const totalArticles = 15

                </script>
                <template>
                    <BlogLanding :articles="articles" :current-page="currentPage" :total-pages="totalPages" :total-articles="totalArticles" />
                </template>
            