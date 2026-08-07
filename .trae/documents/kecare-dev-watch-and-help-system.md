# Kecare 增量开发模式（dev）+ 命令帮助系统

## Context（背景）

Kecare 当前每次改一个字都要 `bun run gen` 全量重跑，体验差；且 `gen/init/clean/version` 命令没有任何帮助输出，无参数运行时静默退出。本次实现两个高优先级功能：

1. **`kecare dev` 监听 + 增量开发模式**：监听 `.kecare/articles` 变化，只重新生成受影响的文章 + 下游聚合页面（list/search/archive），并对接 Nuxt HMR。
2. **`--help` / 命令文档**：为所有命令提供帮助输出。

### 增量策略核心思路

**复用已有缓存基础设施，而非新建增量记账。** 每次变更后创建**新的 `KecareContext`** 重跑 `executeInputDrivers` 全流程：
- markdown-driver 已有 `markdown-manifest.json` 内容哈希缓存：未变文章命中缓存 → 跳过解析/AI 翻译/.vue 写入（仍走内存收集，廉价）；仅变更文章做实活。
- 下游聚合页（list/search/archive）每周期用全量内存数据重算 —— 它们是聚合，必须全量，且只写少量文件，廉价。
- 全部 module-handler 用 `WeakMap<KecareContext, instance>` 模式（[article.ts:48](file:///c:/Users/Pamper/Desktop/workspace/Kecare/projects/generator/module-handler/article.ts#L48)、[list.ts:59](file:///c:/Users/Pamper/Desktop/workspace/Kecare/projects/generator/module-handler/list.ts#L59) 等），新 context = 新实例，无状态泄漏。
- Nuxt dev 自动监听 `app/pages/` 和 `public/`，kecare 写文件即触发 HMR，**无需特殊桥接**。

### 已确认的用户决策
- 进程模型：**两者都支持**。默认仅 kecare 监听器；`--with-nuxt` 合并启动 `nuxt dev` 子进程。
- 监听范围：**仅 `.kecare/articles`**。模板/菜单/配置变更提示手动重跑 gen 或重启 dev（Bun 模块缓存导致同进程内重跑也用旧模板）。

---

## 阶段 0：前置修复（独立于 dev，net positive）

### 0.1 修复 `marked.use` 累积
- 文件：[markdown-driver/__ROOT__.ts](file:///c:/Users/Pamper/Desktop/workspace/Kecare/projects/generator/input-drivers/markdown-driver/__ROOT__.ts#L47-L51)
- 问题：每次调用 `marked.use(...)` 会追加 extension，dev 多周期累积。
- 改动：加模块级 `let markedInitialized = false` 守卫包住 line 48-51 的 `marked.use`；`resetTabsTokenUid()` 仍在守卫外（每周期重置 uid）。

### 0.2 修复 `hidden: true` 产生孤儿 .vue
- 文件：[markdown-driver/__ROOT__.ts](file:///c:/Users/Pamper/Desktop/workspace/Kecare/projects/generator/input-drivers/markdown-driver/__ROOT__.ts#L153-L157)
- 改动：在 `delete manifest.articles[relativePath]` 前，若 `cached` 存在且 variants 有 `__REAL_FS_PATHS__`，循环 `rm` 这些文件。

### 0.3（可选）修复 articleStats tag 计数 bug
- 文件：[articleStats.ts:49](file:///c:/Users/Pamper/Desktop/workspace/Kecare/projects/generator/module-handler/articleStats.ts#L49)
- 改动：`perLang[article.lang]!.tags[tag]!++;`（加 `++`）。dev 模式下若 list 模板用到 tag 统计，不修会持续显示错误数据。

---

## 阶段 1：抽取共享 gen 逻辑

### 1.1 新建 `projects/generator/commands/run-generation.ts`
导出 `runGeneration(projectPath: string): Promise<KecareContext>`：
1. 校验 `.kecare` 和 `.kecare/articles` 存在
2. 创建 `KecareContext = { projectPath }`
3. `await executeInputDrivers(context, emitArticleHandle)`（复用 [input-drivers/__ROOT__.ts](file:///c:/Users/Pamper/Desktop/workspace/Kecare/projects/generator/input-drivers/__ROOT__.ts) 和 [module-handler/__ROOT__.ts](file:///c:/Users/Pamper/Desktop/workspace/Kecare/projects/generator/module-handler/__ROOT__.ts) 的现有导出）
4. return context

### 1.2 重构 `execute-index-command.ts`
- 保留参数解析与 `consola.info('Project path', ...)` 日志
- 把 line 18-36 的校验+executeInputDrivers 替换为 `await runGeneration(projectPath)`
- 顺手去掉 `await existsSync(...)` 的多余 `await`

---

## 阶段 2：实现 `kecare dev` 命令

### 2.1 新建 `projects/generator/commands/execute-dev-command.ts`

主体结构（过程式）：
1. 解析 `projectPath = resolve(params.commands[0] ?? '.')`，解析 `--with-nuxt` flag
2. 校验 `.kecare/articles` 存在
3. **跑初始 gen**：`await runGeneration(projectPath)`（确保 dev 启动时产物已存在）
4. 若 `--with-nuxt`：`Bun.spawn(['bun','run','dev'], { cwd: projectPath, stdio: ['inherit','inherit','inherit'] })`，保存 `childProc`；注册 `SIGINT`/`SIGTERM`/`exit` 处理（先 `childProc.kill()`，Windows 上 `kill()` 用 TerminateProcess 可接受，给 200ms 清理后 exit）
5. **设置 watcher**：`articlesDir = join(projectPath, '.kecare', 'articles')`；用 `node:fs` 的 `watch(articlesDir, { recursive: true }, onWatchEvent)`（Windows 原生支持，Bun 兼容；不引入 chokidar）
6. **debounce + 队列**：400ms 定时器 + `running` flag + `dirty` flag
   - `onWatchEvent`：归一化路径（`join(watchDir, filename ?? '')` → `resolve()`），过滤非 `.md/.mdx/.markdown` 与临时文件（`~`、`.swp`、`.DS_Store`），重置 400ms 定时器
   - 定时器触发 → `runDevCycle()`
   - `runDevCycle`：若 `running` 置 `dirty` 返回；否则 `running=true` → `try { await pruneOrphans(projectPath); await runGeneration(projectPath); consola.success('增量重生成完成') } catch(e) { consola.error(e) } finally { running=false; if(dirty){dirty=false; runDevCycle()} }`
7. `consola.info('Kecare dev 监听中... Ctrl+C 退出')`

### 2.2 prune 孤儿文件逻辑（dev 专属，放同文件内函数）
解决文章删除/重命名产生的孤儿 .vue：
1. 读 `markdown-manifest.json`（复用 markdown-driver 的 `loadMarkdownCache`，需导出该函数）
2. glob 当前 `.kecare/articles/**/*.{md,mdx,markdown}`，计算 relativePath 集合（与 markdown-driver line 78 同样算法：`fsPath.replace(articlePath, '')`）
3. 遍历 `manifest.articles` 的 key，不在当前集合的：删除该 entry 所有 variant 的 `__REAL_FS_PATHS__` 文件，`delete manifest.articles[key]`
4. 有变更则写回 manifest

### 2.3 修改 `__ROOT__.ts` 路由
- 加 `import { executeDevCommand } from './execute-dev-command.ts'`
- `__executeCommands` 中加 `dev` 分支（改为 `else if` 链）

### 2.4 导出 markdown-driver 的复用项
- 文件：[markdown-driver/__ROOT__.ts](file:///c:/Users/Pamper/Desktop/workspace/Kecare/projects/generator/input-drivers/markdown-driver/__ROOT__.ts)
- 导出 `loadMarkdownCache` 函数供 dev-prune 复用，避免重复实现 manifest 读取

---

## 阶段 3：实现 `--help` 系统

### 3.1 新建 `projects/generator/commands/help.ts`
```ts
type CommandMeta = {
  name: string;
  summary: string;
  usage: string;
  options: Array<{ flag: string; type: 'flag' | 'value'; description: string }>;
  examples: Array<{ command: string; description: string }>;
};
const commandsMeta: Record<string, CommandMeta> = { gen, dev, init, clean, version, help };
export function printHelp(commandName?: string): void { /* 无参=全局，有参=命令详情 */ }
```
- 六条命令元数据：gen、dev（含 `--with-nuxt`）、init、clean、version、help
- usage 行用实际调用形式：`bun run ./projects/generator/index.ts <command>`（当前无 bin 配置）
- 用 `console.log` 输出

### 3.2 修改 `__ROOT__.ts`
- 加 `import { printHelp } from './help.ts'`
- 在命令推断后、`__executeCommands` 调用前：若 `params.options['help'] || params.options['h']` → `printHelp(params.command === 'index' ? undefined : params.command)` + `process.exit(0)`
- `__executeCommands` 改 `else if` 链，新增 `dev`、`help` 分支，无匹配时 `printHelp() + process.exit(1)`（替换当前静默 `process.exit(0)`），`index`（无参数）时 `printHelp() + exit 0`

---

## 阶段 4：边界场景处理

| 场景 | 行为 |
|---|---|
| 新增/修改 .md | 正常缓存未命中 → 全流程生成 |
| 删除/重命名 .md | prune 预处理删孤儿 .vue + 清理 manifest entry |
| `hidden: true` 切换 | 阶段 0.2 已修，gen/dev 都正确删 .vue |
| 模板/菜单/配置变更 | 不在 watch 范围，help 文档说明需手动重跑 gen 或重启 dev（Bun 模块缓存）|
| 周期崩溃 | try/catch 包裹，log 错误，保持 watching |
| 周期运行中再次变更 | running+dirty flag，周期结束后再跑一次 |

---

## 关键文件清单

**新建：**
- [commands/run-generation.ts](file:///c:/Users/Pamper/Desktop/workspace/Kecare/projects/generator/commands/run-generation.ts)
- [commands/execute-dev-command.ts](file:///c:/Users/Pamper/Desktop/workspace/Kecare/projects/generator/commands/execute-dev-command.ts)
- [commands/help.ts](file:///c:/Users/Pamper/Desktop/workspace/Kecare/projects/generator/commands/help.ts)

**修改：**
- [commands/__ROOT__.ts](file:///c:/Users/Pamper/Desktop/workspace/Kecare/projects/generator/commands/__ROOT__.ts)（路由 + help 检测 + dev 分支）
- [commands/execute-index-command.ts](file:///c:/Users/Pamper/Desktop/workspace/Kecare/projects/generator/commands/execute-index-command.ts)（改调 runGeneration）
- [input-drivers/markdown-driver/__ROOT__.ts](file:///c:/Users/Pamper/Desktop/workspace/Kecare/projects/generator/input-drivers/markdown-driver/__ROOT__.ts)（marked 守卫 + hidden 清理 + 导出 loadMarkdownCache）
- [module-handler/articleStats.ts](file:///c:/Users/Pamper/Desktop/workspace/Kecare/projects/generator/module-handler/articleStats.ts)（可选，line 49 加 `++`）

---

## 验证（端到端）

1. **帮助系统**：
   - `bun run ./projects/generator/index.ts` → 打印全局 help
   - `bun run ./projects/generator/index.ts gen --help` → 打印 gen 帮助
   - `bun run ./projects/generator/index.ts help dev` → 打印 dev 帮助
   - `bun run ./projects/generator/index.ts foobar` → 打印全局 help + exit 1
2. **dev 基础**：
   - `bun run ./projects/generator/index.ts dev ./projects/theme` → 初始 gen 一次，提示监听中
   - 修改一篇 .md → 400ms 后看到增量重生成日志
   - 删除一篇 .md → 下周期 prune 删除孤儿 .vue
   - `Ctrl+C` → 干净退出
3. **--with-nuxt**：
   - `bun run ./projects/generator/index.ts dev ./projects/theme --with-nuxt` → 同时启动 nuxt dev
   - 浏览器打开 Nuxt 页面，改 .md 后 HMR 自动刷新
   - `Ctrl+C` → kecare + nuxt 都退出
4. **回归**：
   - `bun run ./projects/generator/index.ts gen ./projects/theme` 仍正常
   - `bun run ./projects/test/run.ts` 仍通过（gen ./test-menu-normal）
   - `bun run test`（根目录）通过现有 e2e 测试

> 注：dev 命令在 Windows 上跑；`fs.watch` recursive 与 `Bun.spawn` 信号行为已在设计中考虑 Windows 限制。
