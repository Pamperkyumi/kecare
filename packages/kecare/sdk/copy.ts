export async function onMountedCopy(articleElement: HTMLDivElement, title?: string, basePath: string = '/articles') {
    if (!articleElement) return;

    if (!title) return;

    const copyIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.25 5.25H7.25C6.14543 5.25 5.25 6.14543 5.25 7.25V14.25C5.25 15.3546 6.14543 16.25 7.25 16.25H14.25C15.3546 16.25 16.25 15.3546 16.25 14.25V7.25C16.25 6.14543 15.3546 5.25 14.25 5.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2.80103 11.998L1.77203 5.07397C1.61003 3.98097 2.36403 2.96397 3.45603 2.80197L10.38 1.77297C11.313 1.63397 12.19 2.16297 12.528 3.00097" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
    const successIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 4.5L6.75 12.75L3 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
    const errorIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;

    const existed = articleElement.querySelector('.kecare-copy-button');
    if (existed) existed.remove();

    const copyButton = document.createElement('button');
    copyButton.className = 'kecare-copy-button';
    copyButton.innerHTML = `${copyIcon}<span>复制 Markdown</span>`
    copyButton.type = 'button';
    copyButton.setAttribute('aria-label', '复制 Markdown');
    copyButton.title = '复制 Markdown';

    copyButton.addEventListener('click', async () => {
        try {
            const mdPath = `${basePath.replace(/\/$/, '')}/${encodeURIComponent(title!)}.md`;
            console.log('111', mdPath);
            const response = await fetch(mdPath);

            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.status}`);
            }

            const text = await response.text();

            await navigator.clipboard.writeText(text);
            copyButton.innerHTML = `${successIcon}<span>复制成功了喵</span>`;
            copyButton.classList.add('success');

            setTimeout(() => {
                copyButton.innerHTML = `${copyIcon}<span>复制 Markdown</span>`;
                copyButton.classList.remove('success');
            }, 2000);
        } catch {
            copyButton.innerHTML = `${errorIcon}<span>复制失败了喵</span>`;
            copyButton.classList.add('error');

            setTimeout(() => {
                copyButton.innerHTML = `${copyIcon}<span>复制 Markdown</span>`;
                copyButton.classList.remove('error');
            }, 2000);
        }
    });

    articleElement.appendChild(copyButton);
}

