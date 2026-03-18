import type { KecareContext, ModuleMenuTS, NavItem } from "kecare";
import { Glob, write } from "bun";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { existsSync, mkdirSync } from "node:fs";

async function createMenuModuleHandler(context: KecareContext) {
    const modulePath = join(context.projectPath, '.kecare', 'menus');
    if (!existsSync(modulePath)) mkdirSync(modulePath);
    const glob = new Glob(`${modulePath}/**/*.{menu.source.ts}`);

    const modules: Array<Promise<ModuleMenuTS>> = [];
    for await (const file of glob.scan(".")) modules.push(await import(file));

    const module = {
        async finish() {
            const sourceGlob = new Glob('**/*.menu.source.ts');

            const sourceFiles: string[] = [];

            for await (const rel of sourceGlob.scan({ cwd: modulePath, onlyFiles: true })) {
                sourceFiles.push(rel);
            }

            for (const rel of sourceFiles) {
                const absSource = resolve(modulePath, rel);
                const absGenerated = absSource.replace(/\.menu\.source\.ts$/, '.menu.generated.ts');

                const sourceMod = await import(pathToFileURL(absSource).href);
                const navItemsUnknown: unknown = sourceMod.navItems ?? sourceMod.default;

                if (!Array.isArray(navItemsUnknown)) {
                    console.warn(`[menu] 无法从 ${absSource} 读取 navItems`);
                    continue;
                }

                const resolvedNavItems = await Promise.all(
                    (navItemsUnknown as NavItem[]).map((item) => hashNavItemLink(item))
                );

                const content = renderGeneratedMenuTs(resolvedNavItems);
                await write(absGenerated, content);
                console.log(`[menu] 已生成 ${absGenerated}`);
            }
        },
    }
    return module;
}

async function hashNavItemsLinks(items: NavItem[]): Promise<NavItem[]> {
    const out: NavItem[] = [];
    for (const item of items) {
        out.push(await hashNavItemLink(item));
    }
    return out;
}

async function hashNavItemLink(item: NavItem): Promise<NavItem> {
    // 分组节点
    if ('items' in item) {
        return {
            ...item,
            items: await hashNavItemsLinks(item.items),
        };
    }

    // 叶子节点
    let text = String(item.link ?? '').trim();
    if (!text) return item;

    if (text.startsWith('.')) text = text.slice(1).trim();

    const hash = await Bun.hash.xxHash3(text, 1234n).toString(16).slice(0, 8);

    return { ...item, link: `./${hash}` };
}


function renderGeneratedMenuTs(navItems: NavItem[]) {
    const body = JSON.stringify(navItems, null, 2);

    return `/* eslint-disable */
/**
 * AUTO-GENERATED FILE
 * DO NOT EDIT MANUALLY
 */

import type { NavItem } from 'kecare';

export const navItems: NavItem[] = ${body} as NavItem[];
`;
}

let instancePromise: Promise<any> | null = null;

export function useMenuModuleHandler(context: KecareContext): Promise<ReturnType<typeof createMenuModuleHandler>> {
    if (!instancePromise) instancePromise = createMenuModuleHandler(context);
    return instancePromise as Promise<ReturnType<typeof createMenuModuleHandler>>;
}
