import { join } from 'node:path';
import type { ArticleVariant, KecareContext, } from "kecare";

export const type = 'article-detail';

export async function generator(context: KecareContext, article: ArticleVariant) {
    let navItems;
    let fsPath;
    let urlPath;
    if (article.menu) {
        const navItemsModule = await import(join(context.projectPath, '.kecare', 'menus', article.menu + '.menu.generated.ts'));
        navItems = navItemsModule.navItems;
    }
    if (article.frontMatter.type === 'guide') {
        urlPath = ['guide', `${article.lang}`, `${article.hash}`].join('/');
    } else if (article.frontMatter.type === 'blog') {
        urlPath = ['blog', `${article.lang}`, `${article.hash}`].join('/');
    } else {
        urlPath = ['articles', `${article.lang}`, `${article.hash}`].join('/');
    }

    if (article.frontMatter.type === 'guide') {
        fsPath = join(context.projectPath, 'app', 'pages', 'guide', `${article.lang}`, `${article.hash}.vue`);
    } else if (article.frontMatter.type === 'blog') {
        fsPath = join(context.projectPath, 'app', 'pages', 'blog', `${article.lang}`, `${article.hash}.vue`);
    } else {
        fsPath = join(context.projectPath, 'app', 'pages', 'articles', `${article.lang}`, `${article.hash}.vue`);
    }
    return {
        urlPath, // 文章详情页面的 URL
        fsPath, // 文件生成的路径
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