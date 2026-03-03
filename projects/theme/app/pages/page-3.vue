                <script setup lang="ts">
                import BlogLanding from "~/components/blog-landing.vue";
                const articles = [
  {
    "lang": "zh-CN",
    "title": "项目结构约定",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "# 项目结构与约定（Kecare） 无论任何技术栈或者框架，无论是 vue 还是 react 还是 svelte 还是传统的服务端渲染的框架， 任何一个老项目，或者你使用自己喜欢的技术栈所创建的新项目，只要新建一个 .kecare 目录，就...",
    "hash": "a3b16d10",
    "relativePath": "/项目结构约定.md",
    "frontMatter": {
      "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
      "title": "项目结构约定",
      "menu": "test",
      "tags": [],
      "desc": "# 项目结构与约定（Kecare） 无论任何技术栈或者框架，无论是 vue 还是 react 还是 svelte 还是传统的服务端渲染的框架， 任何一个老项目，或者你使用自己喜欢的技术栈所创建的新项目，只要新建一个 .kecare 目录，就...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ]
    },
    "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\a3b16d10.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/a3b16d10",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\a3b16d10.vue",
    "urlPath": "articles/zh-CN/a3b16d10"
  },
  {
    "lang": "zh-CN",
    "title": "贡献指南",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "懒了喵，以后写喵",
    "hash": "43fc313b",
    "relativePath": "/贡献指南.md",
    "frontMatter": {
      "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
      "title": "贡献指南",
      "menu": "test",
      "tags": [],
      "desc": "懒了喵，以后写喵",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ]
    },
    "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\43fc313b.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/43fc313b",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\43fc313b.vue",
    "urlPath": "articles/zh-CN/43fc313b"
  }
]
                const currentPage = 3
                const totalPages = 3
                const totalArticles = 12

                </script>
                <template>
                    <BlogLanding :articles="articles" :current-page="currentPage" :total-pages="totalPages" :total-articles="totalArticles" />
                </template>
            