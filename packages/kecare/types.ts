export type KecareConfig = {
    // 字段你可以自己写..
    llm: {
        provider: 'OpenAI' | 'Anthropic';
        model: string;
        apiKey: string;
        apiBaseUrl: string;
        prompt: string;
        max_tokens?: number;
    }
}

export type ThemeConfig = {
    ImageUrl: string[];
}

export type ArticleStats = {
    // 按语言分组统计
    perLang: Record<string, {
        total: number;                      // 该语言文章总数
        tags: Record<string, number>;       // 每个标签的文章数量
    }>;
    allTags: string[];                      // 所有去重标签
    totalArticles: number;                  // 全部文章总数
}

export type KecareContext = {
    // 项目路径
    projectPath: string;
    // 文章聚合统计数据，emitModuleFinish 阶段填充，finish() 处理器可读取
    articleStats?: ArticleStats;
}

export type ArticleVariant = {
    title: string;
    lang: string;
    isOriginalLang: boolean;
    hash: string;
    html: string;
    frontMatter: FrontMatter;
    [key: string | number | symbol]: any;
    rawMarkdown: string;
}

export type FrontMatter = {
    menu: string;
    date: string;
    cover: string | undefined;
    layout: string | undefined;
    title: string;
    desc: string | undefined;
    tags: Array<string>;
    translate: Array<string>;
    sticky: number;
    author: string | undefined;
    hidden: boolean;
};

// 生成文章详情
export type ModuleArticleTS = {
    generator: (context: KecareContext, article: ArticleVariant) => Promise<{
        // 文章详情页面的 URL
        urlPath: string,
        // 文件生成的路径
        fsPath: string,
        // 文章详情页面的模板内容
        template: string
    }>;
}

export type ArticlesRecord = Record<string, Record<string, Omit<ArticleVariant, 'html'> & { fsPath: string, urlPath: string }>>;


// 生成文章列表
export type ModuleListTS = {
    generator: (context: KecareContext,
        articles: ArticlesRecord
    ) => Promise<
        Array<
            {
                // 文件生成的路径
                fsPath: string,
                // 文章详情页面的模板内容
                template: string
            }
        > |
        {
            // 文件生成的路径
            fsPath: string,
            // 文章详情页面的模板内容
            template: string
        }
    >;
}


// 归档
export type ModuleArchiveTS = {
    generator: (context: KecareContext,
        articles: ArchiveArticleData[]
    ) => Promise<{
        // 文件生成的路径
        fsPath: string,
        // 文章详情页面的模板内容
        template: string
    }>;
}

export type ArchiveArticleData = {
    title: string;
    lang: string;
    hash: string;
    tags: Array<string>;
    date: string;
    fsPath: string;
    urlPath: string;
}

// 翻译
export type TranslationConfigOptions = {
    KecareContext: KecareContext;
    llm: KecareConfig['llm'];
    text?: string;
    title?: string;
    lang?: string;
}
// 搜索文章数据
export type SearchArticleData = {
    title: string;
    lang: string;
    hash: string;
    tags: Array<string>;
    date: string;
    urlPath: string;
    content: string;
}

// 导航
export type NavItem =
    | { text: string; link: string; level: number; desc?: string; icon?: string }
    | { text: string; items: NavItem[]; level: number };

// 生成菜单
export type ModuleMenuTS = {
    generator: (context: KecareContext,
        articles: ArticlesRecord
    ) => Promise<{
        fsPath: string,
        template: string
    }>;
}

// 生成标签页
export type ModuleTagsTS = {
    generator: (context: KecareContext,
        tagGroups: { tag: string, articles: ArchiveArticleData[] }[]
    ) => Promise<{
        fsPath: string,
        template: string
    }>;
}

