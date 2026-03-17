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
    "desc": "在已有项目上使用 Kecare 如果你想要在已有项目上使用 Kecare 为你的项目添加文档/使用说明等内容，你不需要进行太多复杂繁琐的配置，使用 Kecare 可以方便快捷地生成所需的文档页面。 本文档将手把手教你如何在已有项目中集成 K...",
    "hash": "95140e73",
    "relativePath": "/在已有项目上使用kecare.md",
    "frontMatter": {
      "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
      "title": "在已有项目上使用kecare",
      "menu": "test",
      "tags": [],
      "desc": "在已有项目上使用 Kecare 如果你想要在已有项目上使用 Kecare 为你的项目添加文档/使用说明等内容，你不需要进行太多复杂繁琐的配置，使用 Kecare 可以方便快捷地生成所需的文档页面。 本文档将手把手教你如何在已有项目中集成 K...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 1,
      "date": "2026-03-11"
    },
    "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
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
      "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
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
    "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\b40d18d1.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/b40d18d1",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\b40d18d1.vue",
    "urlPath": "articles/zh-CN/b40d18d1"
  }
]
                const currentPage = 4
                const totalPages = 8
                const totalArticles = 16

                </script>
                <template>
                    <BlogLanding :articles="articles" :current-page="currentPage" :total-pages="totalPages" :total-articles="totalArticles" />
                </template>
            