export function isValidDateString(dateString: string): boolean {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return false;


    const [year, month, day] = dateString.split('-')
    const yearInt = Number(year);
    const monthInt = Number(month);
    const dayInt = Number(day);

    if (monthInt < 1 || monthInt > 12) return false;
    if (dayInt < 1 || dayInt > 31) return false;

    const date = new Date(Date.UTC(yearInt, monthInt - 1, dayInt));

    return (
        date.getUTCFullYear() === yearInt &&
        date.getUTCMonth() + 1 === monthInt &&
        date.getUTCDate() === dayInt
    );
}

export function parseDateString(dateString: string): Date {
    if (!isValidDateString(dateString)) throw new Error(`[front-matter] date 格式错误: "${dateString}"，请使用 YYYY-MM-DD，例如 2026-05-20 这个是必填项必填项必填项！每篇文章都需要有！！！！！`);
    const [year, month, day] = dateString.split('-');
    const yearInt = Number(year);
    const monthInt = Number(month);
    const dayInt = Number(day);
    return new Date(Date.UTC(yearInt, monthInt - 1, dayInt));
}