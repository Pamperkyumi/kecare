import { join } from "path";
import type { KecareContext, ThemeConfig } from "kecare";
import { existsSync } from "fs";

async function createThemeConfig(context: KecareContext) {
    if (!existsSync(join(context.projectPath, '.kecare', 'kecare.config.ts'))) return {} as ThemeConfig;
    const configModule = await import(join(context.projectPath, '.kecare', 'kecare.config.ts'));

    // 校验配置文件
    if (configModule.themeConfig) {
        const themeConfig = await configModule.themeConfig();
        if (!themeConfig.imageUrl || themeConfig.imageUrl.length === 0) {
            throw new Error('themeConfig.imageUrl 不能为空');
        }
        return themeConfig as ThemeConfig;
    }

    return configModule.kecareConfig(context) as ThemeConfig;
}

// 以 context 为键缓存配置：每次 gen 都会创建新的 context，
// 因此同进程多次调用（测试、watch 模式）不会复用上一轮的配置
const instances = new WeakMap<KecareContext, ReturnType<typeof createThemeConfig>>();

export function useThemeConfig(context: KecareContext): ReturnType<typeof createThemeConfig> {
    let instance = instances.get(context);
    if (!instance) {
        instance = createThemeConfig(context);
        instances.set(context, instance);
    }
    return instance;
}
