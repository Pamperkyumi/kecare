# Kecare

![License](https://img.shields.io/badge/license-MIT-22c55e?style=flat-square)
![Version](https://img.shields.io/badge/version-1.0.0--beta.113-06b6d4?style=flat-square)
![Runtime](https://img.shields.io/badge/bun-runtime-f9f1e1?style=flat-square)

**让 Markdown 在一条命令里变成一个完整的多语言静态站点。**

Kecare 是一个为开发者打造的静态站点 / 博客生成器。写文章交给 Markdown，翻译交给 AI，渲染交给 Nuxt —— 你只管内容。

***

## 特性

- **零配置上手**：单一二进制，`create-kecare` 一行命令安装，跨平台开箱即用
- **AI 驱动的多语言翻译**：Front Matter 配置 `translate`，调用 OpenAI / Anthropic 生成多语言变体；需在 `.kecare/kecare.config.ts` 配置 LLM，结果按内容哈希缓存
- **精准增量缓存**：每篇文章基于内容指纹命中缓存，未变文章跳过解析、翻译、文件写入，watch 模式下毫秒级响应
- **模板化扩展**：在 `.kecare/` 下放置 `*.article.ts` / `*.list.ts` / `*.archives.ts` 即可自定义生成器行为，无需 fork 主仓库
- **内置五大处理器**：文章详情、文章列表、归档、搜索索引、文章统计聚合，组合即用
- **跨平台二进制发布**：`@kecare/${platform}-${arch}`（如 `darwin-arm64`、`win32-x64`）按需分发，安装时自动选择

***

## 快速开始

### 部署项目

选择一种方式创建项目，二选一：

- npm：`npm create kecare@beta`
- bun：`bun create kecare@beta`

随后创建一个文件夹，在内部执行初始化命令:`Kecare init`。

可选模板：Nuxt Blog（推荐）、Empty Project、Import from GitHub URL。

### 文章写作

在 `.kecare/article` 目录下创建Markdown文件作为文章源。

***

## 命令

- `kecare gen <project-path>` — 全量生成指定主题项目
- `kecare dev <project-path> [--with-nuxt]` — 监听 `.kecare/articles` 增量重生成
- `kecare clean <project-path>` — 清理生成产物
- `kecare init [project-path]` — 初始化项目（交互式选择模板，路径默认当前目录）
- `kecare version` — 输出版本号
- `kecare --help`  — 输出帮助，可指定命令查看详情

> 任意命令后追加 `--help` 可查看该命令的详细选项与示例。

***

## 文章头字段

| 字段          | 必填 | 说明                 |
| ----------- | -- | ------------------ |
| `title`     | 是  | 文章标题               |
| `menu`      | 是  | 所属菜单               |
| `date`      | 是  | 日期，格式 `YYYY-MM-DD` |
| `translate` | 是  | 翻译语言列表，第一个为原始语言    |
| `tags`      | 否  | 标签数组               |
| `cover`     | 否  | 封面图路径              |
| `desc`      | 否  | 文章摘要               |
| `sticky`    | 否  | 置顶权重               |
| `hidden`    | 否  | `true` 时不生成页面      |
| `author`    | 否  | 作者名                |
| `layout`    | 否  | 布局类型               |

***

## 主题修改

默认已包含文章详情、列表、归档、搜索、统计五大处理器，足以覆盖大多数博客需求。

如有自定义需求，在 `.kecare/` 下放置同名模板文件即可覆盖默认行为：

- `*.article.ts` — 文章详情页
- `*.list.ts` — 文章列表页
- `*.archives.ts` — 归档页
- `*.menu.source.ts` — 菜单源（编译为 `*.menu.generated.ts`）

***

## 部署到 Cloudflare Pages

Kecare 基于 Nuxt，构建产物为纯静态文件，可直接部署到 Cloudflare Pages。

1. 将项目推送到 GitHub / GitLab 仓库
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)，进入 **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. 授权并选择对应仓库，点击 **Begin setup**
4. 填写构建设置（建议直接选择 **Framework preset: Nuxt.js**，下方字段会自动填充）：
   | 配置项                        | 值                             |
   | -------------------------- | ----------------------------- |
   | **Project name**           | 自定义，例如 `kecare-blog`          |
   | **Production branch**      | `main`（或你的默认分支）               |
   | **Build command**          | `npm run build`               |
   | **Build output directory** | `dist`（Cloudflare Nuxt 预设默认值） |
   | **Root directory**         | 留空（monorepo 才需要填写）            |
5. 点击 **Save and Deploy**，等待首次构建完成

***

## 许可证

[MIT](./LICENSE) © 2025 Pamper
