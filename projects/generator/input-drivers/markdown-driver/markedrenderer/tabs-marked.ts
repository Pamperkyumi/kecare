import { type TokensList, type Tokens, type TokenizerAndRendererExtension } from 'marked';

type TapItem = {
    titleRaw: string;
    titleTokens: TokensList; // 标题经过 marked inline lexer 后的 tokens（用于 parseInline）
    bodyTokens: TokensList;  // 内容经过 marked block lexer 后的 tokens（用于 parse）
};

type tabsToken = Tokens.Generic & {
    type: 'tabs';     // 自定义 token 类型
    raw: string;      // 整段 ::: tabs ... ::: 的原始文本（用于 marked 的消费/回退）
    items: TapItem[]; // 每个 tab 的标题 tokens + 内容 tokens
    uid: string;      // 唯一 id，用于 aria / id 绑定，避免页面多个 tabs 冲突
};

let tabsTokenUid = 0;

function parseTabSections(inner: string): Array<{ title: string; body: string }> {
    const lines = inner.split(/\r?\n/);
    const sections: Array<{ title: string; body: string }> = [];

    let currentTitle = '';
    let currentBody: string[] = [];

    const pushCurrent = () => {
        if (!currentTitle) return;
        sections.push({
            title: currentTitle.trim(),
            body: currentBody.join('\n').replace(/^\n+/, '').trimEnd(),
        });
    };

    for (const line of lines) {
        const tabMatch = /^@tab[ \t]+(.+)$/.exec(line);
        if (tabMatch) {
            pushCurrent();
            currentTitle = tabMatch[1] ?? '';
            currentBody = [];
            continue;
        }

        if (currentTitle) {
            currentBody.push(line);
        }
    }

    pushCurrent();
    return sections;
}

export const tabsExtension: TokenizerAndRendererExtension = {
    name: 'tabs',
    level: 'block', // block 级扩展：处理块级语法（::: tabs ... :::）

    /**
     * start(src): 给 marked 一个“可能命中”的起始位置提示
     * 用于性能优化：marked 会从该 index 开始尝试调用 tokenizer，而不是每次从头扫。
     */
    start(src) {
        const match = src.match(/::: *tabs\b/);
        return match?.index;
    },

    /**
     * tokenizer(src): 把源文本中的 ::: tabs ... ::: 匹配出来，
     * 并生成一个自定义 token（tabsToken），交给 renderer 渲染。
     */
    tokenizer(src) {
        // 匹配整段 tabs 容器：以 ::: tabs 开头，以 ::: 结尾
        // [\s\S]*? 是“非贪婪”匹配，确保匹配到最近的结束 :::
        const rule = /^::: *tabs[^\n]*\n([\s\S]*?)\n:::(?:\n|$)/;

        const match = rule.exec(src);
        if (!match) return;

        // 容器内部内容（即 tabs 的正文，不包含外层 ::: tabs 和结尾 :::）
        const inner = match[1];

        // 用逐行扫描替代大正则，避免复杂块内容（列表/围栏代码/引用等）被截断
        const sections = parseTabSections(inner!);
        if (sections.length === 0) return;

        // 为当前 tabs 块生成唯一 uid，用于 id/aria 绑定与多实例隔离
        const uid = `md-tabs-${tabsTokenUid++}`;

        /**
         * 关键点：这里不是直接存字符串，而是把标题与正文“预先词法分析”为 tokens
         * - title 用 inlineTokens：因为标题通常是行内语法（加粗/代码/链接）
         * - body 用 blockTokens：正文是块级结构（列表/代码块/段落等）
         *
         * 好处：renderer 里可以用 parser.parse / parseInline 复用 marked 的渲染逻辑，
         * 让 tabs 内仍然支持完整 Markdown 语法。
         */
        const items: TapItem[] = sections.map(({ title, body }) => {
            const titleTokens = this.lexer.inlineTokens(title);
            const bodyTokens = this.lexer.blockTokens(body) as TokensList;
            return {
                titleRaw: title,
                titleTokens,
                bodyTokens,
            } as TapItem;
        });

        // 构造自定义 token，交给 marked 的渲染阶段
        const token: tabsToken = {
            type: 'tabs',
            raw: match[0], // 注意：raw 要是整段匹配文本，marked 才能正确“消耗”源文本
            items,
            uid,
        };
        return token;
    },

    /**
     * renderer(token): 把 tabsToken 渲染成 HTML
     * 这里输出结构：外层容器 + tablist（按钮）+ panels（内容面板）
     */
    renderer(token) {
        const t = token as tabsToken;

        // 生成 tabs 导航按钮（role="tab" + aria-*，利于可访问性）
        const nav = t.items
            .map((item, index) => {
                // 标题 tokens => HTML（行内解析）
                const titleHtml = this.parser.parseInline(item.titleTokens);

                // 默认第 0 个 tab 激活
                const active = index === 0 ? 'true' : 'false';

                // tab 与 panel 的 id 绑定（aria-controls / aria-labelledby）
                const tabId = `${t.uid}-tab-${index}`;
                const panelId = `${t.uid}-panel-${index}`;

                return `<button type="button" role="tab" id="${tabId}" class="md-tabs__tab" data-tab="${index}" aria-selected="${active}" aria-controls="${panelId}">${titleHtml}</button>`;
            })
            .join('');

        // 生成 panels：每个 panel 渲染 bodyTokens（块级解析）
        const panel = t.items
            .map((item, index) => {
                const bodyHtml = this.parser.parse(item.bodyTokens);

                // 默认第 0 个 panel 显示，其他 panel hidden
                const isActive = index === 0;
                const hiddenAttr = isActive ? '' : ' hidden';
                const ariaHidden = isActive ? 'false' : 'true';

                const tabId = `${t.uid}-tab-${index}`;
                const panelId = `${t.uid}-panel-${index}`;

                return `<div class="md-tabs__panel" role="tabpanel" id="${panelId}" data-tab="${index}" aria-labelledby="${tabId}" aria-hidden="${ariaHidden}"${hiddenAttr}>${bodyHtml}</div>`;
            })
            .join('\n');

        // 最终结构：容器 + tablist + panels
        return `<div class="md-tabs" data-tabs id="${t.uid}">
                <div class="md-tabs__nav" role="tablist" aria-label="Code Tabs">${nav}</div>
                <div class="md-tabs__panels">${panel}</div>
                </div>`;
    },
};
