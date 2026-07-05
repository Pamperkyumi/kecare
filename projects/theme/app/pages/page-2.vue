                <script setup lang="ts">
                import BlogLanding from "~/components/blog-landing.vue";
                useHead({
                    title: '首页',
                })
                const articles = [
  {
    "lang": "zh-CN",
    "title": "在已有项目上使用kecare",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "在已有项目上使用 Kecare 在已有项目中集成 Kecare，为项目添加文档/博客功能。 目录结构 安装 ::: tabs @tab bun @tab npm @tab pnpm ::: 文章详情页生成器 创建 .article.ts 文...",
    "hash": "95140e73",
    "relativePath": "/在已有项目上使用kecare.md",
    "frontMatter": {
      "cover": "https://free.picui.cn/free/2026/05/20/6a0dcd06916f0.jpg",
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
      "author": "Pamper",
      "date": "2026-03-11",
      "hidden": false
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\95140e73.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/95140e73",
    "__SKIP_ARTICLE_GENERATOR__": true,
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\95140e73.vue",
    "urlPath": "articles/zh-CN/95140e73"
  },
  {
    "lang": "zh-CN",
    "title": "阿里云ESA",
    "isOriginalLang": true,
    "desc": "阿里云ESA Kecare一开始是部署在Github Pages上的，发现国内访问速度实在拉跨，发现阿里云和腾讯云都出了边缘安全加速平台。腾讯云的EdgeOne 和阿里云的ESA。花了点时间给Kecare部署到阿里云上了。",
    "hash": "1efdefa8",
    "relativePath": "/阿里云ESA.md",
    "frontMatter": {
      "cover": "https://free.picui.cn/free/2026/05/20/6a0dcd06916f0.jpg",
      "title": "阿里云ESA",
      "tags": [],
      "desc": "阿里云ESA Kecare一开始是部署在Github Pages上的，发现国内访问速度实在拉跨，发现阿里云和腾讯云都出了边缘安全加速平台。腾讯云的EdgeOne 和阿里云的ESA。花了点时间给Kecare部署到阿里云上了。",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 0,
      "author": "Pamper",
      "date": "2026-06-14",
      "hidden": false
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\1efdefa8.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/1efdefa8",
    "__SKIP_ARTICLE_GENERATOR__": true,
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\1efdefa8.vue",
    "urlPath": "articles/zh-CN/1efdefa8"
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
      "author": "Pamper",
      "date": "2026-03-21",
      "hidden": false
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\e5dbc117.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/e5dbc117",
    "__SKIP_ARTICLE_GENERATOR__": true,
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\e5dbc117.vue",
    "urlPath": "articles/zh-CN/e5dbc117"
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
      "cover": "https://free.picui.cn/free/2026/05/20/6a0dcd06916f0.jpg",
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
      "cover": "https://free.picui.cn/free/2026/05/20/6a0dcd06916f0.jpg",
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
  }
]
                const currentPage = 2
                const totalPages = 4
                const totalArticles = 19
                const totalTags = 9

                </script>
                <template>
                    <BlogLanding :articles="articles" :current-page="currentPage" :total-pages="totalPages" :total-articles="totalArticles" :total-tags="totalTags" />
                </template>
            