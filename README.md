# Kecare

基于 Bun + Nuxt 的静态博客生成器。编写 Markdown，自动生成多语言文章页、列表页、归档页、菜单与搜索索引，并支持增量生成与开发时热更新。

## 特性

- **Markdown 驱动**：Front Matter 声明元数据，`marked` + 自定义扩展（KaTeX、代码高亮、Tabs 等）渲染 HTML
- **多语言翻译**：`translate` 字段声明目标语言，支持 AI 翻译并缓存翻译结果，增量生成时跳过已翻译内容
- **主题系统**：通过 `.kecare/` 目录下的 `*.article.ts`、`*.list.ts`、`*.menu.source.ts`、`*.archives.ts` 模板文件定制页面
- **增量生成与热更新**：基于 manifest 缓存实现增量生成，`dev` 命令监听源文件变化并联动 Nuxt HMR
- **内置搜索与统计**：自动生成搜索索引与文章统计

## 仓库结构

```
Kecare/
├── packages/
│   ├── kecare/           # 核心包：公共类型定义与工具函数（发布到 npm）
│   └── create-kecare/    # 脚手架：创建新的 Kecare 项目（发布到 npm）
├── projects/
│   ├── generator/        # 生成器核心（CLI 命令、输入驱动、模块处理器）
│   ├── theme/            # 官方主题示例（Nuxt 应用，文章源文件位于 .kecare/articles）
│   └── test/             # 端到端测试用例
├── .commands/            # 仓库辅助脚本（CI 发布等）
├── Publish.ts            # 交互式发布脚本（版本号、打 tag、推送）
└── kecare-zh-cn.dockerfile  # 中文站点构建与部署镜像
```

> `projects/kecare-template-nuxt` 是模板子模块（默认不初始化），如需修改模板请先执行 `git submodule update --init projects/kecare-template-nuxt`。

## 环境要求

- [Bun](https://bun.com) >= 1.2
- Node.js >= 20（Nuxt 主题开发时使用）

## 快速开始

```bash
# 安装依赖
bun install

# 生成主题页面（路径为本地 theme 目录，可按需修改 package.json 中的脚本）
bun run gen

# 开发模式（监听文章变化 + 启动 Nuxt 开发服务器）
bun run dev

# 运行测试
bun run test

# 清理生成产物
bun run clean
```

## 生成器 CLI

直接运行生成器：

```bash
bun run ./projects/generator/index.ts <command> <theme-path> [options]
```

| 命令   | 说明                                       |
| ------ | ------------------------------------------ |
| `gen`  | 扫描并生成主题页面                         |
| `dev`  | 增量生成并监听文件变化，联动 Nuxt HMR      |
| `init` | 初始化主题目录结构                         |
| `clean`| 清理生成的页面与缓存                      |
| `version` | 输出版本信息                            |
| `help` | 查看帮助，支持 `--option=value` 传参       |

## 文章格式

文章源文件位于主题的 `.kecare/articles/` 目录，Front Matter 必填字段：

```markdown
---
title: 文章标题
menu: 所属菜单
date: 2026-01-01
translate:
  - zh-CN        # 第一个为原始语言
  - en-US
  - ja-JP
---

正文内容（Markdown）...
```

## 发布

- 运行 `bun run Publish.ts`：交互式更新版本号、生成 commit message、打 tag 并推送，随后同步发布 theme 仓库
- 推送 tag 后，GitHub Actions（`.github/workflows/publish.yml`）自动发布 npm 包（`kecare`、`create-kecare`、`kecare-generator`）

## License

见 [LICENSE](./LICENSE)。
