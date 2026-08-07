                <script setup lang="ts">
                import BlogLanding from "~/components/blog-landing.vue";
                useHead({
                    title: '首页',
                })
                const articles = [
  {
    "lang": "zh-CN",
    "title": "Kecare的热更新以及Vite的HMR原理",
    "isOriginalLang": true,
    "desc": "Kecare的热更新以及Vite的HMR原理 一、概述 传统流程下，每改一个字都要 kecare gen 全量重跑：扫描所有文章 → 解析 Markdown → AI 翻译 → 写所有页面。这在文章多、需要翻译时非常慢。 如果你使用过Vit...",
    "hash": "aaddef53",
    "relativePath": "/Kecare的热更新以及Vite的HMR原理.md",
    "frontMatter": {
      "cover": "https://pichostoss.oss-cn-shanghai.aliyuncs.com/images/1785612859072.jpg",
      "title": "Kecare的热更新以及Vite的HMR原理",
      "tags": [],
      "desc": "Kecare的热更新以及Vite的HMR原理 一、概述 传统流程下，每改一个字都要 kecare gen 全量重跑：扫描所有文章 → 解析 Markdown → AI 翻译 → 写所有页面。这在文章多、需要翻译时非常慢。 如果你使用过Vit...",
      "translate": [
        "zh-CN"
      ],
      "sticky": 5,
      "author": "Pamper",
      "date": "2026-08-03",
      "hidden": false
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\aaddef53.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/aaddef53",
    "__SKIP_ARTICLE_GENERATOR__": true,
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\aaddef53.vue",
    "urlPath": "articles/zh-CN/aaddef53"
  },
  {
    "lang": "zh-CN",
    "title": "增量生成与热更新原理",
    "isOriginalLang": true,
    "desc": "Kecare 增量生成与热更新原理 一、概述 传统流程下，每改一个字都要 kecare gen 全量重跑：扫描所有文章 → 解析 Markdown → AI 翻译 → 写所有页面。这在文章多、需要翻译时非常慢。 kecare dev 解决三...",
    "hash": "8a8cb741",
    "relativePath": "/增量生成与热更新原理.md",
    "frontMatter": {
      "cover": "https://pichostoss.oss-cn-shanghai.aliyuncs.com/images/1785612859072.jpg",
      "title": "增量生成与热更新原理",
      "tags": [],
      "desc": "Kecare 增量生成与热更新原理 一、概述 传统流程下，每改一个字都要 kecare gen 全量重跑：扫描所有文章 → 解析 Markdown → AI 翻译 → 写所有页面。这在文章多、需要翻译时非常慢。 kecare dev 解决三...",
      "translate": [
        "zh-CN"
      ],
      "sticky": 5,
      "author": "Pamper",
      "date": "2026-08-03",
      "hidden": false
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\8a8cb741.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/8a8cb741",
    "__SKIP_ARTICLE_GENERATOR__": true,
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\8a8cb741.vue",
    "urlPath": "articles/zh-CN/8a8cb741"
  },
  {
    "lang": "zh-CN",
    "title": "花月",
    "isOriginalLang": true,
    "desc": "Fioralune（花月） 我好懒的，以下都是几个我自己在做的东西，恳请大家学习和指点喵 PicHost 图床 pichost.cloud 一个用于个人使用的图床罢了，均使用阿里云国内节点部署，存储节点在国内上海，访问速度应该挺快的了已经，...",
    "hash": "54f6a7aa",
    "relativePath": "/花月.md",
    "frontMatter": {
      "cover": "https://pichostoss.oss-cn-shanghai.aliyuncs.com/images/1785613091954.webp",
      "title": "花月",
      "tags": [],
      "desc": "Fioralune（花月） 我好懒的，以下都是几个我自己在做的东西，恳请大家学习和指点喵 PicHost 图床 pichost.cloud 一个用于个人使用的图床罢了，均使用阿里云国内节点部署，存储节点在国内上海，访问速度应该挺快的了已经，...",
      "translate": [
        "zh-CN"
      ],
      "sticky": 5,
      "author": "Pamper",
      "date": "2026-07-04",
      "hidden": false
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\54f6a7aa.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/54f6a7aa",
    "__SKIP_ARTICLE_GENERATOR__": true,
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\54f6a7aa.vue",
    "urlPath": "articles/zh-CN/54f6a7aa"
  },
  {
    "lang": "zh-CN",
    "title": "天天禄杯S2",
    "isOriginalLang": true,
    "desc": "花月Cs赛事S2喵 天天禄杯S1也是半顺利的结束了喵，由于群内呼声热烈，于是我们举办S2喵。鉴于S1出现过多非可控因素导致的观感以及体感上的下降，于是S2将会有更严苛的规则制定以及处罚细则。 如何报名 本次赛事不限制段位，本质娱乐赛属性。也...",
    "hash": "aff462d2",
    "relativePath": "/天天禄杯S2.md",
    "frontMatter": {
      "cover": "https://pichostoss.oss-cn-shanghai.aliyuncs.com/images/1785612859072.jpg",
      "title": "天天禄杯S2",
      "tags": [],
      "desc": "花月Cs赛事S2喵 天天禄杯S1也是半顺利的结束了喵，由于群内呼声热烈，于是我们举办S2喵。鉴于S1出现过多非可控因素导致的观感以及体感上的下降，于是S2将会有更严苛的规则制定以及处罚细则。 如何报名 本次赛事不限制段位，本质娱乐赛属性。也...",
      "translate": [
        "zh-CN"
      ],
      "sticky": 4,
      "author": "Pamper",
      "date": "2026-08-01",
      "hidden": false
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\aff462d2.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/aff462d2",
    "__SKIP_ARTICLE_GENERATOR__": true,
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\aff462d2.vue",
    "urlPath": "articles/zh-CN/aff462d2"
  },
  {
    "lang": "zh-CN",
    "title": "关于我",
    "isOriginalLang": true,
    "menu": "test",
    "desc": "👋Hello Kecare 简介 Kecare是一个开源的的静态网站生成器，它与框架无关，核心特点是非侵入式设计——把内容系统从主题/框架中解耦。只需要了解少量 TypeScript，编写对应的页面生成模板，就可以基于组件自由组合页面，在...",
    "hash": "2f0fd1f2",
    "relativePath": "/关于我.md",
    "frontMatter": {
      "cover": "https://pichostoss.oss-cn-shanghai.aliyuncs.com/images/1785612859072.jpg",
      "title": "关于我",
      "menu": "test",
      "tags": [],
      "desc": "👋Hello Kecare 简介 Kecare是一个开源的的静态网站生成器，它与框架无关，核心特点是非侵入式设计——把内容系统从主题/框架中解耦。只需要了解少量 TypeScript，编写对应的页面生成模板，就可以基于组件自由组合页面，在...",
      "translate": [
        "zh-CN",
        "en-US",
        "ja-JP"
      ],
      "sticky": 4,
      "author": "Pamper",
      "date": "2026-03-10",
      "hidden": false
    },
    "__REAL_FS_PATHS__": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\2f0fd1f2.vue",
    "__REAL_RELATIVE_PATHS__": "articles/zh-CN/2f0fd1f2",
    "__SKIP_ARTICLE_GENERATOR__": true,
    "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\2f0fd1f2.vue",
    "urlPath": "articles/zh-CN/2f0fd1f2"
  }
]
                const currentPage = 1
                const totalPages = 4
                const totalArticles = 17
                const totalTags = 9

                </script>
                <template>
                    <BlogLanding :articles="articles" :current-page="currentPage" :total-pages="totalPages" :total-articles="totalArticles" :total-tags="totalTags" />
                </template>
            