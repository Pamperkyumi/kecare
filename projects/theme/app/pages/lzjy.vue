<script lang="ts" setup>
import Navbar from '~/components/Theme/Sidebar/Navbar.vue'
import { nextTick, ref, watch } from 'vue'
import avatar from '~/assets/zjkjdx.jpg'

useHead({
    title: '你是怎么发现这里的',
})

interface Message {
    role: 'user' | 'assistant'
    content: string
}

const messages = ref<Message[]>([])
const inputText = ref('')
const isThinking = ref(false)
const chatContainer = ref<HTMLElement | null>(null)
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const DEEPSEEK_API_KEY = 'sk-97a91104fb4e4bd3804ccaa2ed662be2'
const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions'
const SYSTEM_PROMPT = `
# 语言规范
    1.你的发言尽量保持你招生老师的身份，不要过于亲切，要与家长保留距离感，发言要具有专业性。不清楚的东西不能贸然回答。
    2.我们自主招生主要针对普高400分一下，职高300分以下的学生，这些孩子只能上民办专科，如果普高低于370，是只能上省外的民办专科。所以我们主要对象就是考省内大学有困难的孩子，以及辍学，没有大学念的技校这些。
    3.我们自主招生是没有助学贷款和奖学金的，所以你不能回答家长关于助学贷款和奖学金的问题。如果家长提到关于学费贵的问题，你要回答家长，孩子这个成绩上民办也是学费差不多的，可能我们还会比较便宜，民办专科的学习氛围肯定没有我们公办本科好。并且我们是可以勤工俭学的。在食堂打工也可以获得费用。
# 你的身份
    你是一个浙江科技大学全日制自考招生办的老师，你正在为浙江科技大学继续教育学院做26届自主招生，你必须熟读这份规范，后续我会给你家长的提问，你做出回答，你的目的是，流利熟练的打消家长的疑虑，并且做出邀约，将家长邀约到学校中就是你的目标。你在和家长的发言中必须维持你老师的形象。
# 什么是全日制自考
    我们自主招生属于国家二类招生，经过浙江省教育厅的审批，报读不考核高考成绩，只需要到校参加面试，通过就可以到学校报到就读，为期三年全日制学习，并可以获得大专 + 自考本科双学历。这个自主招生和单考单招，提前批招生，高考填报志愿都互不影响，即使被我校录取，也可以通过上述的方式来报考大学，如果最后被比较好的学校录取，我们这边也可以申请退学，不收取费用。
# 你需要知道的要点
    1.我们自主招生需要通过学校的校测面试，面试是安排在孩子高考之后的。所以有些家长就会要求高考之后再来学校了解。但是你需要尽力尽早的对家长进行邀约。因为现在很多学校都在进行自主招生。所以容易被其他学校抢人。
    2.如果学生实在因为高考没有时间，你可以邀约家长自己先来，告诉家长，我们要提前为孩子铺路，面试是安排在高考之后的，孩子可以等高考后再了解我们是否来我们学校面试就读。你只要想办法将家长邀约到校就可以了。
    3.现在有很多校外的机构再给我们浙江科技大学招生，你要相信你是校内的招生老师，但是你不能攻击他们，因为他们也是招生的，你可以用他们只负责招生，不负责后续跟进，学校三年的服务工作的。他们招生完就不负责了。
# 常见的问答
## 我们自主招生是浙江科技大学颁发的非全日制本科，但是你要尽量避免提及 非全日制本科 这个词汇，例如：
    Q：老师，我想问一下，你们这边这个文凭读书是不是也是非全日制文凭啊？
    A: 全日制和非全日制只是一种学习形式，我们学校是全日制在校学习三年拿自考本科的学历。
## 很多机构都在为浙江科技大学进行招生，你必须坚信你是学校里的老师，其他老师一律为校外机构的老师，但是你不能对其进行攻击，因为都是在为浙江科技大学招生，但是你可以通过说校外机构不负责后续跟进来进行回答，你需要加强家长对你信任。
    Q: 有好几个科技的老师加我了
    A：现在确实有很多校外机构在给我们学校招生，他们只负责招生是不负责后期跟进服务的，说的直白一点，学生报完名和他们就没有关系了。我们学校里面的招生办，从学生接待参观报名到入学，包括后面3年的在校情况，有任何问题家长都可以随时和我们沟通。
## 如果学生质疑 世界上哪有这么好的事情，不用高考就能享受统招生一样的待遇，你需要从两个点切入，1.我们和统招生最大的区别是学费，因为统招生是有政府补贴，国家补贴的，所以学费可能就比较便宜。我们自主招生是没有学费补贴的，可能会比较贵的。2.围绕自考本科讲述，说我们拿的是自考本科，不要说是非全日制本科。
## 当家长提问你们这个自考本科和成人本科有什么区别时，你需要回答家长，我们这个自考本科是浙江科技大学颁发的自考本科，我们是自考形式的，和成人本科完全不是一个东西的，我们含金量比成人本科高多了。
## 我们面试是安排在高考之后的，即让家长先来学校详细了解情况，进行一个预报名，后续等孩子高考完再选择是否来我们学校面试就读的。因为有校外机构说当天就可以面试，这是不对的，如果家长有说别的科技老师说当天就可以面试，你可以说他们是校外机构，只负责招生填报名表就算kpi了，而我们校内的老师，是注重入学率的。我们需要充分考虑孩子的意愿，所以是安排在高考之后面试的。
`

function scrollToBottom() {
    nextTick(() => {
        if (chatContainer.value) {
            chatContainer.value.scrollTop = chatContainer.value.scrollHeight
        }
    })
}

async function sendMessage() {
    const text = inputText.value.trim()
    if (!text || isThinking.value) return

    messages.value.push({
        role: 'user',
        content: text,
    })
    inputText.value = ''
    scrollToBottom()

    isThinking.value = true

    try {
        const response = await fetch(DEEPSEEK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'deepseek-v4-flash',
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    ...messages.value,
                ],
                stream: false,
            }),
        })

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}))
            const errMsg = (errData as any).error?.message || `HTTP ${response.status}`
            throw new Error(errMsg)
        }

        const data = await response.json()
        const reply = data.choices?.[0]?.message?.content

        if (!reply) {
            throw new Error('AI 返回内容为空')
        }

        messages.value.push({
            role: 'assistant',
            content: reply,
        })
    } catch (err: any) {
        messages.value.push({
            role: 'assistant',
            content: '抱歉，请求失败，请稍后重试。',
        })
    } finally {
        isThinking.value = false
        scrollToBottom()
    }
}

function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        sendMessage()
    }
}

function adjustTextareaHeight() {
    const el = textareaRef.value
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 200) + 'px'
}

watch(inputText, () => {
    nextTick(adjustTextareaHeight)
})
</script>

<template>
    <Navbar />
    <div class="flex flex-col h-screen pt-[36px] bg-[var(--color-bg-secondary)]">

        <div ref="chatContainer" class="flex-1 overflow-y-auto px-4 py-6 space-y-5 scroll-smooth">
            <div v-if="messages.length === 0"
                class="flex flex-col items-center justify-center h-full text-[var(--color-text-secondary)]">
                <div class="text-5xl mb-4">💬</div>
                <p class="text-lg font-medium mb-1">开始对话</p>
                <p class="text-sm">你是家长的身份，对面是招生老师</p>
            </div>

            <template v-for="msg in messages" :key="msg.content">
                <div v-if="msg.role === 'user'" class="flex items-start gap-3 justify-end">
                    <div class="flex flex-col items-end max-w-[75%]">
                        <div
                            class="px-5 py-3 rounded-2xl rounded-tr-md bg-[var(--color-accent)] text-white text-sm leading-relaxed shadow-sm">
                            {{ msg.content }}
                        </div>
                    </div>
                    <div
                        class="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                        U
                    </div>
                </div>

                <div v-else class="flex items-start gap-3">
                    <div class="w-8 h-8 rounded-full flex-shrink-0 bg-cover bg-center"
                        :style="{ backgroundImage: `url(${avatar})` }">
                    </div>
                    <div class="flex flex-col max-w-[75%]">
                        <div
                            class="px-5 py-3 rounded-2xl rounded-tl-md bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] border border-[var(--color-border)] text-sm leading-relaxed shadow-sm whitespace-pre-wrap">
                            {{ msg.content }}
                        </div>
                    </div>
                </div>
            </template>

            <div v-if="isThinking" class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-purple-400 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
                    :style="{ backgroundImage: `url(${avatar})` }">
                    >
                </div>
                <div
                    class="px-5 py-3 rounded-2xl rounded-tl-md bg-[var(--color-bg-primary)] border border-[var(--color-border)] shadow-sm">
                    <div class="flex gap-1.5">
                        <span class="w-2 h-2 rounded-full bg-[var(--color-text-secondary)] animate-bounce"
                            style="animation-delay: 0ms"></span>
                        <span class="w-2 h-2 rounded-full bg-[var(--color-text-secondary)] animate-bounce"
                            style="animation-delay: 150ms"></span>
                        <span class="w-2 h-2 rounded-full bg-[var(--color-text-secondary)] animate-bounce"
                            style="animation-delay: 300ms"></span>
                    </div>
                </div>
            </div>
        </div>

        <div class="px-4 py-3 bg-[var(--color-bg-primary)]/80 backdrop-blur-md border-t border-[var(--color-border)]">
            <div class="max-w-3xl mx-auto flex items-end gap-3">
                <textarea ref="textareaRef" v-model="inputText" @keydown="handleKeydown" :disabled="isThinking"
                    placeholder="输入你的消息... (Shift+Enter 换行)" rows="1"
                    class="flex-1 resize-none px-4 py-3 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] border border-[var(--color-border)] rounded-2xl text-sm leading-relaxed outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors disabled:opacity-50"></textarea>
                <button @click="sendMessage" :disabled="isThinking || !inputText.trim()"
                    class="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                        <path
                            d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                    </svg>
                </button>
            </div>
            <p class="text-center text-[var(--color-text-secondary)] text-xs mt-2">
                我将邀约视为Ai的目标，所以Ai每句话都会拐到邀约上，但是正常聊天中，频繁邀约可能令家长反感。请根据情况仅挑选Ai中与邀约无关的回复。
            </p>
        </div>
    </div>
</template>
