---
date: 2026-08-03
sticky: 5
translate: ['zh-CN']
author: Pamper
---

# Kecare的热更新以及Vite的HMR原理

## 一、概述

传统流程下，每改一个字都要 `kecare gen` 全量重跑：扫描所有文章 → 解析 Markdown → AI 翻译 → 写所有页面。这在文章多、需要翻译时非常慢。

如果你使用过Vite开发项目，那你应该在开发中使用过Vite的热模块替换即HMR。

**HMR（Hot Module Replacement）** 是 Vite 提供的一项核心功能，用于在开发过程中实现模块的实时更新，而无需刷新整个页面。它通过动态替换运行时的模块代码，极大地提升了开发效率和体验。这是现代前端开发工具的常见特性。

目前主流的前端构建工具（如Vite、Webpack、Parcel、Turbopack等）都内置或通过插件支持HMR，但在本文中，我们将更侧重探讨它在 Vite 中的工作原理。

Vite 通过特殊的 `import.meta.hot` 对象暴露手动 HMR API。

````ts
interface ImportMeta {
  // hot 仅在 Vite dev server 模式下存在，production build 时为 undefined
  readonly hot?: ViteHotContext
}

interface ViteHotContext {
  // data: 持久化存储，HMR 更新时不会被清除。
  // 典型用途：在 dispose 中把状态存到 data，在 accept 回调中从 data 恢复。
  readonly data: any

  // ── accept：声明当前模块接受热更新（自我接受） ──
  // 如果一个模块不调用 accept，Vite 会沿依赖图向上找，找不到就 full-reload。

  // 无参：告诉 Vite "这个模块自己处理更新，不需要回调"
  accept(): void

  // 单回调：模块更新后，Vite 把新模块的导出传进来，让你替换/刷新
  accept(cb: (mod: ModuleNamespace | undefined) => void): void

  // 接受指定依赖的更新：dep 路径变化时才触发 cb，其他依赖变化忽略
  accept(dep: string, cb: (mod: ModuleNamespace | undefined) => void): void

  // 接受多个指定依赖的更新
  accept(
    deps: readonly string[],
    cb: (mods: Array<ModuleNamespace | undefined>) => void,
  ): void

  // ── dispose：模块即将被替换时调用（旧模块销毁前的清理） ──
  // cb 参数 data 就是 this.data，可以在此保存状态
  dispose(cb: (data: any) => void): void

  // ── prune：模块不再被任何模块 import 时调用（依赖图剪枝） ──
  // 比 dispose 更强：dispose 是"要被替换了"，prune 是"彻底没用了"
  prune(cb: (data: any) => void): void

  // ── invalidate：主动声明本模块失效，触发链式 HMR 更新 ──
  // message 会出现在 Vite overlay 错误提示中
  invalidate(message?: string): void

  // ── on / off：监听/取消监听自定义 HMR 事件 ──
  // 服务端通过 server.ws.send('my-event', data) 发送，
  // 客户端通过 hot.on('my-event', cb) 接收。
  // 这是自定义跨模块通信通道（不限于文件更新）。
  on<T extends CustomEventName>(
    event: T,
    cb: (payload: InferCustomEventPayload<T>) => void,
  ): void
  off<T extends CustomEventName>(
    event: T,
    cb: (payload: InferCustomEventPayload<T>) => void,
  ): void

  // ── send：从客户端向 Vite dev server 发送自定义事件 ──
  // 服务端通过 server.ws.on('my-event', (data, client) => {}) 接收
  send<T extends CustomEventName>(
    event: T,
    data?: InferCustomEventPayload<T>,
  ): void
}
````

````
                      Vite Dev Server
┌──────────────┐     ┌──────────────────────────────────┐     ┌──────────┐
│  chokidar    │     │  handleHotUpdate(ctx)             │     │ Browser  │
│  (文件监听)   │────→│  ├─ 分析依赖图                    │     │          │
│              │     │  ├─ 确定受影响的模块链              │     │          │
│  .vue 变化   │     │  ├─ 构造 HMR update payload       │     │          │
└──────────────┘     │  │   {                            │     │          │
                     │  │     type: 'update',            │     │          │
                     │  │     updates: [{                │     │          │
                     │  │       type: 'js-update',       │     │          │
                     │  │       path: '/src/xxx.vue',    │     │          │
                     │  │       acceptedPath: '...',     │     │          │
                     │  │       timestamp: 123456        │     │          │
                     │  │     }]                         │     │          │
                     │  │   }                            │     │          │
                     │  └─ server.ws.send(payload)  ─────│──→  │ 接收 WS 消息
                     │                                    │     │
                     │   ←─── hot.send('custom', data) ───│──── │ 客户端发送
                     │                                    │     │
                     └──────────────────────────────────┘     │
                                                              │  HMR Runtime
                                                              │  ├─ 匹配受影响的模块
                                                              │  ├─ 调用旧模块 dispose()
                                                              │  ├─ 加载新模块（import()）
                                                              │  ├─ 调用新模块 accept(cb)
                                                              │  ├─ 组件热替换
                                                              │  └─ 或 full-reload
                                                              └──────────┘
````

### chokida文件监听

Chokidar 是 Node.js 生态里最常用的文件监听库，Vite 在开发模式下正是用它来检测文件变动，从而触发 HMR。它之所以可靠，是因为**它封装了操作系统的底层文件事件 API，并修复了 Node.js 原生 `fs.watch` 的诸多缺陷**。

Chokidar 会针对不同操作系统，自动选择最高效的底层机制，而不是用“不断轮询”这种低效方式。

| 操作系统    | 底层机制              | 原理简介                                 |
| ----------- | --------------------- | ---------------------------------------- |
| **macOS**   | FSEvents              |                                          |
| **Linux**   | inotify               |                                          |
| **Windows** | ReadDirectoryChangesW | 这也是`fs.watch` 在 Windows 上的底层实现 |

为什么使用chokida，而不直接用Node.js的`fs.watch`

- `fs.watch` 在很多系统上对文件删除只报告为 `rename`。Chokidar 会结合 `fs.stat` 检查文件是否还存在，来精确区分 `unlink`（删除）和真正的重命名
- 你只保存了一个文件，但编辑器可能执行了“写入临时文件 -> 删除原文件 -> 重命名”这一系列操作。这会触发多次原生事件。Chokidar 会在一个“防抖”窗口内将这些事件合并，最终只向 Vite 报告**一次有效的 `change` 事件**。
- 很多编辑器（如 Vim、WebStorm）保存文件时是原子写入：先写一个新文件，再把它重命名为原文件名。这可能导致原生事件报告为 `rename`，而 Chokidar 能识别出来，并仍然触发 `change` 事件。
- 在某些极端环境下（如网络文件系统、Docker 挂载卷），系统级 API 可能完全不工作。Chokidar 支持启用 `usePolling: true`，退化为每隔一段时间用 `fs.stat` 比对文件修改时间，虽然耗性能，但保证了在所有场景下都能用。

懒得写了喵，我太懒了喵，果咩那塞
