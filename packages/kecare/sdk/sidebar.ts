export async function onMountedSidebar(articleElement: HTMLDivElement) {
    const articleSidebarElement = document.querySelector('.kecare-sidebar');
    if (!articleSidebarElement) return; // 主题开发者如果没有在主题里添加侧边栏元素，则不执行侧边栏相关逻辑

    const headings = articleElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const headingHierarchy: Array<{ level: number; element: HTMLElement; children: typeof headingHierarchy }> = [];

    const stack: typeof headingHierarchy = [];
    for (let i = 0; i < headings.length; i++) {
        const heading = headings[i]!;
        const level = parseInt(heading.tagName[1]!);
        const node = { level, element: heading as HTMLElement, children: [] };

        // 找到正确的父节点
        while (stack.length > 0 && stack[stack.length - 1]!.level >= level) {
            stack.pop();
        }

        if (stack.length > 0) stack[stack.length - 1]!.children.push(node);
        else headingHierarchy.push(node);

        stack.push(node);
    }

    function buildTOC(nodes: typeof headingHierarchy, isSub = false): string {
        let result = '';
        for (const node of nodes) {
            const element = node.element;
            const id = element.id || '';
            const text = element.textContent || '';
            const linkClass = isSub ? 'toc-sublink' : 'toc-link';

            result += `<li class="${isSub ? 'toc-subitem' : 'toc-item'}">`;
            result += `<a class="${linkClass}" data-target="${id}" title="${text}">${text}</a>`;

            if (node.children.length > 0) {
                result += `<ul class="toc-sublist">`;
                result += buildTOC(node.children, true);
                result += `</ul>`;
            }

            result += `</li>`;
        }
        return result;
    }

    const tocHtml = `<ul class="toc-list">${buildTOC(headingHierarchy)}</ul>`;
    articleSidebarElement.innerHTML = tocHtml;

    // 注册点击事件
    const links = articleSidebarElement.querySelectorAll('a.toc-link, a.toc-sublink');
    for (let i = 0; i < links.length; i++) {
        const link = links[i] as HTMLAnchorElement;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.dataset.target;
            if (!targetId) return;
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

}