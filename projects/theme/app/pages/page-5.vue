                <script setup lang="ts">
                import BlogLanding from "~/components/blog-landing.vue";
                useHead({
                    title: '首页',
                })
                const articles = [
  {
    "lang": "zh-CN",
    "title": "Github pages",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "部署到 GitHub Pages 本文档将手把手教你如何将 Kecare 博客部署到 GitHub Pages，让你的站点从本地走向线上。 前置准备 在开始部署之前，请确保你已经准备好以下内容： | 准备项 | 说明 | |--------...",
    "hash": "39f6b230",
    "relativePath": "/Github pages.md",
    "frontMatter": {
      "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
      "title": "Github pages",
      "menu": "test",
      "tags": [],
      "desc": "部署到 GitHub Pages 本文档将手把手教你如何将 Kecare 博客部署到 GitHub Pages，让你的站点从本地走向线上。 前置准备 在开始部署之前，请确保你已经准备好以下内容： | 准备项 | 说明 | |--------...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 0,
      "date": "2026-03-08"
    },
    "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\39f6b230.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/39f6b230",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\39f6b230.vue",
    "urlPath": "articles/zh-CN/39f6b230"
  },
  {
    "lang": "zh-CN",
    "title": "front-matter",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "Front Matter 每篇文章都可以在开头写一段 Front Matter（YAML 格式），用于提供文章的元信息，例如：标题、日期、标签、描述、作者、封面、置顶、菜单等。 什么是 Front Matter Front Matter 是...",
    "hash": "5f065839",
    "relativePath": "/front-matter.md",
    "frontMatter": {
      "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
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
    "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\5f065839.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/5f065839",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\5f065839.vue",
    "urlPath": "articles/zh-CN/5f065839"
  }
]
                const currentPage = 5
                const totalPages = 8
                const totalArticles = 16

                </script>
                <template>
                    <BlogLanding :articles="articles" :current-page="currentPage" :total-pages="totalPages" :total-articles="totalArticles" />
                </template>
            