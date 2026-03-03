import { join } from "node:path";
import { homedir } from "node:os";
import { exists, readFile } from "node:fs/promises";
import consola from "consola";

const CONFIG_DIR = join(homedir(), '.kecare');
const CONFIG_FILE = join(CONFIG_DIR, 'config.json');


export type Config = {
    themePath?: string
}

export async function getThemePath(): Promise<string | null> {
    try {
        const content = await readFile(CONFIG_FILE, 'utf-8');
        const config: Config = JSON.parse(content);

        if (config.themePath) {
            return config.themePath;
        }

        return null;
    } catch (error) {
        consola.debug('无法加载配置文件.');
        return null;
    }
}
