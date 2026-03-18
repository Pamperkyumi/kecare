                <script setup lang="ts">
                import BlogLanding from "~/components/blog-landing.vue";
                useHead({
                    title: '首页',
                })
                const articles = [
  {
    "lang": "zh-CN",
    "title": "什么是Kecare",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "什么是Kecare 面向多语言内容站的现代静态内容生成器 Kecare 不只是把 Markdown 渲染成网页。 它把内容编译、文章翻译、页面生成和阅读体验放进了一条完整流程里，让你用更少的重复工作，做出更灵活、更现代的内容站。 如果你想要...",
    "hash": "552248be",
    "relativePath": "/什么是Kecare.md",
    "frontMatter": {
      "cover": "http://pichost.cloud/files/266842fa2fcf636088b4e3950f14c131a668c83981ebf8f582ae88c4ef719647.jpg",
      "title": "什么是Kecare",
      "menu": "test",
      "tags": [],
      "desc": "什么是Kecare 面向多语言内容站的现代静态内容生成器 Kecare 不只是把 Markdown 渲染成网页。 它把内容编译、文章翻译、页面生成和阅读体验放进了一条完整流程里，让你用更少的重复工作，做出更灵活、更现代的内容站。 如果你想要...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 3,
      "date": "2026-03-10"
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\552248be.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/552248be",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\552248be.vue",
    "urlPath": "articles/zh-CN/552248be"
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
      "cover": "http://pichost.cloud/files/266842fa2fcf636088b4e3950f14c131a668c83981ebf8f582ae88c4ef719647.jpg",
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
      "cover": "http://pichost.cloud/files/692abf1ec7e9825b7947c98c1bd8f62b0666e23750c56f7b8b1fb5196bf900e3.jpg",
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
    "title": "markdown扩展",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "Markdown 扩展 Kecare 在标准 Markdown 语法的基础上，提供了丰富的扩展功能，让你的文档更加生动和专业。 Front Matter YAML Front Matter 开箱即用，你可以在文章开头添加元数据： 这些数据将...",
    "hash": "b40d18d1",
    "relativePath": "/markdown扩展.md",
    "frontMatter": {
      "cover": "http://pichost.cloud/files/266842fa2fcf636088b4e3950f14c131a668c83981ebf8f582ae88c4ef719647.jpg",
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
      "cover": "http://pichost.cloud/files/852b35d10178459edcf216fdd842d331da8f390a56f8fda74f8d68b2ed3f4fc7.png",
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
  }
]
                const currentPage = 1
                const totalPages = 3
                const totalArticles = 12

                </script>
                <template>
                    <BlogLanding :articles="articles" :current-page="currentPage" :total-pages="totalPages" :total-articles="totalArticles" />
                </template>
            