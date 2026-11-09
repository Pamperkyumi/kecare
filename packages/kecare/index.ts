// 根入口：仅导出环境无关的公共类型与工具函数（Node 侧 generator 与主题模板都从这里导入）。
// 浏览器端运行时 SDK 在独立子路径 "kecare/sdk" 导出——禁止在这里 re-export：
// 否则 Node 侧消费者（generator 的 tsconfig 无 DOM lib）会把 SDK 源码拉进类型检查，产生大量 window/document 报错。
export * from "./types.ts";
export * from "./utils/is-valid-date-string.ts";
