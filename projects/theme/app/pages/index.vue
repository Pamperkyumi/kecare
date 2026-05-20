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
      "cover": "https://free.picui.cn/free/2026/05/20/6a0dcd06916f0.jpg",
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
      "cover": "https://free.picui.cn/free/2026/05/20/6a0dcd06916f0.jpg",
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
      "date": "2026-03-11"
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\95140e73.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/95140e73",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\95140e73.vue",
    "urlPath": "articles/zh-CN/95140e73"
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
      "date": "2026-03-21"
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\93b7f9a7.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/93b7f9a7",
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
      "cover": "https://free.picui.cn/free/2026/05/20/6a0dcd06916f0.jpg",
      "title": "主题开发文章页",
      "menu": "test",
      "tags": [
        "主题开发"
      ],
      "desc": "文章页 无论是博客还是文档站，我们都需要一个页面来显示文章内容，这个页面就是文章页。 文章页模板 文章页模板是一个 .article.ts 文件，存放在 .kecare/ 目录下。生成器会在处理每篇文章时调用它，用于生成文章详情页面。 一个...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 0,
      "date": "2026-03-21"
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\989b9235.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/989b9235",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\989b9235.vue",
    "urlPath": "articles/zh-CN/989b9235"
  }
]
                const currentPage = 1
                const totalPages = 3
                const totalArticles = 15

                </script>
                <template>
                    <BlogLanding :articles="articles" :current-page="currentPage" :total-pages="totalPages" :total-articles="totalArticles" />
                </template>
            