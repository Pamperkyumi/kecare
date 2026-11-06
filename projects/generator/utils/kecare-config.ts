import { join } from "path";
import type { KecareConfig, KecareContext } from "kecare";
import { existsSync } from "fs";

async function createKecareConfig(context: KecareContext) {
    if (!existsSync(join(context.projectPath, '.kecare', 'kecare.config.ts'))) return {} as KecareConfig;
    const configModule = await import(join(context.projectPath, '.kecare', 'kecare.config.ts'));
    const config = (await configModule.kecareConfig(context)) as KecareConfig;

    // llm 实际来自 kecareConfig() 的返回值，需在结果上校验
    if (config.llm) {
        // 如果存在 llm 配置，校验其字段
        if (!config.llm.model) throw new Error('llm.model 不能为空');
        if (!config.llm.apiKey) throw new Error('llm.apiKey 不能为空，请通过 API_KEY 环境变量配置');
        if (!config.llm.apiBaseUrl) throw new Error('llm.apiBaseUrl 不能为空');
    }

    return config;
}

// 以 context 为键缓存配置：每次 gen 都会创建新的 context，
// 因此同进程多次调用（测试、watch 模式）不会复用上一轮的配置
const instances = new WeakMap<KecareContext, ReturnType<typeof createKecareConfig>>();

export function useKecareConfig(context: KecareContext): ReturnType<typeof createKecareConfig> {
    let instance = instances.get(context);
    if (!instance) {
        instance = createKecareConfig(context);
        instances.set(context, instance);
    }
    return instance;
}
