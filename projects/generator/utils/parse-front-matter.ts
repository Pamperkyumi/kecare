export function parseFrontMatter(rawFrontMatter: string): string {
    const chars: string[] = [];
    let i = 0;

    while (i < rawFrontMatter.length) {
        const char = rawFrontMatter[i];
        if (char === ' ' || char === '\n' || char === '\r' || char === '\t') {
            i++;
        } else {
            break;
        }
    }

    if (rawFrontMatter[i] !== '-' || rawFrontMatter[i + 1] !== '-' || rawFrontMatter[i + 2] !== '-') {
        return '';
    }
    i += 3;

    if (rawFrontMatter[i] === '\r') i++;
    if (rawFrontMatter[i] === '\n') i++;

    while (i < rawFrontMatter.length) {
        if (rawFrontMatter[i] === '\n' || rawFrontMatter[i] === '\r') {
            if (rawFrontMatter[i] === '\r') i++;
            if (rawFrontMatter[i] === '\n') i++;

            if (rawFrontMatter[i] === '-' && rawFrontMatter[i + 1] === '-' && rawFrontMatter[i + 2] === '-') {
                i += 3;
                if (rawFrontMatter[i] === '\r') i++;
                if (rawFrontMatter[i] === '\n' || i >= rawFrontMatter.length) {
                    return chars.join('');
                }
            }
            chars.push('\n');
        } else {
            chars.push(rawFrontMatter[i]!);
            i++;
        }
    }

    return chars.join('');
}
