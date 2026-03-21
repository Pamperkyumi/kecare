<script lang="ts" setup>
import { computed, onMounted, nextTick } from "vue"
import SakanaWidget from 'sakana-widget';
import 'sakana-widget/lib/index.css';
import Navbar from '~/components/Theme/Sidebar/Navbar.vue'
import AuthorCard from '~/components/Theme/Sidebar/author-card.vue'
import heroBg from '~/assets/bg1.jpg'
import type { ArchiveArticleData } from "kecare";
import Footer from '~/components/Theme/Sidebar/Footer.vue'

type YearGroup = {
    year: number;
    articles: ArchiveArticleData[];
};

const props = defineProps<{
    articles: ArchiveArticleData[];
    currentPage?: number;
    totalPages?: number;
    totalArticles?: number;
}>();

// 按年份分组文章
const yearGroups = computed<YearGroup[]>(() => {
    const groups: Map<number, ArchiveArticleData[]> = new Map();

    for (const article of props.articles ?? []) {
        const year = new Date(article.date).getFullYear();
        if (!groups.has(year)) {
            groups.set(year, []);
        }
        groups.get(year)!.push(article);
    }

    // 将 Map 转换为数组并按年份降序排列
    const result: YearGroup[] = [];
    const sortedYears = Array.from(groups.keys()).sort((a, b) => b - a);
    for (const year of sortedYears) {
        const articles = groups.get(year) ?? [];
        // 每篇文章按日期降序排列
        articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        result.push({ year, articles });
    }

    return result;
});

// 收集所有标签
const allTags = computed<string[]>(() => {
    const tagSet = new Set<string>();
    for (const article of props.articles ?? []) {
        for (const tag of article.tags ?? []) {
            tagSet.add(tag);
        }
    }
    return Array.from(tagSet);
});

// // kecream~
// function initSakanaWidget() {
//     const kecream = SakanaWidget.getCharacter('chisato');
//     if (kecream) {
//         kecream.image = `https://pichost.cloud/files/a585d06168c8553f42b086a6fec51075273913c2092c65b59858e47352b4fc79.avif`;
//         SakanaWidget.registerCharacter('kecream', kecream);
//     }
//     new SakanaWidget({ character: 'kecream' }).mount('#sakana-widget');
// }

onMounted(async () => {
    await nextTick();
    // initSakanaWidget();
});

// 格式化日期为 MM-DD
function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}-${day}`;
}
</script>

<template>
    <div id="app"
        class="min-h-screen flex flex-col font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif] leading-[1.6] text-[#333] dark:text-gray-200 bg-[#f9f9f9] dark:bg-gray-900">
        <!-- Hero 区域，带背景壁纸 -->
        <div
            class="relative h-[40vh] min-h-[300px] overflow-hidden flex flex-col items-center justify-center text-center mt-[60px]">
            <div class="absolute inset-0 bg-center bg-cover"
                :style="{ backgroundImage: `url('http://pichost.cloud/files/d409bed9b5cb6706b27a548332ead440da1bdfa23428561a66d59b753c190ac2.jpg')` }">
            </div>
            <div class="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
            <h1
                class="relative text-white text-[3rem] font-bold tracking-[2px] select-none [text-shadow:2px_2px_10px_rgba(0,0,0,0.5)]">
                文章归档</h1>
        </div>

        <Navbar />

        <div class="max-w-[1200px] mx-auto p-[20px] flex flex-col md:flex-row gap-[30px] w-full">
            <!-- 主内容区域 -->
            <div class="flex-1 flex flex-col gap-[30px]">

                <!-- Tags 区域 -->
                <div
                    class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-[10px] backdrop-saturate-150 border border-[rgba(169,169,169,0.2)] dark:border-gray-700 rounded-[16px] p-[30px] shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
                    <h2
                        class="text-[1.4rem] font-bold text-[#2c3e50] dark:text-gray-100 mb-[20px] flex items-center gap-[10px]">
                        <span class="w-[4px] h-[20px] bg-[#4fc3f7] rounded-full"></span>
                        标签云
                    </h2>
                    <div v-if="allTags.length > 0" class="flex flex-wrap gap-[10px]">
                        <span v-for="tag in allTags" :key="tag"
                            class="bg-[#87ceeb]/20 text-[#4fc3f7] px-[14px] py-[8px] rounded-full text-[0.9rem] font-medium cursor-pointer transition-all duration-300 hover:bg-[#4fc3f7] hover:text-white hover:-translate-y-[2px]">
                            {{ tag }}
                        </span>
                    </div>
                    <div v-else class="text-[#999] dark:text-gray-500 text-center py-[20px]">
                        暂无标签
                    </div>
                </div>

                <!-- 按年份分组的文章列表 -->
                <div
                    class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-[10px] backdrop-saturate-150 border border-[rgba(169,169,169,0.2)] dark:border-gray-700 rounded-[16px] p-[30px] shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
                    <h2
                        class="text-[1.4rem] font-bold text-[#2c3e50] dark:text-gray-100 mb-[20px] flex items-center gap-[10px]">
                        <span class="w-[4px] h-[20px] bg-[#ff6b93] rounded-full"></span>
                        时间轴
                    </h2>

                    <div v-if="yearGroups.length > 0" class="space-y-[30px]">
                        <div v-for="group in yearGroups" :key="group.year"
                            class="relative pl-[20px] border-l-[2px] border-[#87ceeb]/50">
                            <!-- 年份标记 -->
                            <div
                                class="absolute left-[-9px] top-0 w-[16px] h-[16px] rounded-full bg-[#4fc3f7] border-[3px] border-white dark:border-gray-800 shadow-[0_0_0_2px_#87ceeb]">
                            </div>
                            <h3 class="text-[1.3rem] font-bold text-[#4fc3f7] mb-[15px]">{{ group.year }} 年</h3>

                            <!-- 该年份的文章列表 -->
                            <div class="space-y-[12px]">
                                <NuxtLink v-for="article in group.articles" :key="article.hash"
                                    :to="article.urlPath ?? '/'"
                                    class="article-link flex items-center gap-[15px] p-[12px] rounded-[10px] bg-white/50 dark:bg-gray-700/50 border border-[rgba(169,169,169,0.1)] dark:border-gray-600 no-underline">
                                    <span
                                        class="flex-shrink-0 w-[60px] text-[0.85rem] text-[#999] dark:text-gray-400 font-mono">{{
                                            formatDate(article.date) }}</span>
                                    <span
                                        class="article-title flex-1 text-[1rem] text-[#2c3e50] dark:text-gray-200 font-medium truncate">{{
                                            article.title }}</span>
                                    <span class="article-arrow flex-shrink-0 text-[#87ceeb]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M5 12h14" />
                                            <path d="m12 5 7 7-7 7" />
                                        </svg>
                                    </span>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>

                    <div v-else class="text-[#999] dark:text-gray-500 text-center py-[40px]">
                        暂无文章
                    </div>
                </div>
            </div>

            <!-- 侧边栏 -->
            <aside class="flex-none w-[300px] max-w-[300px] mt-[210px] h-fit max-[960px]:hidden">
                <AuthorCard :totalArticles="totalArticles" />
            </aside>
        </div>
        <Footer />
    </div>

    <!-- Sakana Widget -->
    <div id="sakana-widget" class="fixed right-0 bottom-0 z-[999]"></div>
</template>

<style scoped>
.article-link {
    transition: all 0.3s ease;
}

.article-link:hover {
    background-color: white;
    box-shadow: 0 4px 12px rgba(79, 195, 247, 0.35);
    border-color: rgba(135, 206, 235, 0.3);
}

.dark .article-link:hover {
    background-color: #374151;
}

.article-title {
    transition: color 0.3s ease;
}

.article-link:hover .article-title {
    color: #4fc3f7;
}

.article-arrow {
    opacity: 0;
    transform: translateX(-8px);
    transition: all 0.3s ease;
}

.article-link:hover .article-arrow {
    opacity: 1;
    transform: translateX(0);
}
</style>
