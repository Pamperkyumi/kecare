---
menu: test
translate: ['zh-CN', 'en-US', 'ja-JP']
---

# 在已有项目上使用 Kecare

如果你想要在已有项目上使用 Kecare 为你的项目添加文档/使用说明等内容，你不需要进行太多复杂繁琐的配置，使用 Kecare 可以方便快捷地生成所需的文档页面。

本文档将手把手教你如何在已有项目中集成 Kecare，即使你是初学者也能轻松上手。

---

## 前置要求

在开始之前，请确保你的项目满足以下条件：

| 要求 | 说明 |
|------|------|
| 包管理器 | 已安装 npm、pnpm、yarn 或 bun |
| 框架支持 | 支持 Vue、React、Svelte 或传统服务端渲染框架 |
| TypeScript | 建议使用 TypeScript 以获得更好的类型提示 |

---

## 核心概念

在开始配置之前，让我们先了解几个核心概念：

### 什么是 Kecare？

Kecare 是一个博客/文档生成器，它能够：

1. **解析 Markdown 文章**：将你写的 Markdown 文件解析成结构化数据
2. **支持国际化**：自动翻译文章到多种语言
3. **生成页面**：根据你定义的模板生成对应的页面文件

### 工作流程

```
Markdown 文章 → Kecare 解析 → 生成器处理 → Vue/React 组件
```

### 关键文件说明

| 文件名 | 作用 | 必需 |
|--------|------|------|
| `articles/` | 存放 Markdown 文章的文件夹 | ✅ 是 |
| `*.article.ts` | 文章详情页生成器 | ✅ 是 |
| `*.list.ts` | 文章列表页生成器 | ✅ 是 |
| `kecare.config.ts` | Kecare 配置文件（翻译等） | ⚪ 可选 |
| `menus/` | 菜单配置文件夹 | ⚪ 可选 |

---

## 快速开始

### 第一步：创建 .kecare 文件夹

在你的项目根目录下创建 `.kecare` 文件夹：

```txt
your-project/
├── .kecare/
│   ├── articles/           # 存放文章
│   ├── foo-bar.article.ts  # 文章详情页生成器
│   └── foo-bar.list.ts     # 文章列表页生成器
├── package.json
└── ...
```

### 第二步：安装 Kecare

```bash
npm install kecare
# 或
pnpm add kecare
# 或
bun add kecare
```

### 第三步：创建文章详情页生成器

创建 `foo-bar.article.ts` 文件（文件名可自定义）：

```ts
// .kecare/foo-bar.article.ts
import { join } from 'node:path';
import type { ArticleVariant, KecareContext } from "kecare";

export const type = 'article-detail';

export async function generator(context: KecareContext, article: ArticleVariant) {
    return {
        // 文章详情页面的 URL 路径
        urlPath: ['articles', article.lang, article.hash].join('/'),
        
        // 生成的文件路径
        fsPath: join(context.projectPath, 'app', 'pages', 'articles', article.lang, `${article.hash}.vue`),
        
        // 页面模板
        template: `
            <script setup lang="ts">
            import ArticleTheme from '~/components/ArticleTheme.vue'
            const article = ${JSON.stringify(article)}
            </script>
            <template>
                <ArticleTheme :article="article" />
            </template>
        `
    };
}
```

### 第四步：创建文章列表页生成器

创建 `foo-bar.list.ts` 文件（文件名可自定义）：

```ts
// .kecare/foo-bar.list.ts
import { join } from 'node:path';
import type { ArticlesRecord, KecareContext } from "kecare";

export const type = 'article-list';

const ARTICLES_PER_PAGE = 5;  // 每页文章数
const TARGET_LANGUAGE = 'zh-CN';  // 目标语言

export function generator(context: KecareContext, articles: ArticlesRecord) {
    const files: Array<{ fsPath: string; template: string }> = [];
    const zhArticles: Array<unknown> = [];

    // 筛选目标语言的文章
    for (const articleHash in articles) {
        const articleLanguages = articles[articleHash]!;
        if (articleLanguages[TARGET_LANGUAGE]) {
            zhArticles.push(articleLanguages[TARGET_LANGUAGE]);
        }
    }

    const totalArticles = zhArticles.length;
    const totalPages = Math.ceil(zhArticles.length / ARTICLES_PER_PAGE);

    // 生成分页页面
    for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
        const startIndex = pageIndex * ARTICLES_PER_PAGE;
        const endIndex = startIndex + ARTICLES_PER_PAGE;
        const pageArticles = zhArticles.slice(startIndex, endIndex);
        const pageNumber = pageIndex + 1;
        const fileName = pageNumber === 1 ? 'index.vue' : `page-${pageNumber}.vue`;

        files.push({
            fsPath: join(context.projectPath, 'app', 'pages', fileName),
            template: `
                <script setup lang="ts">
                import BlogLanding from "~/components/BlogLanding.vue";
                const articles = ${JSON.stringify(pageArticles, null, 2)}
                const currentPage = ${pageNumber}
                const totalPages = ${totalPages}
                const totalArticles = ${totalArticles}
                </script>
                <template>
                    <BlogLanding 
                        :articles="articles" 
                        :current-page="currentPage" 
                        :total-pages="totalPages" 
                        :total-articles="totalArticles" 
                    />
                </template>
            `,
        });
    }

    return files;
}
```

### 第五步：创建文章展示组件

创建一个用于展示文章的组件：

```vue
<!-- components/ArticleTheme.vue -->
<script setup lang="ts">
import { useKecareSDK } from 'kecare';
import type { ArticleVariant } from "kecare";

// 初始化 Kecare SDK（用于 Markdown 扩展功能）
const kecareSDK = await useKecareSDK();

onMounted(async () => {
    await nextTick();
    await kecareSDK!.mounted(props.article.rawMarkdown);
});

const props = defineProps<{
    article: ArticleVariant;
}>();
</script>

<template>
    <div class="article-container">
        <h1 class="article-title">{{ props.article.title }}</h1>
        <p class="article-desc">{{ props.article.desc }}</p>
        <div class="article-content" v-html="props.article.html"></div>
    </div>
</template>
```

### 第六步：创建文章列表组件

```vue
<!-- components/BlogLanding.vue -->
<script lang="ts" setup>
import type { ArticlesRecord } from "kecare";

const props = defineProps<{
    articles: ArticlesRecord;
    currentPage?: number;
    totalPages?: number;
    totalArticles?: number;
}>();

// 定义文章卡片类型
interface ArticleCard {
    id: string;
    title: string;
    desc: string;
    date?: string;
    author?: string;
    to: string;
    lang: string;
    cover?: string;
}

// 处理文章数据
const articleCards = computed<ArticleCard[]>(() => {
    const records = props.articles ?? [];
    
    if (Array.isArray(records)) {
        return records.map((article: any) => ({
            id: article.hash ?? article.id ?? "",
            title: article.title ?? "",
            desc: article.desc ?? "",
            date: article.date,
            author: article.author,
            to: article.urlPath ?? "#",
            lang: article.lang ?? "",
            cover: article.cover,
        }));
    }
    return [];
});
</script>

<template>
    <div class="blog-container">
        <!-- 文章列表 -->
        <div class="articles">
            <NuxtLink 
                class="article-card" 
                v-for="(article, index) in articleCards" 
                :key="index" 
                :to="article.to"
            >
                <img v-if="article.cover" class="cover" :src="article.cover" :alt="article.title" />
                <h2 class="title">{{ article.title }}</h2>
                <p class="desc">{{ article.desc }}</p>
                <div class="meta">
                    <span>作者: {{ article.author }}</span>
                    <span>{{ article.date }}</span>
                </div>
            </NuxtLink>
        </div>

        <!-- 分页导航 -->
        <nav class="pagination" v-if="(totalPages ?? 1) > 1">
            <NuxtLink 
                v-if="(currentPage ?? 1) > 1" 
                :to="(currentPage ?? 1) === 2 ? '/' : `/page-${(currentPage ?? 1) - 1}`"
            >
                上一页
            </NuxtLink>
            <span>第 {{ currentPage }} / {{ totalPages }} 页</span>
            <NuxtLink 
                v-if="(currentPage ?? 1) < (totalPages ?? 1)" 
                :to="`/page-${(currentPage ?? 1) + 1}`"
            >
                下一页
            </NuxtLink>
        </nav>
    </div>
</template>
```

### 第七步：运行生成器

```bash
kecare gen .
```

Kecare 提供了完整的 TypeScript 类型定义，帮助你更好地开发：

### KecareContext

生成器上下文，包含项目路径等信息：

```ts
type KecareContext = {
    projectPath: string;  // 项目根路径
}
```

### ArticleVariant

单篇文章的完整数据：

```ts
type ArticleVariant = {
    title: string;           // 文章标题
    html: string;            // 渲染后的 HTML
    cover: string | undefined;   // 封面图片
    menu: string | undefined;    // 所属菜单
    desc: string;            // 文章描述
    lang: string;            // 语言代码（如 zh-CN）
    isOriginalLang: boolean; // 是否为原始语言
    hash: string;            // 文章唯一标识
    frontMatter: FrontMatter; // Front Matter 数据
    rawMarkdown: string;     // 原始 Markdown 内容
    [key: string | number | symbol]: any;  // 其他自定义字段
}
```

### ArticlesRecord

所有文章的嵌套记录：

```ts
type ArticlesRecord = Record<
    string,  // 文章 hash
    Record<
        string,  // 语言代码
        Omit<ArticleVariant, 'html'> & { 
            fsPath: string;   // 文件系统路径
            urlPath: string;  // URL 路径
        }
    >
>;
```

### FrontMatter

文章元数据：

```ts
type FrontMatter = {
    menu: string;                 // 所属菜单
    cover: string | undefined;    // 封面图片
    layout: string | undefined;   // 布局模板
    title: string;                // 标题
    desc: string | undefined;     // 描述
    tags: Array<string>;          // 标签列表
    translate: Array<string>;     // 翻译语言列表
};
```

### ModuleArticleTS

文章详情页生成器类型：

```ts
type ModuleArticleTS = {
    generator: (context: KecareContext, article: ArticleVariant) => Promise<{
        urlPath: string;    // 页面 URL
        fsPath: string;     // 文件路径
        template: string;   // 页面模板
    }>;
}
```

### ModuleListTS

文章列表页生成器类型：

```ts
type ModuleListTS = {
    generator: (context: KecareContext, articles: ArticlesRecord) => Promise<
        Array<{ fsPath: string; template: string }> |
        { fsPath: string; template: string }
    >;
}
```

## 

### 1. 目录结构建议

```txt
your-project/
├── .kecare/
│   ├── articles/              # 文章目录
│   │   ├── getting-started.md
│   │   └── advanced-usage.md
│   ├── menus/                 # 菜单目录（可选）
│   │   └── docs.menu.source.ts
│   ├── blog.article.ts        # 文章详情生成器
│   ├── blog.list.ts           # 文章列表生成器
│   └── kecare.config.ts       # 配置文件
├── components/
│   ├── ArticleTheme.vue       # 文章展示组件
│   └── BlogLanding.vue        # 列表展示组件
└── pages/                     # 生成的页面将输出到这里
```

### 3. 使用 Kecare SDK

Kecare SDK 提供了 Markdown 扩展功能，如代码高亮、复制按钮等：

```vue
<script setup>
import { useKecareSDK } from 'kecare';

const kecareSDK = await useKecareSDK();

onMounted(async () => {
    await nextTick();
    // 必须调用 mounted 方法来启用扩展功能
    await kecareSDK!.mounted(props.article.rawMarkdown);
});
</script>
```

### 4. 多语言支持

在列表生成器中筛选特定语言的文章：

```ts
const TARGET_LANGUAGE = 'zh-CN';

for (const articleHash in articles) {
    const articleLanguages = articles[articleHash]!;
    if (articleLanguages[TARGET_LANGUAGE]) {
        // 处理该语言的文章
    }
}
```

### 5. 分页处理

```ts
const ARTICLES_PER_PAGE = 10;

const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);

for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
    const pageArticles = articles.slice(
        pageIndex * ARTICLES_PER_PAGE,
        (pageIndex + 1) * ARTICLES_PER_PAGE
    );
    // 生成页面...
}
```

---

## 常见问题

### Q: 生成的页面文件在哪里？

A: 页面文件的位置由你在生成器中设置的 `fsPath` 决定。通常建议放在项目的 `pages` 目录下。

### Q: 如何自定义文章 URL？

A: 在文章详情生成器中修改 `urlPath` 的返回值：

```ts
urlPath: ['blog', article.lang, article.hash].join('/')
// 结果: /blog/zh-CN/abc123
```

### Q: 如何获取文章的原始 Markdown 内容？

A: `ArticleVariant` 类型中的 `rawMarkdown` 字段包含了原始 Markdown 内容：

```ts
const rawContent = article.rawMarkdown;
```

### Q: 为什么需要调用 kecareSDK.mounted()？

A: Kecare SDK 提供了 Markdown 扩展功能（如代码高亮、Tabs、复制按钮等），调用 `mounted()` 方法会在页面挂载时初始化这些功能。

### Q: 如何支持多种框架？

A: Kecare 与框架无关，你只需要在 `template` 中返回对应框架的代码即可：

```ts
// React 示例
template: `
    import React from 'react';
    export default function Article({ article }) {
        return (
            <div>
                <h1>{article.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: article.html }} />
            </div>
        );
    }
`
```

### Q: 文章 ID 是如何生成的？

A: 文章 ID（hash）通常由文章文件名或内容哈希生成，确保每篇文章有唯一且稳定的标识符。

