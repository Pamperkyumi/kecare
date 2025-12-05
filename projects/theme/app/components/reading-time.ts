
export type ReadingOptions = {
  wordsPerMinute?: number;      // baseline reading speed (WPM)
  round?: 'ceil' | 'floor' | 'round'; // how to round minutes
  imageSeconds?: number;        // extra seconds per image (if <img> detected)
  codeWordsMultiplier?: number; // weight multiplier for code words (default < 1 to slow down)
  minMinutes?: number;          // minimum minutes to display
};

export type ReadingResult = {
  words: number;
  timeSeconds: number;
  minutesFloat: number;
  minutes: number; // integer minutes after applying rounding strategy
  wordsPerMinute: number;
  images: number;
};

const DEFAULTS: Required<ReadingOptions> = {
  wordsPerMinute: 200,
  round: 'round',
  imageSeconds: 12,          // empirical: ~10-15s per image
  codeWordsMultiplier: 0.6,  // treat code as slower/harder to read by scaling its word count
  minMinutes: 0,
};

function stripHtmlKeepImg(html: string): { text: string; images: number } {
  if (!html) return { text: '', images: 0 };
  // Count <img ...> tags (including self-closing)
  const imgMatches = html.match(/<img\b[^>]*>/gi);
  const images = imgMatches ? imgMatches.length : 0;
  // Remove all tags and collapse whitespace to produce readable plain text
  const text = html.replace(/<\/?[^>]+(>|$)/g, ' ').replace(/\s+/g, ' ').trim();
  return { text, images };
}

/**
 * Count "words" in a Unicode-aware way.
 * Matches sequences of letters/digits or continuous CJK character runs.
 */
function countWords(text: string): number {
  if (!text) return 0;
  // Use Unicode-aware patterns: letters/numbers or Han/Hiragana/Katakana runs.
  const matches = text.match(/([\p{L}\p{N}]+|[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]+)/gu);
  return matches ? matches.length : 0;
}

export function estimateReadingTimeFromHtml(
  htmlOrText: string,
  opts?: ReadingOptions
): ReadingResult {
  const o = { ...DEFAULTS, ...opts };
  const { text, images } = stripHtmlKeepImg(htmlOrText);

  // Extract code regions to avoid double-counting and to apply a different weight.
  const codeRegex = /```[\s\S]*?```|<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>/gi;
  let codeWords = 0;
  let remainingText = text;
  const codeMatches = htmlOrText.match(codeRegex);
  if (codeMatches) {
    for (const cm of codeMatches) {
      // Remove HTML tags/backticks inside code block and count words
      const codeOnly = cm.replace(/<\/?[^>]+(>|$)/g, ' ').replace(/[`]/g, ' ');
      codeWords += countWords(codeOnly);
    }
    // Remove code sections from original HTML before recounting normal words
    const htmlWithoutCode = htmlOrText.replace(codeRegex, ' ');
    const stripped = stripHtmlKeepImg(htmlWithoutCode);
    remainingText = stripped.text;
    // Note: images counted above; stripping again preserves image count behavior.
  }

  const normalWords = countWords(remainingText);
  // Apply multiplier to code words and round effective words to integer
  const effectiveWords = Math.round(normalWords + codeWords * o.codeWordsMultiplier);

  // Compute seconds: convert WPM to words-per-second
  const wordsPerSecond = o.wordsPerMinute / 60;
  const secondsForWords = effectiveWords / wordsPerSecond;
  const secondsForImages = images * o.imageSeconds;
  const totalSeconds = Math.max(0, Math.round(secondsForWords + secondsForImages));

  const minutesFloat = totalSeconds / 60;
  let minutes: number;
  if (o.round === 'ceil') minutes = Math.ceil(minutesFloat);
  else if (o.round === 'floor') minutes = Math.floor(minutesFloat);
  else minutes = Math.round(minutesFloat);

  if (minutes < o.minMinutes) minutes = Math.max(0, Math.floor(o.minMinutes));

  return {
    words: effectiveWords,
    timeSeconds: totalSeconds,
    minutesFloat,
    minutes,
    wordsPerMinute: o.wordsPerMinute,
    images,
  };
}

export function estimateReadingTimeFromText(
  text: string,
  opts?: ReadingOptions
): ReadingResult {
  const o = { ...DEFAULTS, ...opts };
  const words = countWords(text || '');
  const secondsForWords = words / (o.wordsPerMinute / 60);
  const totalSeconds = Math.max(0, Math.round(secondsForWords));
  const minutesFloat = totalSeconds / 60;
  let minutes: number;
  if (o.round === 'ceil') minutes = Math.ceil(minutesFloat);
  else if (o.round === 'floor') minutes = Math.floor(minutesFloat);
  else minutes = Math.round(minutesFloat);

  if (minutes < o.minMinutes) minutes = Math.max(0, Math.floor(o.minMinutes));

  return {
    words,
    timeSeconds: totalSeconds,
    minutesFloat,
    minutes,
    wordsPerMinute: o.wordsPerMinute,
    images: 0,
  };
}

export function formatReadingTimeChinese(res: ReadingResult): string {
  if (res.minutes <= 0) {
    return '少于 1 分钟';
  }
  if (res.minutes === 1) {
    return '1 分钟';
  }
  return `约 ${res.minutes} 分钟`;
}
