---
date: 2026-03-07
menu: test
translate: ['zh-CN', 'en-US', 'ja-JP']
---

# Front Matter

每篇文章都可以在开头写一段 **Front Matter**（YAML 格式），用于提供文章的元信息，例如：标题、日期、标签、描述、作者、封面、置顶、菜单等。

---

## 什么是 Front Matter

Front Matter 是位于 Markdown 文件开头的 YAML 格式元数据块，以 `---` 分隔。Kecare 会解析这些元数据，并将其传递给主题组件使用。

---

## 完整示例

以下是一个包含所有常用字段的 Front Matter 示例：

```yaml
---
title: 写作指南                 # 文章标题
date: 2025-11-19               # 发布日期
tags:                          # 标签列表
  - kecare
  - blog
  - 教程
desc: 这是一篇关于如何使用 Kecare 写作的指南  # 文章摘要
author: 作者名                 # 作者名称
coverSrc: "https://example.com/cover.webp"  # 封面图片
sticky: 1                      # 置顶优先级
menu: kecare-docs              # 所属菜单
translate: ['zh-CN', 'en-US', 'ja-JP']  # 翻译语言，第一个值建议为当前语言
---

其他字段会使用默认值，你可以随时回来补充。
