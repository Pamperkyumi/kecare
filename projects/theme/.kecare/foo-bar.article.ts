import { join } from 'node:path';
import type { ArticleVariant, KecareContext, } from "kecare";

export const type = 'article-detail';

export async function generator(context: KecareContext, article: ArticleVariant) {
    const navItemsModule = await import(join(context.projectPath, '.kecare', 'menus', 'test.menu.generated.ts'));
    const navItems = navItemsModule.navItems;
    return {
        urlPath: ['articles', `${article.lang}`, `${article.hash}`].join('/'), // 文章详情页面的 URL
        fsPath: join(context.projectPath, 'app', 'pages', 'articles', `${article.lang}`, `${article.hash}.vue`), // 文件生成的路径
        template: `<!-- Generated: ${new Date().toISOString()} -->
        <script setup lang="ts">
        import articleTheme from '~/components/Theme/article-theme.vue'
        import type { NavItem } from 'kecare'
        const article = \`${encodeURIComponent(JSON.stringify(article))}\`
        const navItems:NavItem[] = ${JSON.stringify(navItems)}
        useHead({
            title: ${JSON.stringify(article.title)},
        })
        </script>
        <template>
        <articleTheme :article="JSON.parse(decodeURIComponent(article))"
                       :navItems="navItems" 
                       />
        </template>
`}
}