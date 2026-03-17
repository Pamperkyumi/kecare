                <script setup lang="ts">
                import BlogLanding from "~/components/blog-landing.vue";
                useHead({
                    title: '首页',
                })
                const articles = [
  {
    "lang": "zh-CN",
    "title": "快速开始",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "快速开始 如果你想快速体验 Kecare 搭建博客，不打算立刻研究生成器原理或二次开发，按照这篇文档操作就能在本地运行起来。 前置要求 必需项 | 要求 | 说明 | 验证命令 | |------|------|----------| |...",
    "hash": "95bb100b",
    "relativePath": "/快速开始.md",
    "frontMatter": {
      "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
      "title": "快速开始",
      "menu": "test",
      "tags": [],
      "desc": "快速开始 如果你想快速体验 Kecare 搭建博客，不打算立刻研究生成器原理或二次开发，按照这篇文档操作就能在本地运行起来。 前置要求 必需项 | 要求 | 说明 | 验证命令 | |------|------|----------| |...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 0,
      "date": "2026-03-04"
    },
    "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
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
    "desc": "国际化处理 每一篇用心撰写的文章都值得被更多人看见，值得跨越语言的界限，被全世界的读者阅读。Kecare 为你提供了强大的国际化（i18n）支持，让你的内容能够轻松触达全球受众。 为什么需要国际化 扩大受众范围 触达不同语言背景的读者 提升...",
    "hash": "493f5fa2",
    "relativePath": "/国际化处理.md",
    "frontMatter": {
      "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
      "title": "国际化处理",
      "menu": "test",
      "tags": [],
      "desc": "国际化处理 每一篇用心撰写的文章都值得被更多人看见，值得跨越语言的界限，被全世界的读者阅读。Kecare 为你提供了强大的国际化（i18n）支持，让你的内容能够轻松触达全球受众。 为什么需要国际化 扩大受众范围 触达不同语言背景的读者 提升...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 0,
      "date": "2026-03-03"
    },
    "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\493f5fa2.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/493f5fa2",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\493f5fa2.vue",
    "urlPath": "articles/zh-CN/493f5fa2"
  }
]
                const currentPage = 7
                const totalPages = 8
                const totalArticles = 16

                </script>
                <template>
                    <BlogLanding :articles="articles" :current-page="currentPage" :total-pages="totalPages" :total-articles="totalArticles" />
                </template>
            