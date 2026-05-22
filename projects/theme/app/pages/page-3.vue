                <script setup lang="ts">
                import BlogLanding from "~/components/blog-landing.vue";
                useHead({
                    title: '首页',
                })
                const articles = [
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
      "author": "Pamper",
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
      "cover": "https://free.picui.cn/free/2026/05/20/6a0dcd06916f0.jpg",
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
      "author": "Pamper",
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
      "date": "2026-03-04"
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\95bb100b.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/95bb100b",
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
      "date": "2026-03-02"
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\43fc313b.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/43fc313b",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\43fc313b.vue",
    "urlPath": "articles/zh-CN/43fc313b"
  }
]
                const currentPage = 3
                const totalPages = 4
                const totalArticles = 16

                </script>
                <template>
                    <BlogLanding :articles="articles" :current-page="currentPage" :total-pages="totalPages" :total-articles="totalArticles" />
                </template>
            