# Kecare 生成器

在你每次进行思考以及代码编写前，请你详细阅读这份关于Kecare生成器的编码规范以及逻辑处理，避免产生不必要的错误

---

# 编码规范

1.  **代码风格**：优先采用**过程式编程风格**，避免不必要的函数封装。代码应能从上到下线性阅读，便于快速理解逻辑意图。
2.  **代码注释**：在关键逻辑处编写清晰的注释，帮助阅读者理解代码的意图和作用。
3.  **导入语句**：所有导入必须包含完整的文件名，即以 `.ts` 为后缀。例如：`import { astra } from "../../utils/test.ts";`
4.  **循环使用**：**禁止**在循环中使用 `forEach`、`map`、`reduce` 等高阶函数。请使用 `for … of`、`for … in` 或普通 `for` 循环替代，以保持代码的线性执行逻辑和对异步操作的支持。允许使用 `filter` 和 `some` 这类纯数据过滤的高阶函数。
5.  **代码质量**：编辑器已启用 ESLint 扩展，编码必须符合其规范。
6.  **命名规范**：所有变量名（包括数据库的表名和列名）均采用**小写驼峰命名法**。
7.  **TypeScript 配置**：项目已开启 `allowImportingTsExtensions` 选项，重申第三条规范：所有导入必须包含 `.ts` 后缀。
8.  **文件路径层级**：你必须使用工具复核 import 的文件路径是否存在，避免引入不存在的文件。很多时候都是文件名正确但是层级有误。

---

# 项目架构概览

```
Kecare/
├── packages/
│   └── kecare/              # 核心包（单包双入口）
│       ├── types.ts         # 核心类型定义 (KecareContext, ArticleVariant, FrontMatter, ArticlesRecord 等)
│       ├── sdk/             # 浏览器端运行时 SDK（tabs/代码高亮/复制/目录等文章页交互），从 "kecare/sdk" 子路径导出
│       ├── utils/           # 工具函数 (is-valid-date-string.ts)
│       └── index.ts         # 根入口 "kecare"：仅导出 types + utils（环境无关，禁止 re-export sdk）
│
├── projects/
│   ├── generator/           # 生成器核心（Bun 侧 CLI）
│   │   ├── index.ts         # 入口文件
│   │   ├── commands/        # CLI 命令处理 (gen/dev/init/clean/version/help)
│   │   ├── input-drivers/   # 输入驱动 (处理不同格式的源文件)
│   │   ├── module-handler/  # 模块处理器 (生成页面 + 统一数据收集)
│   │   └── utils/           # 工具函数 (配置加载/产物登记表等)
│   │
│   ├── test/                # e2e 测试夹具目录（每个 test-* 目录是一个独立场景）
│   └── theme/               # 主题项目示例
│       ├── .kecare/         # Kecare 配置、模板、文章与缓存目录
│       └── app/             # Nuxt 应用目录
```

**类型定义**：所有核心类型定义在 `/packages/kecare/types.ts`，编写代码时请先查阅该文件。如果需要新增类型，请在此文件中添加。

---

# 核心执行流程

```
用户输入: kecare gen <theme-path>
    ↓
commands/__ROOT__.ts → 解析命令行参数，路由命令
    ↓
execute-index-command.ts → 调用 run-generation.ts
    ↓
run-generation.ts → 校验 .kecare 目录存在，创建 KecareContext（每次生成新建 context）
    ↓
input-drivers/__ROOT__.ts → 先生成菜单（menu.ts），再按内存分批并发执行文章 chunk
    ↓
markdown-driver/__ROOT__.ts → 解析 Front Matter、校验、翻译（manifest v2 内容哈希缓存），产出 ArticleVariant
    ↓
module-handler/__ROOT__.ts → 处理文章数据，生成页面
    ├── emitArticleHandle() → 每篇文章调用一次（article 处理器完成后统一收集）
    │   ├── article.ts → 调用 *.article.ts 模板生成详情页，产物登记进 __REAL_FS_PATHS__ 数组与产物登记表
    │   └── article-collector.ts → collect() 统一收集一次（丢弃 html）
    │
    └── emitModuleFinish() → 所有文章处理完成后调用
        ├── article-collector.ts → computeStats() 计算聚合统计写入 context.articleStats
        ├── list.ts / archives.ts / search.ts → 从收集器派生视图，生成列表页/归档页/搜索索引
        └── product-registry.ts → 产物登记表落盘（clean 命令的清理依据）
```

---

# 数据流与产物规范（重要）

1. **统一收集**：文章数据只在 `module-handler/article-collector.ts` 收集一次。**禁止**在 handler 阶段新增平行的文章数据收集逻辑；finish 阶段通过 `toArticlesRecord() / toSearchArticles() / toArchiveArticles() / computeStats()` 派生视图消费。
2. **确定性输出**：文章并发处理，完成顺序每次不同。收集器派生视图前按 `relativePath + lang` 排序（代码单元序，勿用 localeCompare）。新增任何派生视图必须沿用该排序，保证相同输入产出逐字节相同的产物。
3. **产物路径登记**：变体产物记录在 `__REAL_FS_PATHS__` / `__REAL_RELATIVE_PATHS__`（**数组**，多个 *.article.ts 模板会登记多条，类型见 packages/kecare/types.ts）。缓存重建判断、hidden 清理、dev 孤儿清理（pruneOrphans）均按数组遍历全部产物，**不得**只取单条。
4. **产物登记表**：所有写盘产物（article/list/archives）必须调用 `useProductRegistry(context).register(fsPath)` 登记，由 `emitModuleFinish` 统一落盘到 `.kecare/cache/product-registry.json`。**禁止**硬编码产物目录（如 app/pages/articles）做清理，clean 命令只按登记表与 manifest 清理。
5. **实例缓存模式**：模块处理器、收集器、登记表、配置加载均使用 `WeakMap<KecareContext, instance>` 缓存，gen/dev 每周期新建 context 即自动重置状态。新增有状态模块请沿用该模式。
6. **缓存清单版本**：`.kecare/cache/markdown-manifest.json` 当前为 **version: 2**（产物路径为数组）。修改 manifest 结构时必须递增版本号，并在 `loadMarkdownCache` 中补齐旧版本迁移逻辑。
7. **翻译失败不写缓存**：LLM 翻译失败（标题/段落）只回退原文渲染，**不得**写入段落缓存，保证下次运行能重试。

---

# 各层职责详解

## commands/ - 命令层

- `__ROOT__.ts`：解析命令行参数，支持 `--option=value`、`--flag`、`help:xxx` 子命令，路由到各命令
- `execute-index-command.ts`：gen 命令，调用 runGeneration；失败时 consola.error + exit(1)
- `execute-dev-command.ts`：dev 命令，初始全量生成后监听 `.kecare/articles`（400ms debounce），每周期先 pruneOrphans 清理孤儿产物再 runGeneration；`--with-nuxt` 同时拉起 nuxt dev 子进程
- `execute-init-command.ts`：初始化项目（模板克隆/空项目/GitHub 导入）
- `execute-clean-command.ts`：按产物登记表 + manifest 的真实路径清理全部生成产物与搜索索引，并自下而上回收空目录
- `execute-check-command.ts`：check 体检命令——校验模板导出契约（含干跑）、Front Matter（全量扫描、无视缓存）、菜单与配置；不生成文件、不调 LLM；有问题 exit(1)，可挂 CI
- `run-generation.ts`：共享生成流程（gen 与 dev 周期共用）
- `execute-version-command.ts` / `help.ts`：版本输出 / 统一帮助系统

## input-drivers/ - 输入驱动层

**职责**：扫描源文件，解析内容，生成 ArticleVariant 数据

- `markdown-driver/__ROOT__.ts`：处理 Markdown 文件
  1. 解析 Front Matter (YAML 格式) 并校验元数据字段
  2. Markdown → HTML (marked + tabs 自定义扩展 + KaTeX；扩展在进程内只注册一次)
  3. 多语言翻译处理（段落级哈希缓存 + 代码块占位符保护，翻译失败不落缓存）
  4. manifest v2 内容哈希缓存：未变更文章跳过解析/翻译/写盘；产物文件缺失时用缓存数据重建

**Front Matter 字段**：
- `title`: 文章标题（缺省时回退为文件名）
- `menu`: 所属菜单名称（可选）
- `date`: 日期，格式 `YYYY-MM-DD`（**必填**，校验失败会中断生成）
- `translate`: 语言数组，第一个为原始语言（缺省为 `['en-US']`）
- 其余可选字段：`desc` / `cover` / `tags` / `sticky` / `author` / `layout` / `hidden`

## module-handler/ - 模块处理器层

**职责**：读取主题模板文件，生成最终页面。文章数据的收集与派生统一走 article-collector.ts。

### article.ts - 文章详情页
1. 扫描 `.kecare/**/*.article.ts` 模板文件
2. 对每篇文章调用模板的 `generator(context, article)` 方法并将返回的模板写入文件
3. 产物路径登记进 `__REAL_FS_PATHS__` 数组与产物登记表；缓存命中且产物完好时跳过重新生成（已有产物仍会登记）

### article-collector.ts - 统一收集器
`collect()` 每篇文章调用一次（收集时丢弃 html）；`toArticlesRecord() / toSearchArticles() / toArchiveArticles() / computeStats()` 供 finish 阶段派生视图

### list.ts / archives.ts - 列表页与归档页
finish 阶段从收集器拉取视图，调用 `*.list.ts` / `*.archives.ts` 模板生成分页列表与归档页，产物写入产物登记表

### search.ts - 搜索索引（内建模块，无模板）
从收集器派生搜索数据，写 `public/articles/<hash>.<lang>.json` 与 `search-index.json`；索引条目从同一份数据派生，不维护平行数组

### menu.ts - 菜单文件
1. 扫描 `.kecare/menus/*.menu.source.ts`
2. 将 `link` 字段中的文件名转换为 hash
3. 生成对应的 `*.menu.generated.ts`（在文章生成前执行，供详情页模板导入）

---

## *.article.ts - 文章页面模板

```typescript
import type { ArticleVariant, KecareContext } from "kecare";

export const type = 'article-detail';

export async function generator(context: KecareContext, article: ArticleVariant) {
    return {
        urlPath: `articles/${article.lang}/${article.hash}`,
        fsPath: join(context.projectPath, 'app/pages/articles', article.lang, `${article.hash}.vue`),
        template: `<template>...</template>`
    };
}
```

返回的 `fsPath` 会被自动登记：多个模板 = 多个产物文件，全部进入 `__REAL_FS_PATHS__` 数组与产物登记表，供缓存重建与清理使用。

## *.list.ts / *.archives.ts - 列表/归档页面模板

```typescript
import type { ArticlesRecord, KecareContext } from "kecare";

export function generator(context: KecareContext, articles: ArticlesRecord) {
    // articles: { [hash]: { [lang]: ArticleData } }，由收集器派生，顺序确定
    return [
        { fsPath: '.../index.vue', template: '...' },
        { fsPath: '.../page-2.vue', template: '...' }
    ];
}
```

---

# 工具函数 (utils/)

projects/generator/utils/：
- `parse-front-matter.ts`：解析 Markdown 文件开头的 YAML Front Matter
- `extra-desc-from-html.ts`：从 Markdown/HTML 提取纯文本摘要
- `kecare-config.ts` / `theme-config.ts`：加载 `.kecare/kecare.config.ts`（LLM 翻译配置 / 主题配置）
- `product-registry.ts`：产物登记表（登记/落盘/读取，clean 命令的清理依据）
- `cli.ts`：init 命令的交互式选择

packages/kecare/utils/：
- `is-valid-date-string.ts`：日期校验与解析（isValidDateString / parseDateString）

---
