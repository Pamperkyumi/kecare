                <script setup lang="ts">
                import BlogLanding from "~/components/blog-landing.vue";
                useHead({
                    title: '首页',
                })
                const articles = [
  {
    "lang": "zh-CN",
    "title": "菜单系统",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "菜单系统 如果你使用博客来写文档（比如你现在读的这一页），通常左侧会有一个菜单栏/目录栏帮助跳转。Kecare 提供了一套简单、统一的菜单编写方式。 菜单存放位置 在 Kecare 中，菜单有固定的存放位置： | 项目 | 说明 | |--...",
    "hash": "4ee23999",
    "relativePath": "/菜单系统.md",
    "frontMatter": {
      "cover": "http://pichost.cloud/files/852b35d10178459edcf216fdd842d331da8f390a56f8fda74f8d68b2ed3f4fc7.png",
      "title": "菜单系统",
      "menu": "test",
      "tags": [
        "菜单",
        "导航",
        "测试",
        "Kecare"
      ],
      "desc": "菜单系统 如果你使用博客来写文档（比如你现在读的这一页），通常左侧会有一个菜单栏/目录栏帮助跳转。Kecare 提供了一套简单、统一的菜单编写方式。 菜单存放位置 在 Kecare 中，菜单有固定的存放位置： | 项目 | 说明 | |--...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 0,
      "date": "2026-03-01"
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\4ee23999.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/4ee23999",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\4ee23999.vue",
    "urlPath": "articles/zh-CN/4ee23999"
  }
]
                const currentPage = 4
                const totalPages = 4
                const totalArticles = 16

                </script>
                <template>
                    <BlogLanding :articles="articles" :current-page="currentPage" :total-pages="totalPages" :total-articles="totalArticles" />
                </template>
            