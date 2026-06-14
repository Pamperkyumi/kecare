<!-- Generated: 2026-06-14T00:55:39.888Z -->
<script setup lang="ts">
useHead({
    title: '标签',
})

interface TagArticle {
    title: string
    hash: string
    urlPath: string
    date: string
}

interface TagGroup {
    tag: string
    articles: TagArticle[]
}

const tagGroups: TagGroup[] = [
  {
    "tag": "主题开发",
    "articles": [
      {
        "title": "主题开发归档页",
        "lang": "zh-CN",
        "hash": "93b7f9a7",
        "tags": [
          "主题开发",
          "归档页"
        ],
        "date": "2026-03-21",
        "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\93b7f9a7.vue",
        "urlPath": "articles/zh-CN/93b7f9a7"
      },
      {
        "title": "主题开发文章页",
        "lang": "zh-CN",
        "hash": "989b9235",
        "tags": [
          "主题开发",
          "文章页"
        ],
        "date": "2026-03-21",
        "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\989b9235.vue",
        "urlPath": "articles/zh-CN/989b9235"
      },
      {
        "title": "主题开发落地页",
        "lang": "zh-CN",
        "hash": "e52553ad",
        "tags": [
          "主题开发",
          "落地页",
          "列表页"
        ],
        "date": "2026-03-21",
        "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\e52553ad.vue",
        "urlPath": "articles/zh-CN/e52553ad"
      }
    ]
  },
  {
    "tag": "菜单",
    "articles": [
      {
        "title": "贡献指南",
        "lang": "zh-CN",
        "hash": "43fc313b",
        "tags": [
          "菜单",
          "导航",
          "测试",
          "Kecare"
        ],
        "date": "2026-03-02",
        "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\43fc313b.vue",
        "urlPath": "articles/zh-CN/43fc313b"
      },
      {
        "title": "菜单系统",
        "lang": "zh-CN",
        "hash": "4ee23999",
        "tags": [
          "菜单",
          "导航",
          "测试",
          "Kecare"
        ],
        "date": "2026-03-01",
        "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\4ee23999.vue",
        "urlPath": "articles/zh-CN/4ee23999"
      }
    ]
  },
  {
    "tag": "导航",
    "articles": [
      {
        "title": "贡献指南",
        "lang": "zh-CN",
        "hash": "43fc313b",
        "tags": [
          "菜单",
          "导航",
          "测试",
          "Kecare"
        ],
        "date": "2026-03-02",
        "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\43fc313b.vue",
        "urlPath": "articles/zh-CN/43fc313b"
      },
      {
        "title": "菜单系统",
        "lang": "zh-CN",
        "hash": "4ee23999",
        "tags": [
          "菜单",
          "导航",
          "测试",
          "Kecare"
        ],
        "date": "2026-03-01",
        "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\4ee23999.vue",
        "urlPath": "articles/zh-CN/4ee23999"
      }
    ]
  },
  {
    "tag": "测试",
    "articles": [
      {
        "title": "贡献指南",
        "lang": "zh-CN",
        "hash": "43fc313b",
        "tags": [
          "菜单",
          "导航",
          "测试",
          "Kecare"
        ],
        "date": "2026-03-02",
        "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\43fc313b.vue",
        "urlPath": "articles/zh-CN/43fc313b"
      },
      {
        "title": "菜单系统",
        "lang": "zh-CN",
        "hash": "4ee23999",
        "tags": [
          "菜单",
          "导航",
          "测试",
          "Kecare"
        ],
        "date": "2026-03-01",
        "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\4ee23999.vue",
        "urlPath": "articles/zh-CN/4ee23999"
      }
    ]
  },
  {
    "tag": "Kecare",
    "articles": [
      {
        "title": "贡献指南",
        "lang": "zh-CN",
        "hash": "43fc313b",
        "tags": [
          "菜单",
          "导航",
          "测试",
          "Kecare"
        ],
        "date": "2026-03-02",
        "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\43fc313b.vue",
        "urlPath": "articles/zh-CN/43fc313b"
      },
      {
        "title": "菜单系统",
        "lang": "zh-CN",
        "hash": "4ee23999",
        "tags": [
          "菜单",
          "导航",
          "测试",
          "Kecare"
        ],
        "date": "2026-03-01",
        "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\4ee23999.vue",
        "urlPath": "articles/zh-CN/4ee23999"
      }
    ]
  },
  {
    "tag": "归档页",
    "articles": [
      {
        "title": "主题开发归档页",
        "lang": "zh-CN",
        "hash": "93b7f9a7",
        "tags": [
          "主题开发",
          "归档页"
        ],
        "date": "2026-03-21",
        "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\93b7f9a7.vue",
        "urlPath": "articles/zh-CN/93b7f9a7"
      }
    ]
  },
  {
    "tag": "文章页",
    "articles": [
      {
        "title": "主题开发文章页",
        "lang": "zh-CN",
        "hash": "989b9235",
        "tags": [
          "主题开发",
          "文章页"
        ],
        "date": "2026-03-21",
        "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\989b9235.vue",
        "urlPath": "articles/zh-CN/989b9235"
      }
    ]
  },
  {
    "tag": "落地页",
    "articles": [
      {
        "title": "主题开发落地页",
        "lang": "zh-CN",
        "hash": "e52553ad",
        "tags": [
          "主题开发",
          "落地页",
          "列表页"
        ],
        "date": "2026-03-21",
        "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\e52553ad.vue",
        "urlPath": "articles/zh-CN/e52553ad"
      }
    ]
  },
  {
    "tag": "列表页",
    "articles": [
      {
        "title": "主题开发落地页",
        "lang": "zh-CN",
        "hash": "e52553ad",
        "tags": [
          "主题开发",
          "落地页",
          "列表页"
        ],
        "date": "2026-03-21",
        "fsPath": "C:\\Users\\Pamper\\Desktop\\workspace\\Kecare\\projects\\theme\\app\\pages\\articles\\zh-CN\\e52553ad.vue",
        "urlPath": "articles/zh-CN/e52553ad"
      }
    ]
  }
]
const totalTags = tagGroups.length
</script>

<template>
    <div class="tags-page">
        <h1 class="tags-title">标签</h1>
        <p class="tags-count">共 {{ totalTags }} 个标签</p>

        <div class="tag-cloud">
            <div v-for="group in tagGroups" :key="group.tag" class="tag-section">
                <h2 class="tag-name">
                    #{{ group.tag }}
                    <span class="tag-article-count">({{ group.articles.length }})</span>
                </h2>
                <ul class="tag-article-list">
                    <li v-for="article in group.articles" :key="article.hash">
                        <NuxtLink :to="'/' + article.urlPath" class="article-link">
                            <span class="article-title">{{ article.title }}</span>
                            <span class="article-date">{{ article.date }}</span>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.tags-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
}

.tags-title {
    font-size: 2rem;
    margin-bottom: 0.5rem;
}

.tags-count {
    color: #666;
    margin-bottom: 2rem;
}

.tag-section {
    margin-bottom: 2rem;
    padding: 1rem;
    border: 1px solid #eaeaea;
    border-radius: 8px;
}

.tag-name {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
    color: #333;
}

.tag-article-count {
    font-size: 0.875rem;
    color: #999;
    font-weight: normal;
}

.tag-article-list {
    list-style: none;
    padding: 0;
}

.tag-article-list li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #f0f0f0;
}

.article-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    color: #333;
}

.article-link:hover {
    color: #0070f3;
}

.article-date {
    font-size: 0.875rem;
    color: #999;
}
</style>
