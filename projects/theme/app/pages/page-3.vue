                <script setup lang="ts">
                import BlogLanding from "~/components/blog-landing.vue";
                const articles = [
  {
    "lang": "zh-CN",
    "title": "菜单系统",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "# 菜单系统 如果你使用博客来写文档（比如你现在读的这一页），通常左侧会有一个菜单栏/目录栏帮助跳转。Kecare 提供了一套简单、统一的菜单编写方式。 --- ## 菜单存放位置 在 Kecare 中，菜单有固定的存放位置： | 项目 |...",
    "hash": "4ee23999",
    "relativePath": "/菜单系统.md",
    "frontMatter": {
      "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
      "title": "菜单系统",
      "menu": "test",
      "tags": [],
      "desc": "# 菜单系统 如果你使用博客来写文档（比如你现在读的这一页），通常左侧会有一个菜单栏/目录栏帮助跳转。Kecare 提供了一套简单、统一的菜单编写方式。 --- ## 菜单存放位置 在 Kecare 中，菜单有固定的存放位置： | 项目 |...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 0,
      "date": "2026-03-01"
    },
    "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\4ee23999.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/4ee23999",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\4ee23999.vue",
    "urlPath": "articles/zh-CN/4ee23999"
  }
]
                const currentPage = 3
                const totalPages = 3
                const totalArticles = 11

                </script>
                <template>
                    <BlogLanding :articles="articles" :current-page="currentPage" :total-pages="totalPages" :total-articles="totalArticles" />
                </template>
            