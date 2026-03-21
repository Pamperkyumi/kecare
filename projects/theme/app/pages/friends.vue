<script lang="ts" setup>
import { onMounted, nextTick } from "vue"
import SakanaWidget from 'sakana-widget';
import 'sakana-widget/lib/index.css';
import Navbar from '~/components/Theme/Sidebar/Navbar.vue'
import heroBg from '~/assets/bg1.jpg'
import Footer from '~/components/Theme/Sidebar/Footer.vue'

useHead({
    title: '友链喵',
})

type FriendLink = {
    name: string;
    url: string;
    desc: string;
    image: string;
}

const siteInfo: FriendLink = {
    name: '避难所呜呜呜',
    url: 'https://kecare.kecream.cn',
    desc: '小咸鱼小咸鱼小咸鱼',
    image: 'http://pichost.cloud/files/590783c0506243ffea1fea8981b5850a8e86f02a8bc4f49441e4f0312d1034ff.webp'
}

const friendLinks: FriendLink[] = [
    {
        name: '可莉姆船长',
        url: 'https://kecream.cn',
        desc: '关注可莉姆船长谢谢喵',
        image: 'https://pichost.cloud/files/a585d06168c8553f42b086a6fec51075273913c2092c65b59858e47352b4fc79.avif'
    },
]

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
</script>

<template>
    <div id="app"
        class="min-h-screen flex flex-col font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif] leading-[1.6] text-[var(--color-text-primary)] bg-[var(--color-bg-secondary)] select-none">
        <div
            class="relative h-[40vh] min-h-[300px] overflow-hidden flex flex-col items-center justify-center text-center mt-[60px]">
            <div class="absolute inset-0 bg-center bg-cover"
                :style="{ backgroundImage: `url('http://pichost.cloud/files/d409bed9b5cb6706b27a548332ead440da1bdfa23428561a66d59b753c190ac2.jpg')` }">
            </div>
            <div class="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
            <h1
                class="relative text-white text-[3rem] font-bold tracking-[2px] select-none [text-shadow:2px_2px_10px_rgba(0,0,0,0.5)]">
                友情链接</h1>
            <p class="relative text-white/80 text-[1.1rem] mt-[10px]">Friends & Links</p>
        </div>

        <Navbar />

        <div class="max-w-[1200px] mx-auto p-[20px] flex flex-col md:flex-row gap-[30px] w-full">
            <div class="flex-1 flex flex-col gap-[30px]">

                <div
                    class="bg-[var(--color-bg-primary)]/70 backdrop-blur-[10px] backdrop-saturate-150 border border-[rgba(169,169,169,0.2)] rounded-[16px] p-[30px] shadow-[0_10px_30px_var(--color-shadow)]">
                    <h2
                        class="text-[1.4rem] font-bold text-[var(--color-text-primary)] mb-[20px] flex items-center gap-[10px]">
                        <span class="w-[4px] h-[20px] bg-[var(--color-accent)] rounded-full"></span>
                        🏠 本站信息
                    </h2>
                    <div
                        class="flex items-center gap-[20px] p-[20px] bg-[var(--color-bg-primary)]/50 rounded-[12px] border border-[rgba(169,169,169,0.1)]">
                        <img :src="siteInfo.image" :alt="siteInfo.name"
                            class="w-[80px] h-[80px] rounded-full object-cover border-[3px] border-[#ff9eb0]/50 shadow-[0_4px_12px_rgba(255,107,147,0.2)]" />
                        <div class="flex-1">
                            <h3 class="text-[1.2rem] font-bold text-[var(--color-text-primary)] mb-[8px]">{{
                                siteInfo.name }}</h3>
                            <p class="text-[var(--color-text-secondary)] text-[0.9rem] mb-[10px]">{{ siteInfo.desc }}
                            </p>
                            <a :href="siteInfo.url" target="_blank"
                                class="inline-flex items-center gap-[6px] text-[var(--color-accent)] text-[0.9rem] no-underline hover:text-[#ff4d7d] transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                </svg>
                                {{ siteInfo.url }}
                            </a>
                        </div>
                    </div>
                </div>

                <div
                    class="bg-[var(--color-bg-primary)]/70 backdrop-blur-[10px] backdrop-saturate-150 border border-[rgba(169,169,169,0.2)] rounded-[16px] p-[30px] shadow-[0_10px_30px_var(--color-shadow)]">
                    <h2
                        class="text-[1.4rem] font-bold text-[var(--color-text-primary)] mb-[20px] flex items-center gap-[10px]">
                        <span class="w-[4px] h-[20px] bg-[var(--color-accent)] rounded-full"></span>
                        📝 添加友链
                    </h2>
                    <div class="text-[var(--color-text-secondary)] leading-[1.8]">
                        <p class="mb-[15px]">
                            欢迎交换友链！请在您的网站添加本站链接后，在本页面留言区按以下格式留言：
                        </p>
                        <div
                            class="bg-[var(--color-bg-secondary)] rounded-[10px] p-[20px] font-mono text-[0.9rem] border border-[rgba(169,169,169,0.15)]">
                            <div class="space-y-[8px]">
                                <div><span class="text-[var(--color-accent)]">name:</span> 您的网站</div>
                                <div><span class="text-[var(--color-accent)]">url:</span> 您的网址</div>
                                <div><span class="text-[var(--color-accent)]">desc:</span> 简短描述</div>
                                <div><span class="text-[var(--color-accent)]">image:</span> 一张图片</div>
                            </div>
                        </div>
                        <p class="mt-[15px] text-[var(--color-text-secondary)] text-[0.9rem]">
                            * 请确保您的网站内容健康、稳定可访问，博主会在看到留言后尽快添加友链~
                        </p>
                    </div>
                </div>

                <div
                    class="bg-[var(--color-bg-primary)]/70 backdrop-blur-[10px] backdrop-saturate-150 border border-[rgba(169,169,169,0.2)] rounded-[16px] p-[30px] shadow-[0_10px_30px_var(--color-shadow)]">
                    <h2
                        class="text-[1.4rem] font-bold text-[var(--color-text-primary)] mb-[20px] flex items-center gap-[10px]">
                        <span class="w-[4px] h-[20px] bg-[var(--color-accent)] rounded-full"></span>
                        🔗 友链列表
                    </h2>
                    <div v-if="friendLinks.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-[15px]">
                        <a v-for="link in friendLinks" :key="link.url" :href="link.url" target="_blank"
                            class="friend-link flex items-center gap-[15px] p-[15px] bg-[var(--color-bg-primary)]/50 rounded-[12px] border border-[rgba(169,169,169,0.1)] no-underline">
                            <img :src="link.image" :alt="link.name"
                                class="friend-avatar w-[50px] h-[50px] rounded-full object-cover border-[2px] border-[var(--color-accent)]/30" />
                            <div class="flex-1 min-w-0">
                                <h3 class="friend-name text-[1rem] font-bold text-[var(--color-text-primary)] truncate">
                                    {{ link.name }}
                                </h3>
                                <p class="text-[var(--color-text-secondary)] text-[0.85rem] truncate mt-[4px]">{{
                                    link.desc }}</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="friend-arrow flex-shrink-0 text-[#ff9eb0]">
                                <path d="M7 7h10v10" />
                                <path d="M7 17 17 7" />
                            </svg>
                        </a>
                    </div>
                    <div v-else class="text-[var(--color-text-secondary)] text-center py-[40px]">
                        暂无友链，快来成为第一个吧~
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>

    <div id="sakana-widget" class="fixed right-0 bottom-0 z-[999]"></div>
</template>

<style scoped>
.friend-link {
    transition: all 0.3s ease;
}

.friend-link:hover {
    background-color: var(--color-bg-primary);
    box-shadow: 0 4px 12px rgba(255, 107, 147, 0.15);
    border-color: rgba(255, 107, 147, 0.3);
    transform: translateY(-2px);
}

.friend-avatar {
    transition: border-color 0.3s ease;
}

.friend-link:hover .friend-avatar {
    border-color: var(--color-accent);
}

.friend-name {
    transition: color 0.3s ease;
}

.friend-link:hover .friend-name {
    color: var(--color-accent);
}

.friend-arrow {
    opacity: 0;
    transform: translateX(-5px);
    transition: all 0.3s ease;
}

.friend-link:hover .friend-arrow {
    opacity: 1;
    transform: translateX(0);
}
</style>
