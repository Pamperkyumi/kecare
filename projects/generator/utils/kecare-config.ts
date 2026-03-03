import { join } from "path";
import type { KecareConfig, KecareContext } from "../types";
import { existsSync } from "fs";

async function createKecareConfig(context: KecareContext) {
    if (!existsSync(join(context.projectPath, '.kecare', 'kecare.config.ts'))) return {} as KecareConfig;
    const configModule = await import(join(context.projectPath, '.kecare', 'kecare.config.ts'));

    // 校验配置文件
    if (configModule.llm) {
        // 如果存在 llm 配置，校验其字段
        if (!configModule.llm.model) throw new Error('llm.model 不能为空');
        if (!configModule.llm.apiKey) throw new Error('llm.apiKey 不能为空');
        if (!configModule.llm.apiBaseUrl) throw new Error('llm.apiBaseUrl 不能为空');
    }

    return configModule.kecareConfig(context) as KecareConfig;
}

let instancePromise: Promise<any> | null = null;

export function useKecareConfig(context: KecareContext): Promise<ReturnType<typeof createKecareConfig>> {
    if (!instancePromise) instancePromise = createKecareConfig(context);
    return instancePromise as Promise<ReturnType<typeof createKecareConfig>>;
}
