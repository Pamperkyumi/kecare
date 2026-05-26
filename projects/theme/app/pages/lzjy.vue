<script lang="ts" setup>
import Navbar from '~/components/Theme/Sidebar/Navbar.vue'
import { nextTick, ref, watch } from 'vue'
import avatar from '~/assets/zjkjdx.jpg'
import favicon from '~/assets/favicon.ico'

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
2、报名你们学校后是不是就可以读了，不用高考的嘛？
答:我们自主招生属于国家二类招生，经过浙江省教育厅的审批，报读不考核高考成绩，只需要到校参加面试，通过就可以到学校报到就读，为期三年全日制学习，并可以获得大专+自考本科双学历。这个自主招生和单考单招，提前批招生，高考填报志愿都互不影响，即使被我校录取，也可以通过上述的方式来报考大学，如果最后被比较好的学校录取，我们这边也可以申请退学，不收取费用。
3、毕业后拿到文凭是什么样的，和高考考上的一样吗？
答：会有不一样的地方，毕竟孩子没有通过高考的形式进入学校，我们毕业之后我们拿到的是专科+自考本科文凭，最终获得的是自考本科学历。这个学历含金量比较高，可以考研，考公，考编，评职称，落户等等，含金量和社会认可度来说比全日制肯定要低，但是比全日制大专要高的。（如果家长继续提问，大专是什么学历，可以大方回答函授大专，并说明大专只是过渡用的，主要是为了拿本科学历。此处需要花大量时间去解释自考的用途，含金量，难度，如果降低的难度保障通过率，让家长对学历的含金量得到认可并且知道比较简单）。
4、毕业证一定能拿到吗？
答：大专的毕业证孩子毕业是肯定可以拿到的，本科考试的通过率是有达到百分之90%以上，孩子遵守学校教学制度、积极完成考试考证，都是可以毕业的。（）如果孩子家长比较专业，可以详细介绍自考专升本的考试情况，突出校内自考的优势。）
5、我孩子成绩很差，上学可能学不到东西，混混日子。
答：我们自主招生进来的学生，课程是根据学生的理解能力，和学习能力来制定的课程，难度不会太大。而且教学全部是由大学本部老师授课的，教学质量是有所保障的。每个班级我们还有班主任负责监督管理，孩子的上下课都是班主任会负责签到，并且签到信息在系统中会出行，家长也能看到学生的上课情况，考试成绩，情况申请，学费明细等。详细说明我们的教学系统使用，突出我们教学管理的优势。
6、和本科生一起会区别对待吗？
答：自主招生进来的学生，有学校的学生证一卡通，可以进出学校的图书馆，食堂，实训基地，体育馆等，并且可以参加学校组织的篮球赛，歌唱比赛，创业大赛等等，也可以参加校内的社团等丰富自己的大学生活拓展人脉。总得来说，自主招生进来的学生在学校和统招的学生是没有太多区别的，享受同等待遇。
7、成教文凭有用吗？
答：由于现在大专学历已经很普及了，现在用人单位招聘的过程中，如果要求是大专及以上的，是不看学历是否是全日制的，加上成教/函授大专学历本身是学信网电子注册，国家承认的。所以毕业后，正常找工作等都是没问题的。而我们的核心优势点是在于让孩子可以获得自考本科学历，这个自考本科学历含金量就非常高了。如果您有兴趣的话，我详细和您说明一下自考本科的情况（后续参考产品展示中自考的介绍）。
8、学校里是否有坏学生？学生会不会被霸凌？
答：中国科技大学是省重点院校，我们学校的风气也是很好的，另外我们在招生过程中会排除掉三类学生①有心理疾病如抑郁症，狂躁症②有传染性疾病，③打架斗殴被处分退学的学生。另外大学生已经比较成熟了，基本不会出现霸凌情况，我们学校的管理制度方面都是非常规范的，所以不用担心。
9、学校管理怎么样？
答：其实学校比家长更关注学校管理方面的问题，毕竟学生如果在校出事，学校都是要承担责任的，并且学校实行一卡通制，会显示学生所在班级，姓名等基本信息，也方便学校管理，除此之外，我们每个班都有班主任老师会负责起学生在校的学习/生活/安全等任务。每栋宿舍也会安排值班老师，这方面家长可以放心。学校有家校通系统，学生在学校读书的上课情况，考试成绩，是否在校住宿等，都可以通过家校通看到。
12、学校环境，住宿，就餐情况如何？
答：校园占地面积多达1500亩，环境优美，地理位置优越，师资力量强大，学习氛围好，周边设施完善，交通便利，学校还有丰富的社团活动；
餐厅饮食丰富多样，价格平价，还有网红餐厅，国家卫生局严格审批的，符合卫生标准，保证学生饮食健康
14.我孩子学习这么差，为啥还能进你们这么好的学校
答：因为我们是提前批自主招生，所以对学生考试成绩要求没那么高，只要通过咱们重点一本院校的面试就可以直接来咱们中国科技大学进行就读的，安排面试可以更好的了解到学生的各方面情况，跟学习成绩优差关系不大的.
15.我孩子学习习惯不好，能不能顺利毕业啊
答：只要小孩正常去上课，按时完成作业，通过期末考，都是能毕业的，那你说你不去上课，作业也不写，期末考也不参加，那肯定是有问题的，您说对吧，虽然咱们有班主任，有授课老师等，但是大学大家都是成年人了，很多事情还是要看自己的，如果只是来混日子，不上课，也不学习，考试也不参加，首先咱们学校也是不招的
16.我孩子进了学校之后，我问你还是问其他老师我孩子的情况啊
答：我们学生在校读书期间会有班主任的，到时候报道的时候，可以家长跟班主任可以加个wx，偶尔可以了解一下小孩的情况都是没问题的，到时候我也会经常在学校，您跟我联系也可以，跟班主任联系也可以，都可以的
18.毕业后考公务员可以正常考的吧
答：可以考的，这个完全没有影响的。国家有明确的文件规定的，非全学历和全日制学历在考公考编上是享受相同待遇的。
19.孩子不愿意上学 
答：孩子目前有这个想法很正常，我们老师也能理解，毕竟孩子现在这个年龄正处于叛逆期，再加上之前可能学习基础不是特别好，对学习失去了信心。但是咱家长考虑问题肯定得从长远来考虑，孩子未来几十年，要用到学历的地方还有很多，咱不能因为孩子一时的任性就错过了上学的最佳时机，到时候后悔都来不及。
我这边建议您可以等孩子情绪好些的时候，潜移默化的跟他疏导下，或者最直接的，您方便的时候把孩子带到我们学校，我们跟他聊一聊，有些孩子他的想法不愿意跟家长沟通，更愿意跟老师沟通。同时您还可以提前带孩子感受下大学的氛围，大学是比较自由的，并不会像高中那么压抑，指不定孩子到了这个环境中自然就转变想法了。您看这个礼拜六方便吗？您带孩子过来我们聊一聊
20. 我这边考虑一下 
答： 这个回复需要有销售敏感度，需要和家长确认下次跟进时间，或者再次询问家长是否有不理解的地方排除疑惑。
21.毕业后工作有保障吗 
答：毕业后工作并不是包分配的，但是我们每届毕业季，校内会组织校园招聘会，到时候会有各地企业来校招聘，学生也可以自行去心仪的公司投简历 还是需要孩子自己去找他喜欢的公司 当然我们学校会跟各大公司接触 尽量让孩子能有多种选择 最终能去自己喜欢的公司工作 .
22.退款问题 
答：孩子预报名后，如果后期高考被录取了，或者不想来读了，缴纳的床位预定费我们会全额退款，这个您放心 。
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
                    <img :src="favicon" class="w-8 h-8 rounded-full flex-shrink-0 object-cover bg-gray-300" />
                </div>

                <div v-else class="flex items-start gap-3">
                    <img :src="avatar" class="w-8 h-8 rounded-full flex-shrink-0 object-cover bg-gray-300" />
                    <div class="flex flex-col max-w-[75%]">
                        <div
                            class="px-5 py-3 rounded-2xl rounded-tl-md bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] border border-[var(--color-border)] text-sm leading-relaxed shadow-sm whitespace-pre-wrap">
                            {{ msg.content }}
                        </div>
                    </div>
                </div>
            </template>

            <div v-if="isThinking" class="flex items-start gap-3">
                <img :src="avatar" class="w-8 h-8 rounded-full flex-shrink-0 object-cover bg-gray-300" />
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
