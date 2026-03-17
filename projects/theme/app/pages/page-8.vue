                <script setup lang="ts">
                import BlogLanding from "~/components/blog-landing.vue";
                useHead({
                    title: '首页',
                })
                const articles = [
  {
    "lang": "zh-CN",
    "title": "贡献指南",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "贡献指南 感谢你对 Kecare 项目的关注！ 懒了喵，以后写 致谢 感谢所有为 Kecare 做出贡献的开发者！ 你的每一份贡献都让这个项目变得更好。 贡献流程： Fork 项目 创建分支 进行修改 提交 PR 等待审核 我们期待你的贡献...",
    "hash": "43fc313b",
    "relativePath": "/贡献指南.md",
    "frontMatter": {
      "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
      "title": "贡献指南",
      "menu": "test",
      "tags": [
        "菜单",
        "导航",
        "测试",
        "Kecare"
      ],
      "desc": "贡献指南 感谢你对 Kecare 项目的关注！ 懒了喵，以后写 致谢 感谢所有为 Kecare 做出贡献的开发者！ 你的每一份贡献都让这个项目变得更好。 贡献流程： Fork 项目 创建分支 进行修改 提交 PR 等待审核 我们期待你的贡献...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 0,
      "date": "2026-03-02"
    },
    "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\43fc313b.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/43fc313b",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\43fc313b.vue",
    "urlPath": "articles/zh-CN/43fc313b"
  },
  {
    "lang": "zh-CN",
    "title": "菜单系统",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "菜单系统 如果你使用博客来写文档（比如你现在读的这一页），通常左侧会有一个菜单栏/目录栏帮助跳转。Kecare 提供了一套简单、统一的菜单编写方式。 菜单存放位置 在 Kecare 中，菜单有固定的存放位置： | 项目 | 说明 | |--...",
    "hash": "4ee23999",
    "relativePath": "/菜单系统.md",
    "frontMatter": {
      "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
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
    "cover": "https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\4ee23999.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/4ee23999",
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\4ee23999.vue",
    "urlPath": "articles/zh-CN/4ee23999"
  }
]
                const currentPage = 8
                const totalPages = 8
                const totalArticles = 16

                </script>
                <template>
                    <BlogLanding :articles="articles" :current-page="currentPage" :total-pages="totalPages" :total-articles="totalArticles" />
                </template>
            