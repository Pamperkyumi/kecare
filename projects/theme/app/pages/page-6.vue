                <script setup lang="ts">
                import BlogLanding from "~/components/blog-landing.vue";
                const articles = [
  {
    "lang": "zh-CN",
    "title": "写作",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "写作 在 Kecare 中，文章有固定的存放位置和格式规范。本文档将教你如何创建和编写文章。 文章存放位置 在 Kecare 中，文章统一存放在以下目录： | 项目 | 说明 | |------|------| | 目录位置 | 主题目录/...",
    "hash": "6e8c5f0b",
    "relativePath": "/写作.md",
    "frontMatter": {
      "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
      "title": "写作",
      "menu": "test",
      "tags": [],
      "desc": "写作 在 Kecare 中，文章有固定的存放位置和格式规范。本文档将教你如何创建和编写文章。 文章存放位置 在 Kecare 中，文章统一存放在以下目录： | 项目 | 说明 | |------|------| | 目录位置 | 主题目录/...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 0,
      "date": "2026-03-06"
    },
    "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
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
    "desc": "生成器 CLI Kecare 提供了便捷的命令行工具来简化你的开发流程。本文档介绍所有可用的 CLI 命令。 命令概览 | 命令 | 说明 | |------|------| | kecare gen [path] | 构建站点，生成页面文...",
    "hash": "fddd58bb",
    "relativePath": "/生成器CLI.md",
    "frontMatter": {
      "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
      "title": "生成器CLI",
      "menu": "test",
      "tags": [],
      "desc": "生成器 CLI Kecare 提供了便捷的命令行工具来简化你的开发流程。本文档介绍所有可用的 CLI 命令。 命令概览 | 命令 | 说明 | |------|------| | kecare gen [path] | 构建站点，生成页面文...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 0,
      "date": "2026-03-05"
    },
    "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\fddd58bb.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/fddd58bb",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\fddd58bb.vue",
    "urlPath": "articles/zh-CN/fddd58bb"
  }
]
                const currentPage = 6
                const totalPages = 8
                const totalArticles = 16

                </script>
                <template>
                    <BlogLanding :articles="articles" :current-page="currentPage" :total-pages="totalPages" :total-articles="totalArticles" />
                </template>
            