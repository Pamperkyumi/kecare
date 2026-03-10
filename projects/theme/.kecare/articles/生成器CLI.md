---
menu: test
translate: ['zh-CN', 'en-US', 'ja-JP']
---

# 生成器 CLI

Kecare 提供了便捷的命令行工具来简化你的开发流程。本文档介绍所有可用的 CLI 命令。

---

## 命令概览

| 命令 | 说明 |
|------|------|
| `kecare gen [path]` | 构建站点，生成页面文件 |
| kecare -version | 查看当前版本           |

---

## 构建站点

### 基本用法

```bash
kecare gen <主题路径>
```

### 示例

```bash
# 在主题目录中执行
kecare gen .

# 指定相对路径
kecare gen ./Kecare-theme

# 指定绝对路径
kecare gen /home/user/Kecare-theme
```

### 执行流程

当你运行 `kecare gen` 时，Kecare 会：

1. **扫描文章目录**：读取 `.kecare/articles/` 下的所有 Markdown 文件
2. **解析文章内容**：提取 Front Matter 和正文内容
3. **执行翻译**（如果配置）：根据 `translate` 字段翻译文章
4. **运行生成器**：执行 `*.article.ts` 和 `*.list.ts` 生成页面
5. **输出文件**：将生成的页面写入指定目录

---

## 常见问题
