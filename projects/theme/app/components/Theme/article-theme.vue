<script lang="ts" setup>
import { useKecareSDK, } from 'kecare';
import TocCard from '~/components/Theme/Sidebar/Toc-card.vue';
import SidebarNavtree from '~/components/Theme/Sidebar/Sidebar-navtree.vue';
import Navbar from '~/components/Theme/Sidebar/Navbar.vue';
import Footer from '~/components/Theme/Sidebar/Footer.vue';
import bgImage from '~/assets/bg2.webp'
import type { ArticleVariant, NavItem } from "kecare";

const kecareSDK = await useKecareSDK(); // 这样就加载了你的 js 代码
onMounted(async () => {
    await nextTick();
    await kecareSDK!.mounted(props.article.title);
});

const props = defineProps<{
    article: ArticleVariant;
    navItems: NavItem[];
}>()

const res = estimateReadingTimeFromHtml(props.article.html, { wordsPerMinute: 220, round: 'ceil' });


// Reading Time
type ReadingOptions = {
    wordsPerMinute?: number;
    round?: 'ceil' | 'floor' | 'round';
    imageSeconds?: number;
    codeWordsMultiplier?: number;
    minMinutes?: number;
};

type ReadingResult = {
    words: number;
    timeSeconds: number;
    minutesFloat: number;
    minutes: number;
    wordsPerMinute: number;
    images: number;
};

const READING_DEFAULTS: Required<ReadingOptions> = {
    wordsPerMinute: 200,
    round: 'round',
    imageSeconds: 12,
    codeWordsMultiplier: 0.6,
    minMinutes: 0,
};

function stripHtmlKeepImg(html: string): { text: string; images: number } {
    if (!html) return { text: '', images: 0 };
    const imgMatches = html.match(/<img\b[^>]*>/gi);
    const images = imgMatches ? imgMatches.length : 0;
    const text = html.replace(/<\/?[^>]+(>|$)/g, ' ').replace(/\s+/g, ' ').trim();
    return { text, images }; estimateReadingTimeFromHtml
}

function countWords(text: string): number {
    if (!text) return 0;
    const matches = text.match(/([\p{L}\p{N}]+|[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]+)/gu);
    return matches ? matches.length : 0;
}

function estimateReadingTimeFromHtml(
    htmlOrText: string,
    opts?: ReadingOptions
): ReadingResult {
    const o = {
        wordsPerMinute: 200,
        round: 'round',
        imageSeconds: 12,
        codeWordsMultiplier: 0.6,
        minMinutes: 0, ...opts
    };
    const { text, images } = stripHtmlKeepImg(htmlOrText);

    const codeRegex = /```[\s\S]*?```|<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>/gi;
    let codeWords = 0;
    let remainingText = text;
    const codeMatches = htmlOrText.match(codeRegex);

    if (codeMatches) {
        for (const cm of codeMatches) {
            const codeOnly = cm.replace(/<\/?[^>]+(>|$)/g, ' ').replace(/[`]/g, ' ');
            codeWords += countWords(codeOnly);
        }
        const htmlWithoutCode = htmlOrText.replace(codeRegex, ' ');
        const stripped = stripHtmlKeepImg(htmlWithoutCode);
        remainingText = stripped.text;
    }

    const normalWords = countWords(remainingText);
    const effectiveWords = Math.round(normalWords + codeWords * o.codeWordsMultiplier);
    const wordsPerSecond = o.wordsPerMinute / 60;
    const secondsForWords = effectiveWords / wordsPerSecond;
    const secondsForImages = images * o.imageSeconds;
    const totalSeconds = Math.max(0, Math.round(secondsForWords + secondsForImages));

    const minutesFloat = totalSeconds / 60;
    let minutes: number;
    if (o.round === 'ceil') minutes = Math.ceil(minutesFloat);
    else if (o.round === 'floor') minutes = Math.floor(minutesFloat);
    else minutes = Math.round(minutesFloat);

    if (minutes < o.minMinutes) minutes = Math.max(0, Math.floor(o.minMinutes));

    return {
        words: effectiveWords,
        timeSeconds: totalSeconds,
        minutesFloat,
        minutes,
        wordsPerMinute: o.wordsPerMinute,
        images,
    };
}

function formatReadingTimeChinese(res: ReadingResult): string {
    if (res.minutes <= 0) return '少于 1 分钟';
    if (res.minutes === 1) return '1 分钟';
    return `约 ${res.minutes} 分钟`;
}

const readingInfo = computed(() => {
    const result = estimateReadingTimeFromHtml(props.article.html, {
        wordsPerMinute: 220,
        round: 'ceil'
    })
    return result
})

const readingTimeLabel = computed(() => {
    return formatReadingTimeChinese(readingInfo.value)
})

const wordCount = computed(() => {
    return readingInfo.value.words
})


</script>

<template>
    <div class="flex flex-col">
        <Navbar />
    </div>

    <div class="post-bg fixed inset-0 -z-[999] bg-no-repeat bg-center bg-cover"
        :style="{ 'background-image': `url(${bgImage})` }"></div>

    <div
        class="layout max-w-[1600px] mx-auto pt-[100px] px-[16px] flex flex-wrap items-start gap-[30px] max-[960px]:flex-col max-[960px]:flex-nowrap max-[960px]:gap-[20px]">
        <!-- 文章信息 -->
        <div class="hero w-full flex items-center justify-center min-h-[30vh] max-[960px]:min-h-[38vh]">
            <div class="post-info text-center">
                <h1
                    class="post-title text-[2.4rem] max-[768px]:text-[1.9rem] font-bold text-[#2c3e50] dark:text-gray-100 leading-tight">
                    {{
                        props.article.title }}</h1>
                <div
                    class="first-line mt-[10px] flex flex-wrap items-center justify-center gap-[8px] text-[0.95rem] text-[#666] dark:text-gray-400">
                    <span class="post-created">发布于: {{ props.article.frontMatter.date }}</span>
                    <span class="post-sparator text-[#ff9eb0]">|</span>
                    <span class="word-count">总字数:{{ wordCount }}</span>
                    <span class="post-sparator text-[#ff9eb0]">|</span>
                    <span class="reading-time">阅读时长: {{ readingTimeLabel }}</span>
                </div>
                <span class="post-languages inline-flex items-center gap-[20px] text-[20px] leading-none mt-[12px]">
                    <NuxtLink
                        class="text-[#ff6b93] font-bold no-underline px-[8px] py-[4px] rounded-[8px] hover:underline"
                        :to="`/articles/en-US/${props.article.hash}`">English</NuxtLink>
                    <span class="post-sparator text-[#ff9eb0]">|</span>
                    <NuxtLink
                        class="text-[#ff6b93] font-bold no-underline px-[8px] py-[4px] rounded-[8px] hover:underline"
                        :to="`/articles/zh-CN/${props.article.hash}`">简体中文</NuxtLink>
                    <span class="post-sparator text-[#ff9eb0]">|</span>
                    <NuxtLink
                        class="text-[#ff6b93] font-bold no-underline px-[8px] py-[4px] rounded-[8px] hover:underline"
                        :to="`/articles/ja-JP/${props.article.hash}`">日本語</NuxtLink>
                </span>
            </div>
        </div>
        <aside
            class="sidebar flex-none w-[240px] max-w-[240px] sticky top-[85px] h-fit bg-white/70 dark:bg-gray-800/70 backdrop-blur-[10px] backdrop-saturate-150 border border-[rgba(169,169,169,0.2)] dark:border-gray-700 rounded-[16px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] py-[18px] px-[16px] max-[960px]:hidden"
            v-if="props.navItems !== null">
            <NuxtLink
                class="sidebar-title inline-block text-[1.1rem] font-extrabold text-[#ff6b93] no-underline mb-[12px] px-[10px] py-[6px] rounded-[10px] bg-[rgba(255,107,147,0.10)] border border-[rgba(255,107,147,0.18)]"
                to="/">我是小菜单喵 </NuxtLink>
            <div class="sidebar-list max-h-[calc(100vh-140px)] overflow-auto pr-[6px]">
                <template v-if="props.navItems?.length">
                    <sidebar-navtree :items="props.navItems" />
                </template>
                <div v-else class="sidebar-empty text-[#7a7a7a] dark:text-gray-400 text-[0.95rem] px-[6px] py-[10px]">
                    暂无目录喵~
                </div>
            </div>
        </aside>

        <div class="main-container flex flex-1 min-w-0 w-full gap-[30px] flex-col md:flex-row">
            <div class="article flex-1 p-0">
                <div
                    class="post bg-white/70 dark:bg-gray-800/70 backdrop-blur-[10px] backdrop-saturate-150 border border-[rgba(169,169,169,0.2)] dark:border-gray-700 rounded-[16px] p-[40px] max-[768px]:p-[25px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] mb-[30px]">
                    <div class="article-content leading-[1.8] [overflow-wrap:anywhere] break-words [&_h1]:mt-[1.5em] [&_h1]:mb-[0.5em] [&_h1]:text-[#2c3e50] dark:[&_h1]:text-gray-100 [&_h2]:mt-[1.5em] [&_h2]:mb-[0.5em] [&_h2]:text-[#2c3e50] dark:[&_h2]:text-gray-100 [&_h3]:mt-[1.5em] [&_h3]:mb-[0.5em] [&_h3]:text-[#2c3e50] dark:[&_h3]:text-gray-100"
                        ref="articleRef" v-html="props.article.html"></div>

                    <div
                        class="post-copyright relative mt-[40px] mb-[10px] p-[20px] border border-[#eee] dark:border-gray-600 rounded-[12px] bg-white/80 dark:bg-gray-700/80 shadow-[0_4px_12px_rgba(0,0,0,0.05)] before:content-[''] before:absolute before:top-0 before:left-0 before:w-[4px] before:h-full before:bg-[#ff9eb0] before:rounded-l-[4px]">
                        <div class="post-copyright-author">
                            <span class="post-copyright-meta text-[#ff6b93] font-bold mr-[8px]">文章作者:</span>
                            <span class="post-copyright-info">{{ props.article.author }}</span>
                        </div>
                        <div class="post-copyright-type">
                            <span class="post-copyright-meta text-[#ff6b93] font-bold mr-[8px]">文章链接:</span>
                            <span class="post-copyright-info"><a class="text-[#3498db] no-underline hover:underline"
                                    :href="`https://www.kecare.me/articles/${props.article.hash} `" targe="_blank"
                                    rel="noopener noreferrer">kecare.me/articles/{{ props.article.hash }}</a></span>
                        </div>
                        <div class="post-copyright-notice">
                            <span class="post-copyright-meta text-[#ff6b93] font-bold mr-[8px]">版权声明:</span>
                            <span class="post-copyright-info">
                                博客所有文章除特别声明外，均采用
                                <a class="text-[#3498db] no-underline hover:underline"
                                    href="https://creativecommons.org/licenses/by-nc-sa/4.0/"> CC BY-NC-SA 4.0 </a>
                                许可协议。转载请注明来源
                            </span>
                        </div>
                    </div>

                    <div
                        class="tags-shares flex justify-between items-center my-[30px] w-full max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-[20px]">
                        <div class="post-tag-list flex flex-wrap gap-[10px]">
                            <a class="post-tag bg-[#ff9eb0] text-white px-[12px] py-[6px] rounded-full no-underline text-[0.9rem]"
                                href="#">喵</a>
                            <a class="post-tag bg-[#ff9eb0] text-white px-[12px] py-[6px] rounded-full no-underline text-[0.9rem]"
                                href="#">喵喵</a>
                            <a class="post-tag bg-[#ff9eb0] text-white px-[12px] py-[6px] rounded-full no-underline text-[0.9rem]"
                                href="#">喵喵喵</a>
                            <a class="post-tag bg-[#ff9eb0] text-white px-[12px] py-[6px] rounded-full no-underline text-[0.9rem]"
                                href="#">喵喵喵喵</a>
                        </div>
                    </div>
                    <hr
                        class="post-hr my-[40px] h-[2px] w-full border-0 bg-gradient-to-r from-transparent via-[#ffe1e6] to-transparent" />
                </div>
            </div>
            <aside class="aside flex-none w-[280px] max-w-[280px] sticky top-[65px] h-fit max-[960px]:order-3">
                <TocCard />
            </aside>
        </div>
    </div>
</template>

<style scoped>
@import url(~/assets/article.css);

.sidebar-list::-webkit-scrollbar {
    width: 8px;
}

.sidebar-list::-webkit-scrollbar-thumb {
    background: #ff9eb0;
    border-radius: 4px;
}

.sidebar-list::-webkit-scrollbar-thumb:hover {
    background: #ff6b93;
}

.sidebar-title {
    transition: transform 0.2s ease, background-color 0.2s ease;
}

.sidebar-title:hover {
    transform: translateY(-1px);
    background-color: rgba(255, 107, 147, 0.14);
}

.post-tag {
    transition: all 0.3s ease;
}

.post-tag:hover {
    background-color: #ff6b93;
    transform: translateY(-2px);
}
</style>