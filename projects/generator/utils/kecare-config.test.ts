import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import type { KecareConfig } from 'kecare';
import { validateKecareConfig } from './kecare-config.ts';

vi.mock('fs', () => ({
    existsSync: vi.fn(),
}));

describe('useKecareConfig', () => {
    let mockExistsSync: ReturnType<typeof vi.fn>;

    beforeEach(async () => {
        vi.resetModules();
        mockExistsSync = vi.fn();
        vi.mocked(await import('fs')).existsSync = mockExistsSync;
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('配置文件不存在时', () => {
        it('应该返回空对象', async () => {
            mockExistsSync.mockReturnValue(false);

            const { useKecareConfig } = await import('./kecare-config.ts');
            const context = { projectPath: '/test/project' } as any;
            const config = await useKecareConfig(context);

            expect(config).toEqual({});
            expect(mockExistsSync).toHaveBeenCalled();
        });
    });

    describe('单例模式', () => {
        it('多次调用应该返回同一个 Promise', async () => {
            mockExistsSync.mockReturnValue(false);

            vi.resetModules();
            const { useKecareConfig } = await import('./kecare-config.ts');
            const context = { projectPath: '/test/project' } as any;

            const promise1 = useKecareConfig(context);
            const promise2 = useKecareConfig(context);

            expect(promise1).toBe(promise2);
        });
    });
});

describe('validateKecareConfig LLM 校验逻辑', () => {
    it('LLM 配置缺少 model 时应该抛出错误', () => {
        // 故意构造缺字段的非法输入，断言为 KecareConfig 以测试校验的拦截能力
        const config = {
            llm: {
                apiKey: 'test-key',
                apiBaseUrl: 'https://api.test.com',
            },
        } as KecareConfig;

        expect(() => validateKecareConfig(config)).toThrow('llm.model 不能为空');
    });

    it('LLM 配置缺少 apiKey 时应该抛出错误', () => {
        const config = {
            llm: {
                model: 'gpt-4',
                apiBaseUrl: 'https://api.test.com',
            },
        } as KecareConfig;

        expect(() => validateKecareConfig(config)).toThrow('llm.apiKey 不能为空');
    });

    it('LLM 配置缺少 apiBaseUrl 时应该抛出错误', () => {
        const config = {
            llm: {
                model: 'gpt-4',
                apiKey: 'test-key',
            },
        } as KecareConfig;

        expect(() => validateKecareConfig(config)).toThrow('llm.apiBaseUrl 不能为空');
    });

    it('完整的 LLM 配置应该通过校验', () => {
        const config: KecareConfig = {
            llm: {
                provider: 'OpenAI',
                model: 'gpt-4',
                apiKey: 'test-key',
                apiBaseUrl: 'https://api.test.com',
                prompt: '',
            },
        };

        expect(() => validateKecareConfig(config)).not.toThrow();
    });

    it('没有 LLM 配置时应该通过校验', () => {
        const config = {} as KecareConfig;

        expect(() => validateKecareConfig(config)).not.toThrow();
    });
});
