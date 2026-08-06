                <script setup lang="ts">
                import BlogLanding from "~/components/blog-landing.vue";
                useHead({
                    title: '首页',
                })
                const articles = [
  {
    "lang": "zh-CN",
    "title": "Kecare的缓存",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "Kecare的缓存 Kecare作为一个静态网站生成器，在处理大量文章时面临着性能上的挑战。如果不采取任何缓存策略，每次生成都需要重新解析所有Markdown文件、重新调用AI翻译、重新生成HTML页面。随着文章数量的增长，这个过程会变得越...",
    "hash": "8246c8ed",
    "relativePath": "/kecare的缓存.md",
    "frontMatter": {
      "cover": "https://pichostoss.oss-cn-shanghai.aliyuncs.com/images/1785612859072.jpg",
      "title": "Kecare的缓存",
      "menu": "test",
      "tags": [],
      "desc": "Kecare的缓存 Kecare作为一个静态网站生成器，在处理大量文章时面临着性能上的挑战。如果不采取任何缓存策略，每次生成都需要重新解析所有Markdown文件、重新调用AI翻译、重新生成HTML页面。随着文章数量的增长，这个过程会变得越...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 0,
      "author": "Pamper",
      "date": "2026-08-02",
      "hidden": false
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\8246c8ed.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/8246c8ed",
    "__SKIP_ARTICLE_GENERATOR__": true,
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\8246c8ed.vue",
    "urlPath": "articles/zh-CN/8246c8ed"
  },
  {
    "lang": "zh-CN",
    "title": "快速开始",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "快速开始 欢迎使用 Kecare，使用Kecare相当之简单，本文档将帮助您快速上手。 如果您在使用过程中遇到问题，请在Github上提问。 在使用 Kecare 之前，你需要先安装下列应用程序 Node.js - v22 或更高版本 文本...",
    "hash": "95bb100b",
    "relativePath": "/快速开始.md",
    "frontMatter": {
      "cover": "https://pichostoss.oss-cn-shanghai.aliyuncs.com/images/1785613091954.webp",
      "title": "快速开始",
      "menu": "test",
      "tags": [],
      "desc": "快速开始 欢迎使用 Kecare，使用Kecare相当之简单，本文档将帮助您快速上手。 如果您在使用过程中遇到问题，请在Github上提问。 在使用 Kecare 之前，你需要先安装下列应用程序 Node.js - v22 或更高版本 文本...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 0,
      "author": "Pamper",
      "date": "2026-08-02",
      "hidden": false
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\95bb100b.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/95bb100b",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\95bb100b.vue",
    "urlPath": "articles/zh-CN/95bb100b"
  },
  {
    "lang": "zh-CN",
    "title": "项目结构",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "项目结构 Kecare的目录结构大概如下 好，那让我们来一个个介绍喵 .milkio是隔壁Milkio的东西喵，我们这里不需要管喵。当然你也没有这个文件喵。 articles 为你的文章数据，你所有的文章都保存在这里，才能被Kecare读取...",
    "hash": "37e86293",
    "relativePath": "/项目结构.md",
    "frontMatter": {
      "cover": "https://pichostoss.oss-cn-shanghai.aliyuncs.com/images/1785612859072.jpg",
      "title": "项目结构",
      "menu": "test",
      "tags": [],
      "desc": "项目结构 Kecare的目录结构大概如下 好，那让我们来一个个介绍喵 .milkio是隔壁Milkio的东西喵，我们这里不需要管喵。当然你也没有这个文件喵。 articles 为你的文章数据，你所有的文章都保存在这里，才能被Kecare读取...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 0,
      "author": "Pamper",
      "date": "2026-08-02",
      "hidden": false
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\37e86293.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/37e86293",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\37e86293.vue",
    "urlPath": "articles/zh-CN/37e86293"
  },
  {
    "lang": "zh-CN",
    "title": "主题开发归档页",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "归档页 归档页是博客中用于按时间顺序展示所有文章的页面，通常以时间轴的形式呈现，方便读者浏览和查找历史文章。 归档页模板 归档页模板是一个 .archive.ts 文件，存放在 .kecare/ 目录下。生成器会在处理完所有文章后调用它，用...",
    "hash": "93b7f9a7",
    "relativePath": "/主题开发归档页.md",
    "frontMatter": {
      "cover": "https://pichostoss.oss-cn-shanghai.aliyuncs.com/images/1785612859072.jpg",
      "title": "主题开发归档页",
      "menu": "test",
      "tags": [
        "主题开发",
        "归档页"
      ],
      "desc": "归档页 归档页是博客中用于按时间顺序展示所有文章的页面，通常以时间轴的形式呈现，方便读者浏览和查找历史文章。 归档页模板 归档页模板是一个 .archive.ts 文件，存放在 .kecare/ 目录下。生成器会在处理完所有文章后调用它，用...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 0,
      "author": "Pamper",
      "date": "2026-03-21",
      "hidden": false
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\93b7f9a7.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/93b7f9a7",
    "__SKIP_ARTICLE_GENERATOR__": true,
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\93b7f9a7.vue",
    "urlPath": "articles/zh-CN/93b7f9a7"
  },
  {
    "lang": "zh-CN",
    "title": "主题开发文章页",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "文章页 无论是博客还是文档站，我们都需要一个页面来显示文章内容，这个页面就是文章页。 文章页模板 文章页模板是一个 .article.ts 文件，存放在 .kecare/ 目录下。生成器会在处理每篇文章时调用它，用于生成文章详情页面。 一个...",
    "hash": "989b9235",
    "relativePath": "/主题开发文章页.md",
    "frontMatter": {
      "cover": "https://pichostoss.oss-cn-shanghai.aliyuncs.com/images/1785612859072.jpg",
      "title": "主题开发文章页",
      "menu": "test",
      "tags": [
        "主题开发",
        "文章页"
      ],
      "desc": "文章页 无论是博客还是文档站，我们都需要一个页面来显示文章内容，这个页面就是文章页。 文章页模板 文章页模板是一个 .article.ts 文件，存放在 .kecare/ 目录下。生成器会在处理每篇文章时调用它，用于生成文章详情页面。 一个...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 0,
      "author": "Pamper",
      "date": "2026-03-21",
      "hidden": false
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\989b9235.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/989b9235",
    "__SKIP_ARTICLE_GENERATOR__": true,
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\989b9235.vue",
    "urlPath": "articles/zh-CN/989b9235"
  }
]
                const currentPage = 2
                const totalPages = 4
                const totalArticles = 17
                const totalTags = 9

                </script>
                <template>
                    <BlogLanding :articles="articles" :current-page="currentPage" :total-pages="totalPages" :total-articles="totalArticles" :total-tags="totalTags" />
                </template>
            