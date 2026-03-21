import type { TranslationConfigOptions } from 'kecare';
import consola from 'consola';
import Bun from 'bun';
import { join } from 'node:path';
import { mkdirSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import OpenAI from 'openai';

export async function translator(options: TranslationConfigOptions): Promise<[string, string]> {
    const { llm, text, title, lang, KecareContext } = options;
    const { apiKey, apiBaseUrl, model, prompt } = llm;

    if (!lang) {
        consola.warn(`${lang}.trans.ts is not provided, skipping translation`);
        process.exit(1);
    }

    const openaiClient = new OpenAI({
        baseURL: apiBaseUrl,
        apiKey,
    });

    const Prompt = `你是一个很好用的翻译助手，请帮我将下面的文章翻译成${lang}，注意：千万不要增删任何 HTML标签/属性和markdown标签/属性,你如果看到markdown标签，如果是代码块的内容，请不要翻译，只翻译文本节点,如果是代码内容，请不要翻译，原样放回。保留链接 href、图片 src、id、class 不动。注意：代码块占位符（如 __CODE_BLOCK_0__）不要翻译，原样保留。`
    const systemPrompt = Prompt + prompt

    let translatedTitle = title || "";

    if (!title || title.trim().length === 0) {
        // consola.warn("Empty title provided for translation");
        translatedTitle = title || "";
    } else {
        // Protect code blocks in title (rare, but keep same behavior)
        const titleCodeBlocks: Array<{ id: string; content: string }> = [];
        let titleWithPlaceholders = title;

        titleWithPlaceholders = titleWithPlaceholders.replace(
            /(`{3,}|~{3,})[\s\S]*?\1/g,
            (match: string) => {
                const id = `__CODE_BLOCK_${titleCodeBlocks.length}__`;
                titleCodeBlocks.push({ id, content: match });
                return id;
            }
        );

        try {
            const completion = await openaiClient.chat.completions.create({
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: titleWithPlaceholders },
                ],
                model: model || "deepseek-chat",
            });

            translatedTitle = completion.choices[0]?.message.content || titleWithPlaceholders;

            // Restore title code blocks
            for (const block of titleCodeBlocks) {
                translatedTitle = translatedTitle.replace(block.id, block.content);
            }
        } catch (error) {
            consola.error("Translation failed (title):", error);
            translatedTitle = title;
        }
    }

    // =========================
    // 2) Translate Content 
    // =========================
    const rawContent = (text || "").replace(/\r\n?/g, "\n");

    if (!rawContent || rawContent.trim().length === 0) {
        consola.warn("Empty text provided for translation");
        return [translatedTitle, text || ""];
    }

    // Protect code blocks in content
    const codeBlocks: Array<{ id: string; content: string }> = [];
    let contentWithPlaceholders = rawContent.replace(/(`{3,}|~{3,})[\s\S]*?\1/g, (match) => {
        const id = `__CODE_BLOCK_${codeBlocks.length}__`;
        codeBlocks.push({ id, content: match });
        return id;
    });

    // Split into paragraphs (two or more newlines)
    const parts = contentWithPlaceholders
        .split(/\n{2,}/)
        .map((s) => s.trim())
        .filter(Boolean);

    const translatedParts: string[] = [];
    const allTranslationTemp: Record<string, string> = {};

    // Cache path
    const titleHash = Bun.hash.xxHash3(title || "", 1234n).toString(16).slice(0, 8);
    const cacheDir = join(KecareContext.projectPath, ".tmp", lang, titleHash);
    mkdirSync(cacheDir, { recursive: true });
    const cacheFilePath = join(cacheDir, "translations.json");

    // Load cache
    try {
        const cacheData = await Bun.file(cacheFilePath);
        const cacheDataJson = await cacheData.json();
        Object.assign(allTranslationTemp, cacheDataJson);
        // consola.info(`Loaded cached translations from ${cacheFilePath}`);
    } catch {
        // consola.info(`No cached translations found for ${title}.`);
    }

    // Translate each part (use cache if hit)
    for (const [index, part] of parts.entries()) {
        if ((index + 1) % 5 === 0) {
            consola.info(`Processing content part ${index + 1}/${parts.length}`);
        }
        const partHash = Bun.hash.xxHash3(part, 1234n).toString(16).slice(0, 8);

        if (allTranslationTemp[partHash]) {
            // consola.info(`Using cached translation for part ${index + 1}`);
            translatedParts.push(allTranslationTemp[partHash]);
            continue;
        }

        // consola.info(`Translating content part ${index + 1}/${parts.length}`);

        try {
            // Inline translateText(part)
            const completion = await openaiClient.chat.completions.create({
                messages: [
                    { role: "system", content: systemPrompt! },
                    { role: "user", content: part },
                ],
                model: model
            });

            const translatedPart = completion.choices[0]?.message.content || part;

            allTranslationTemp[partHash] = translatedPart;
            translatedParts.push(translatedPart);
        } catch (error) {
            consola.error(`Failed to translate part ${index + 1}:`, error);
            translatedParts.push(part);
            allTranslationTemp[partHash] = part;
        }
    }

    // Save cache
    try {
        await writeFile(cacheFilePath, JSON.stringify(allTranslationTemp, null, 2), "utf-8");
        // consola.success(`Saved translations to ${cacheFilePath}`);
    } catch (error) {
        consola.error("Error saving translations:", error);
    }

    // Restore content code blocks
    let translatedContent = translatedParts.join("\n\n");
    for (const block of codeBlocks) {
        translatedContent = translatedContent.replace(block.id, block.content);
    }

    return [translatedTitle, translatedContent];
}

