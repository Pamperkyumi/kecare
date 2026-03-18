import { join } from "path";
import type { KecareContext, ThemeConfig } from "kecare";
import { existsSync } from "fs";

async function createThemeConfig(context: KecareContext) {
    if (!existsSync(join(context.projectPath, '.kecare', 'kecare.config.ts'))) return {} as ThemeConfig;
    const configModule = await import(join(context.projectPath, '.kecare', 'kecare.config.ts'));

    // 校验配置文件
    if (configModule.ThemeConfig) {
        const themeConfig = await configModule.ThemeConfig();
        if (!themeConfig.ImageUrl || themeConfig.ImageUrl.length === 0) {
            throw new Error('ThemeConfig.ImageUrl 不能为空');
        }
        return themeConfig as ThemeConfig;
    }

    return configModule.kecareConfig(context) as ThemeConfig;
}

let instancePromise: Promise<any> | null = null;

export function useThemeConfig(context: KecareContext): Promise<ReturnType<typeof createThemeConfig>> {
    if (!instancePromise) instancePromise = createThemeConfig(context);
    return instancePromise as Promise<ReturnType<typeof createThemeConfig>>;
}
