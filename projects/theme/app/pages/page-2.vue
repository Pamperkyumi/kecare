                <script setup lang="ts">
                import BlogLanding from "~/components/blog-landing.vue";
                useHead({
                    title: '首页',
                })
                const articles = [
  {
    "lang": "zh-CN",
    "title": "front-matter",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "Front Matter 每篇文章都可以在开头写一段 Front Matter（YAML 格式），用于提供文章的元信息，例如：标题、日期、标签、描述、作者、封面、置顶、菜单等。 什么是 Front Matter Front Matter 是...",
    "hash": "5f065839",
    "relativePath": "/front-matter.md",
    "frontMatter": {
      "cover": "http://pichost.cloud/files/852b35d10178459edcf216fdd842d331da8f390a56f8fda74f8d68b2ed3f4fc7.png",
      "title": "front-matter",
      "menu": "test",
      "tags": [],
      "desc": "Front Matter 每篇文章都可以在开头写一段 Front Matter（YAML 格式），用于提供文章的元信息，例如：标题、日期、标签、描述、作者、封面、置顶、菜单等。 什么是 Front Matter Front Matter 是...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 0,
      "date": "2026-03-07"
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\5f065839.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/5f065839",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\5f065839.vue",
    "urlPath": "articles/zh-CN/5f065839"
  },
  {
    "lang": "zh-CN",
    "title": "写作",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "写作 在 Kecare 中，文章存放在 主题目录/.kecare/articles/ 目录下，目前仅支持 Markdown 文件。 创建文章 在 .kecare/articles/ 目录下创建 .md 文件 编写内容 文件名建议使用小写字母...",
    "hash": "6e8c5f0b",
    "relativePath": "/写作.md",
    "frontMatter": {
      "cover": "http://pichost.cloud/files/af0e1cec4766b50bcf61b741cf78d77530c2a24019bc0ba3d17a88624e04ce34.jpg",
      "title": "写作",
      "menu": "test",
      "tags": [],
      "desc": "写作 在 Kecare 中，文章存放在 主题目录/.kecare/articles/ 目录下，目前仅支持 Markdown 文件。 创建文章 在 .kecare/articles/ 目录下创建 .md 文件 编写内容 文件名建议使用小写字母...",
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
      "cover": "http://pichost.cloud/files/af0e1cec4766b50bcf61b741cf78d77530c2a24019bc0ba3d17a88624e04ce34.jpg",
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
    "desc": "快速开始 按照以下步骤，几分钟内即可在本地运行 Kecare 博客。 前置要求 | 要求 | 说明 | 验证命令 | | --- | --- | --- | | Node.js | 安装依赖、启动开发服务器 | node -v | | Gi...",
    "hash": "95bb100b",
    "relativePath": "/快速开始.md",
    "frontMatter": {
      "cover": "http://pichost.cloud/files/af0e1cec4766b50bcf61b741cf78d77530c2a24019bc0ba3d17a88624e04ce34.jpg",
      "title": "快速开始",
      "menu": "test",
      "tags": [],
      "desc": "快速开始 按照以下步骤，几分钟内即可在本地运行 Kecare 博客。 前置要求 | 要求 | 说明 | 验证命令 | | --- | --- | --- | | Node.js | 安装依赖、启动开发服务器 | node -v | | Gi...",
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
  },
  {
    "lang": "zh-CN",
    "title": "国际化处理",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "国际化处理 Kecare 支持 AI 自动翻译，让文章触达多语言读者。 启用翻译 在文章 Front Matter 中添加 translate 字段： 第一个语言代码必须是文章的原始语言。 配置翻译服务 在 .kecare/kecare.c...",
    "hash": "493f5fa2",
    "relativePath": "/国际化处理.md",
    "frontMatter": {
      "cover": "http://pichost.cloud/files/692abf1ec7e9825b7947c98c1bd8f62b0666e23750c56f7b8b1fb5196bf900e3.jpg",
      "title": "国际化处理",
      "menu": "test",
      "tags": [],
      "desc": "国际化处理 Kecare 支持 AI 自动翻译，让文章触达多语言读者。 启用翻译 在文章 Front Matter 中添加 translate 字段： 第一个语言代码必须是文章的原始语言。 配置翻译服务 在 .kecare/kecare.c...",
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
  }
]
                const currentPage = 2
                const totalPages = 3
                const totalArticles = 12

                </script>
                <template>
                    <BlogLanding :articles="articles" :current-page="currentPage" :total-pages="totalPages" :total-articles="totalArticles" />
                </template>
            