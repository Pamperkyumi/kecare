                <script setup lang="ts">
                import BlogLanding from "~/components/blog-landing.vue";
                useHead({
                    title: '首页',
                })
                const articles = [
  {
    "lang": "zh-CN",
    "title": "markdown扩展",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "Markdown 扩展 Kecare 在标准 Markdown 语法的基础上，提供了丰富的扩展功能，让你的文档更加生动和专业。 Front Matter YAML Front Matter 开箱即用，你可以在文章开头添加元数据： 这些数据将...",
    "hash": "b40d18d1",
    "relativePath": "/markdown扩展.md",
    "frontMatter": {
      "cover": "http://pichost.cloud/files/d409bed9b5cb6706b27a548332ead440da1bdfa23428561a66d59b753c190ac2.jpg",
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
      "cover": "http://pichost.cloud/files/874a924352100b2931c947d68c92dac886c5b02bde9ed6cc1cfcd4c5076b03a3.jpg",
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
      "cover": "http://pichost.cloud/files/d409bed9b5cb6706b27a548332ead440da1bdfa23428561a66d59b753c190ac2.jpg",
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
  },
  {
    "lang": "zh-CN",
    "title": "生成器CLI",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "生成器 CLI 命令 | 命令 | 说明 | |------|------| | kecare gen | 构建站点，生成页面文件 | | kecare -version | 查看当前版本 | 使用示例 执行流程 扫描 .kecare/ar...",
    "hash": "fddd58bb",
    "relativePath": "/生成器CLI.md",
    "frontMatter": {
      "cover": "http://pichost.cloud/files/d409bed9b5cb6706b27a548332ead440da1bdfa23428561a66d59b753c190ac2.jpg",
      "title": "生成器CLI",
      "menu": "test",
      "tags": [],
      "desc": "生成器 CLI 命令 | 命令 | 说明 | |------|------| | kecare gen | 构建站点，生成页面文件 | | kecare -version | 查看当前版本 | 使用示例 执行流程 扫描 .kecare/ar...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 0,
      "date": "2026-03-05"
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\fddd58bb.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/fddd58bb",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\fddd58bb.vue",
    "urlPath": "articles/zh-CN/fddd58bb"
  },
  {
    "lang": "zh-CN",
    "title": "快速开始",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "快速开始 按照Kecare相当简单，仅需安装Kecare CLI 即可帮你从0开始一个 Kecare 项目。它将引导你完成设置新项目的每一步，并允许你从几个不同的官方入门模板中进行选择。如果你只是想为你的已有项目中快速接入一个博客/文档站，...",
    "hash": "95bb100b",
    "relativePath": "/快速开始.md",
    "frontMatter": {
      "cover": "http://pichost.cloud/files/d409bed9b5cb6706b27a548332ead440da1bdfa23428561a66d59b753c190ac2.jpg",
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
      "date": "2026-03-04"
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\95bb100b.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/95bb100b",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\95bb100b.vue",
    "urlPath": "articles/zh-CN/95bb100b"
  }
]
                const currentPage = 2
                const totalPages = 3
                const totalArticles = 13

                </script>
                <template>
                    <BlogLanding :articles="articles" :current-page="currentPage" :total-pages="totalPages" :total-articles="totalArticles" />
                </template>
            