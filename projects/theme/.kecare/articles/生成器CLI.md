---
date: 2026-03-05
menu: test
translate: ['zh-CN', 'en-US', 'ja-JP']
---

# 生成器 CLI

---

## 命令

| 命令 | 说明 |
|------|------|
| `kecare gen <path>` | 构建站点，生成页面文件 |
| `kecare -version` | 查看当前版本 |

---

## 使用示例

```bash
kecare gen .                    # 当前目录
kecare gen ./Kecare-theme       # 相对路径
kecare gen /home/user/theme     # 绝对路径
```

---

## 执行流程

1. 扫描 `.kecare/articles/` 下的 Markdown 文件
2. 解析 Front Matter 和正文内容
3. 执行翻译（如果配置了 `translate`）
4. 运行 `*.article.ts` 和 `*.list.ts` 生成页面
5. 输出文件到指定目录
