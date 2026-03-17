                <script setup lang="ts">
                import BlogLanding from "~/components/blog-landing.vue";
                const articles = [
  {
    "lang": "zh-CN",
    "title": "Kecare从这里开始喵 copy 4",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "关于 Kecare：从这里开始 💡 写在前面：如果你觉得文档中有不清楚的地方，欢迎提 Issue 或 PR 帮助改进，非常感谢你的贡献！ Kecare 是一个面向现代静态博客与笔记站点的生成器框架。它最大的目标不是\"再做一个 Hexo\"，...",
    "hash": "a9c79160",
    "relativePath": "/Kecare从这里开始喵 copy 4.md",
    "frontMatter": {
      "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
      "title": "Kecare从这里开始喵 copy 4",
      "menu": "test",
      "tags": [],
      "desc": "关于 Kecare：从这里开始 💡 写在前面：如果你觉得文档中有不清楚的地方，欢迎提 Issue 或 PR 帮助改进，非常感谢你的贡献！ Kecare 是一个面向现代静态博客与笔记站点的生成器框架。它最大的目标不是\"再做一个 Hexo\"，...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 2,
      "date": "2026-03-10"
    },
    "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\a9c79160.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/a9c79160",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\a9c79160.vue",
    "urlPath": "articles/zh-CN/a9c79160"
  },
  {
    "lang": "zh-CN",
    "title": "Kecare从这里开始喵",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "关于 Kecare：从这里开始 💡 写在前面：如果你觉得文档中有不清楚的地方，欢迎提 Issue 或 PR 帮助改进，非常感谢你的贡献！ Kecare 是一个面向现代静态博客与笔记站点的生成器框架。它最大的目标不是\"再做一个 Hexo\"，...",
    "hash": "70e6923c",
    "relativePath": "/Kecare从这里开始喵.md",
    "frontMatter": {
      "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
      "title": "Kecare从这里开始喵",
      "menu": "test",
      "tags": [],
      "desc": "关于 Kecare：从这里开始 💡 写在前面：如果你觉得文档中有不清楚的地方，欢迎提 Issue 或 PR 帮助改进，非常感谢你的贡献！ Kecare 是一个面向现代静态博客与笔记站点的生成器框架。它最大的目标不是\"再做一个 Hexo\"，...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 2,
      "date": "2026-03-10"
    },
    "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\70e6923c.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/70e6923c",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\70e6923c.vue",
    "urlPath": "articles/zh-CN/70e6923c"
  }
]
                const currentPage = 3
                const totalPages = 8
                const totalArticles = 16

                </script>
                <template>
                    <BlogLanding :articles="articles" :current-page="currentPage" :total-pages="totalPages" :total-articles="totalArticles" />
                </template>
            