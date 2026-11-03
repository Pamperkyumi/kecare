import type { ThemeConfig } from "kecare";
export async function kecareConfig() {
    return {
        llm: {
            provider: 'OpenAI',
            // 密钥只从环境变量读取，禁止写入明文，避免随仓库泄露
            // 本地由 Bun 自动加载根目录 .env，远程 CI 需注入同名环境变量
            model: process.env.KECARE_LLM_MODEL ?? 'deepseek-v4-flash',
            apiKey: process.env.DEPSEEK_API_KEY ?? '',
            apiBaseUrl: process.env.KECARE_LLM_API_BASE_URL ?? 'https://api.deepseek.com',
            prompt: ''
        }
    };
}
export async function ThemeConfig() {
    return {
        ImageUrl: [
            'https://pichostoss.oss-cn-shanghai.aliyuncs.com/images/1785612859072.jpg',
            'https://pichostoss.oss-cn-shanghai.aliyuncs.com/images/1785613091954.webp',
        ]
    }
}