// SVG 图标
const copyIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.25 5.25H7.25C6.14543 5.25 5.25 6.14543 5.25 7.25V14.25C5.25 15.3546 6.14543 16.25 7.25 16.25H14.25C15.3546 16.25 16.25 15.3546 16.25 14.25V7.25C16.25 6.14543 15.3546 5.25 14.25 5.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2.80103 11.998L1.77203 5.07397C1.61003 3.98097 2.36403 2.96397 3.45603 2.80197L10.38 1.77297C11.313 1.63397 12.19 2.16297 12.528 3.00097" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
const successIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 4.5L6.75 12.75L3 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
const errorIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;

// 创建代码复制按钮：点击复制代码内容，并显示成功/失败状态
export function createCodeCopyButton(code: string): HTMLButtonElement {
    const copyButton = document.createElement('button');
    copyButton.className = 'code-copy-button';
    copyButton.innerHTML = copyIcon;
    copyButton.type = 'button';

    // 复制功能
    copyButton.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(code);
            copyButton.innerHTML = successIcon;
            copyButton.classList.add('success');

            setTimeout(() => {
                copyButton.innerHTML = copyIcon;
                copyButton.classList.remove('success');
            }, 2000);
        } catch (err) {
            copyButton.innerHTML = errorIcon;
            copyButton.classList.add('error');

            setTimeout(() => {
                copyButton.innerHTML = copyIcon;
                copyButton.classList.remove('error');
            }, 2000);
        }
    });

    return copyButton;
}
