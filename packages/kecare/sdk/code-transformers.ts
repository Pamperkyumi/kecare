import type { ShikiTransformer } from 'shiki';
import { transformerNotationDiff, transformerNotationFocus, transformerNotationHighlight, transformerNotationMap } from '@shikijs/transformers';

// 解析围栏 meta 中的行号标注，如 "{4}"、"{4,7,9}"、"{5-8}"、"{4,7-13,16}"
// 返回所有被标注的行号集合（从 1 开始），解析失败返回空数组
function parseMetaLineNumbers(meta: string): number[] {
    const match = meta.match(/\{([^}]*)\}/);
    if (!match || match[1] === undefined) return [];

    const lineNumbers: number[] = [];
    // 逗号分隔多个条目，每个条目是单个行号或 "起始-结束" 范围
    const parts = match[1].split(',');
    for (const part of parts) {
        const rangeMatch = part.trim().match(/^(\d+)-(\d+)$/);
        if (rangeMatch && rangeMatch[1] !== undefined && rangeMatch[2] !== undefined) {
            // 行范围：如 5-8，把 5、6、7、8 都加入
            const start = parseInt(rangeMatch[1], 10);
            const end = parseInt(rangeMatch[2], 10);
            for (let i = start; i <= end; i++) {
                lineNumbers.push(i);
            }
            continue;
        }

        const singleMatch = part.trim().match(/^(\d+)$/);
        if (singleMatch && singleMatch[1] !== undefined) {
            lineNumbers.push(parseInt(singleMatch[1], 10));
        }
    }
    return lineNumbers;
}

// 自定义 meta 高亮 transformer：通过围栏语言后的 {行号} 标注（如 ```js{4,6-7}）触发行高亮效果
// 被标注的行加 highlighted class，与 // [!code highlight] 行内标注共用同一套样式
const transformerMetaHighlight: ShikiTransformer = {
    name: 'kecare:meta-highlight',
    pre(node) {
        const meta = this.options.meta?.__raw || '';
        const lineNumbers = parseMetaLineNumbers(meta);
        if (lineNumbers.length === 0) return;

        // 给 pre 加 has-highlighted，激活 CSS 中的行高亮规则
        this.addClassToHast(node, 'has-highlighted');

        // 遍历 code 下的直接子 span.line，按行号（从 1 开始）打 highlighted 标记
        for (const code of node.children) {
            if (code.type !== 'element' || code.tagName !== 'code') continue;

            let lineNumber = 0;
            for (const lineSpan of code.children) {
                if (lineSpan.type !== 'element' || lineSpan.tagName !== 'span') continue;

                // class 可能是字符串或数组，统一转成字符串判断是否含 line
                const classNames = lineSpan.properties?.class;
                const classString = Array.isArray(classNames) ? classNames.join(' ') : String(classNames ?? '');
                if (!classString.split(' ').includes('line')) continue;

                lineNumber++;
                if (lineNumbers.includes(lineNumber)) {
                    this.addClassToHast(lineSpan, 'highlighted');
                }
            }
        }
    }
};

// 创建代码高亮 transformers 配置：包含 diff、聚焦、模糊、高亮标注
export function createCodeTransformers() {
    // 代码模糊标注：与代码聚焦相反，标记的行默认模糊，鼠标悬停到该行时才显示
    const transformerNotationBlur = transformerNotationMap({
        classMap: { blur: 'blurred' },
        classActivePre: 'has-blurred',
        matchAlgorithm: 'v3'
    });

    return [
        transformerNotationDiff({ matchAlgorithm: 'v3' }),
        transformerNotationFocus({ matchAlgorithm: 'v3' }),
        transformerNotationBlur,
        transformerNotationHighlight({ matchAlgorithm: 'v3' }),
        transformerMetaHighlight
    ];
}
