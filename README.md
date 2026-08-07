# Kecare

![License](https://img.shields.io/badge/license-MIT-22c55e?style=flat-square)
![Version](https://img.shields.io/badge/version-1.0.0--beta.113-06b6d4?style=flat-square)
![Runtime](https://img.shields.io/badge/bun-runtime-f9f1e1?style=flat-square)Kecare 是一个**框架无关的静态文档站生成器**。它负责内容：解析 Markdown、调度 AI 翻译、产出结构化数据与按需页面模板。前端怎么写、主题怎么搭、部署去哪——全都由你的框架（Nuxt / Next.js / VitePress / Astro / React / Vue / 甚至纯 PHP）决定。

***

## 为什么是 Kecare

每个项目都需要文档。API 参考、使用教程、Changelog、FAQ——但每个项目的技术栈不一样，从零搭一个文档站的轮子太重。

Kecare 把**内容系统**和**主题/框架**解耦：

- **内容层**（Markdown 源、AI 翻译、Front Matter、缓存）由 Kecare 管理
- **页面层**（路由、组件、样式）由你的框架 + 模板代码生成
- **部署层**（任何静态托管都行）由你决定

会写一点点 TypeScript、配置几个模板，就能搭出一个文档站。

***

## 特性

- **框架无关**：不绑定任何前端栈。Nuxt、Next.js、VitePress、Astro、React、Vue、纯静态 HTML……只要能消费 JS/TS 模块，就能用 Kecare
- **AI 驱动的多语言翻译**：Front Matter 配置 `translate`，调用 OpenAI / Anthropic 生成多语言变体；按内容哈希缓存
- **精准增量缓存**：每篇文章基于内容指纹命中缓存，未变文章跳过解析、翻译、文件写入，watch 模式下毫秒级响应
- **模板化扩展**：在 `.kecare/` 下放置 `*.article.ts` / `*.list.ts` / `*.archives.ts` 即可自定义生成器行为，无需 fork 主仓库
- **内置五大处理器**：文档详情、列表、归档、搜索索引、统计聚合，组合即用
- **零配置上手**：单一二进制，`create-kecare` 一行命令安装，跨平台开箱即用
- **跨平台二进制发布**：`@kecare/${platform}-${arch}`（如 `darwin-arm64`、`win32-x64`）按需分发

***

## 快速开始

### 初始化项目

```bash
npm create kecare@beta
# 或
bun create kecare@beta
```

随后进入新建的文件夹，执行：

```bash
kecare init
```

按提示选择模板（Nuxt / Next.js / VitePress / Astro / Empty / 从 GitHub URL 导入）。

### 写文档

在 `.kecare/article` 目录下创建 Markdown 文件作为文档源。Kecare 会把它编译成结构化数据 + 渲染好的页面。

***

## 命令

- `kecare gen <project-path>` — 全量生成指定主题项目
- `kecare dev <project-path> [--with-framework]` — 监听 `.kecare/articles` 增量重生成，可选自动拉起框架 dev server
- `kecare clean <project-path>` — 清理生成产物
- `kecare init [project-path]` — 初始化项目（交互式选择模板，路径默认当前目录）
- `kecare version` — 输出版本号
- `kecare --help` — 输出帮助，可指定命令查看详情

> 任意命令后追加 `--help` 可查看该命令的详细选项与示例。

***

## Front Matter

| 字段          | 必填 | 说明                 |
| ----------- | -- | ------------------ |
| `title`     | 是  | 文档标题               |
| `menu`      | 是  | 所属导航分组             |
| `date`      | 是  | 日期，格式 `YYYY-MM-DD` |
| `translate` | 是  | 翻译语言列表，第一个为原始语言    |
| `tags`      | 否  | 标签数组               |
| `cover`     | 否  | 封面图路径              |
| `desc`      | 否  | 文档摘要               |
| `sticky`    | 否  | 排序权重               |
| `hidden`    | 否  | `true` 时不生成页面      |
| `author`    | 否  | 作者名                |
| `layout`    | 否  | 布局类型               |

***

## 模板扩展

Kecare 的"主题/模板"就是你项目里的 `.kecare/` 目录。下放同名模板文件即可覆盖默认行为：

- `*.article.ts` — 文档详情页
- `*.list.ts` — 文档列表页
- `*.archives.ts` — 归档页
- `*.menu.source.ts` — 导航源（编译为 `*.menu.generated.ts`）

默认已包含详情、列表、归档、搜索、统计五大处理器，足以覆盖大多数文档站需求。

### 模板接口

```typescript
// *.article.ts — 文档详情页
import type { ArticleVariant, KecareContext } from "kecare"

export const type = 'article-detail'

export async function generator(context: KecareContext, article: ArticleVariant) {
    return {
        urlPath: `articles/${article.lang}/${article.hash}`,
        fsPath: '...',
        template: `<template>...</template>`
    }
}
```

```typescript
// *.list.ts — 文档列表页
import type { ArticlesRecord, KecareContext } from "kecare"

export function generator(context: KecareContext, articles: ArticlesRecord) {
    return [
        { fsPath: '.../index.vue', template: '...' },
        { fsPath: '.../page-2.vue', template: '...' }
    ]
}
```

`template` 字段的内容由你的框架决定——`.vue` / `.tsx` / `.astro` / `.svelte` / `.html` 都可以。

***

## 部署

Kecare 的职责在「内容层」就结束了——它输出的结构化数据、模板代码、静态资源，配合**你框架自己的构建步骤**才会变成可部署的产物。

所以这一节没有"标准流程"。Nuxt 用 `nuxt build`、Next.js 用 `next build`、Astro 用 `astro build`、纯 HTML 可能根本不用构建——`build command` 和 `output directory` 取决于你的模板里写的是什么。

部署侧同样五花八门：Cloudflare Pages、Vercel、Netlify、GitHub Pages、自建 Nginx、对象存储 + CDN……只要能托管静态文件就行，Kecare 不挑。

> **建议**：先确认你的模板能跑出可部署的产物（参考对应框架的部署文档），再把 Kecare 的输出接进去。下面给一个 Nuxt 用户的最小示例，方便对齐字段含义：

| 配置项                        | 示例（Nuxt）            |
| -------------------------- | ------------------- |
| **Framework preset**       | `Nuxt.js`           |
| **Build command**          | `npm run build`     |
| **Build output directory** | `dist`              |
| **Environment variables**  | `NODE_VERSION = 20` |

非 Nuxt 模板请把 `Framework preset` 改成你用的栈，让平台自动填充，或参考该框架官方文档手填。

***

## 项目结构

```
Kecare/
├── packages/
│   └── kecare/              # 核心包，导出公共类型和工具函数
│       ├── types.ts         # 核心类型定义 (KecareContext, ArticleVariant, FrontMatter 等)
│       └── utils/           # 工具函数
│
├── projects/
│   ├── generator/           # 生成器核心
│   │   ├── index.ts         # 入口文件
│   │   ├── commands/        # CLI 命令处理
│   │   ├── input-drivers/   # 输入驱动 (处理不同格式的源文件)
│   │   ├── module-handler/  # 模块处理器 (生成页面)
│   │   └── utils/           # 工具函数
│   │
│   └── theme/               # 主题项目示例（Nuxt）
│       ├── .kecare/         # Kecare 配置和数据目录
│       └── app/             # Nuxt 应用目录
```

***

## 许可证

[MIT](./LICENSE) © 2025 Pamper
