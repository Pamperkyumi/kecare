                <script setup lang="ts">
                import BlogLanding from "~/components/blog-landing.vue";
                const articles = [
  {
    "lang": "zh-CN",
    "title": "快速开始",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "# 快速开始 如果你想快速体验 Kecare 搭建博客，不打算立刻研究生成器原理或二次开发，按照这篇文档操作就能在本地运行起来。 --- ## 前置要求 ### 必需项 | 要求 | 说明 | 验证命令 | |------|------|-...",
    "hash": "95bb100b",
    "relativePath": "/快速开始.md",
    "frontMatter": {
      "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
      "title": "快速开始",
      "menu": "test",
      "tags": [],
      "desc": "# 快速开始 如果你想快速体验 Kecare 搭建博客，不打算立刻研究生成器原理或二次开发，按照这篇文档操作就能在本地运行起来。 --- ## 前置要求 ### 必需项 | 要求 | 说明 | 验证命令 | |------|------|-...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ]
    },
    "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\95bb100b.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/95bb100b",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\95bb100b.vue",
    "urlPath": "articles/zh-CN/95bb100b"
  }
]
                const currentPage = 3
                const totalPages = 3
                const totalArticles = 11

                </script>
                <template>
                    <BlogLanding :articles="articles" :current-page="currentPage" :total-pages="totalPages" :total-articles="totalArticles" />
                </template>
            