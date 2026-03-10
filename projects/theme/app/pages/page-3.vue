                <script setup lang="ts">
                import BlogLanding from "~/components/blog-landing.vue";
                const articles = [
  {
    "lang": "zh-CN",
    "title": "贡献指南",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "# 贡献指南 感谢你对 Kecare 项目的关注！ 懒了喵，以后写 ## 致谢 感谢所有为 Kecare 做出贡献的开发者！ 你的每一份贡献都让这个项目变得更好。 贡献流程： 1. Fork 项目 2. 创建分支 3. 进行修改 4. 提交...",
    "hash": "43fc313b",
    "relativePath": "/贡献指南.md",
    "frontMatter": {
      "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
      "title": "贡献指南",
      "menu": "test",
      "tags": [],
      "desc": "# 贡献指南 感谢你对 Kecare 项目的关注！ 懒了喵，以后写 ## 致谢 感谢所有为 Kecare 做出贡献的开发者！ 你的每一份贡献都让这个项目变得更好。 贡献流程： 1. Fork 项目 2. 创建分支 3. 进行修改 4. 提交...",
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
                const totalArticles = 11

                </script>
                <template>
                    <BlogLanding :articles="articles" :current-page="currentPage" :total-pages="totalPages" :total-articles="totalArticles" />
                </template>
            