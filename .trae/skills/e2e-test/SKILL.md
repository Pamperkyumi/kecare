---
name: "e2e-test"
description: "编写关于 projects/test 目录下的测试时阅读"
---

# Kecare 生成器测试编写指南

## 测试目录结构

```
projects/test/
├── run.ts                    # 测试运行脚本
├── test-basic/               # 基础测试模板（可复制使用）
│   └── .kecare/
│       ├── articles/
│       │   └── basic.md      # 标准格式的文章
│       ├── foo-bar.article.ts
│       └── tsconfig.json
└── test-no-title/            # 测试用例：无标题场景
    └── .kecare/
        ├── articles/
        │   └── .md           # 空文件名，测试无标题处理
        ├── kecare.config.ts
        └── ...
```

## 测试编写流程

### 1. 明确测试需求

在创建测试前，需要明确：
- **测试场景**：要测试什么功能或边界情况？
- **预期结果**：生成器应该如何处理这种情况？

### 2. 创建测试目录

复制 `test-basic` 目录，重命名为 `test-{场景名称}`：

```bash
cp -r test-basic test-{场景名称}
```

### 3. 修改测试内容

根据测试需求修改 `.kecare/` 下的文件：

### 4. 修改运行脚本

编辑 `run.ts`，将路径指向新的测试目录：

```typescript
import { $ } from "bun";

await $`bun run ../generator/index.ts gen ./test-{场景名称}`;
```

### 5. 运行测试

```bash
bun run run.ts
```

## 现有测试用例

### test-basic（基础模板）

**测试需求**：标准文章处理流程

**预期结果**：
- 正确解析 Front Matter
- 生成多语言翻译文件
- 生成文章详情页

**文章内容**：
```markdown
---
date: 2026-03-02
menu: test
translate: ['zh-CN', 'en-US', 'ja-JP']
---

# 基础测试

这是一个基础测试，用于测试 Kecare 项目的的基本功能。
```

### test-no-title（无标题测试）

**测试需求**：测试文章缺少 `title` 和 `menu` 字段时的处理

**预期结果**：

- 生成器应能处理缺失字段的情况
- 可能使用文件名或默认值作为标题

**文章内容**：

```markdown
---
date: 2026-03-02
translate: ['zh-CN', 'en-US', 'ja-JP']
---

# 基础测试
...
```

## 测试检查清单

运行测试后，检查以下内容：

- [ ] 生成器是否正常完成（无崩溃）
- [ ] `.tmp/` 目录下的翻译文件是否正确生成
- [ ] 文章 hash 是否正确计算
- [ ] 错误信息是否清晰（如有错误）
- [ ] 边界情况是否被正确处理

## 注意事项

1. **文件命名**：测试目录名使用 `test-{场景名称}` 格式，便于识别
2. **隔离测试**：每个测试目录独立，互不影响
3. **清理临时文件**：测试完成后可删除 `.tmp/` 目录
4. **配置文件**：如需特殊配置，在测试目录下创建 `kecare.config.ts`
