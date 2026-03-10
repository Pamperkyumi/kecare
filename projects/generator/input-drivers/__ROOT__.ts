import { freemem } from "os";
import type { ArticleVariant, KecareContext } from "kecare";
import { markdownInputDriver } from "./markdown-driver/__ROOT__";
import { emitModuleFinish } from "../module-handler/__ROOT__";

export type InputDriverChunk = (emitArticleHandle: (context: KecareContext, params: ArticleVariant) => Promise<void>) => Promise<void>;

export async function executeInputDrivers(context: KecareContext, emitArticleHandle: (context: KecareContext, params: ArticleVariant) => Promise<void>): Promise<void> {
    const chunks: Array<InputDriverChunk> = [];

    await Promise.all([
        // 调用 markdown 输入驱动
        markdownInputDriver(context, chunks),
    ]);

    // 批量处理 chunk 以避免内存溢出
    const MEMORY_PER_ARTICLE_BYTES = 100 * 1024 * 1024;
    const MAX_AVAILABLE_MEMORY_BYTES = 1400 * 1024 * 1024;
    const freeMemoryBytes = freemem();
    const availableMemoryBytes = Math.min(freeMemoryBytes, MAX_AVAILABLE_MEMORY_BYTES);
    const batchSize = Math.max(1, Math.floor(availableMemoryBytes / MEMORY_PER_ARTICLE_BYTES));
    for (let i = 0; i < chunks.length; i += batchSize) {
        const batch = chunks.slice(i, i + batchSize);
        const promises: Promise<void>[] = [];
        for (const chunk of batch) promises.push(chunk(emitArticleHandle));
        await Promise.all(promises);
        Bun.gc(true);
    }

    // 调用模块完成方法
    await emitModuleFinish(context);
}