export async function onMountedTabs(articleElement: HTMLDivElement) {
    const tabsElements = articleElement.querySelectorAll('[data-tabs]');

    for (const tabsElement of tabsElements) {
        const tabButtons = tabsElement.querySelectorAll('.md-tabs__tab');
        const tabPanels = tabsElement.querySelectorAll('.md-tabs__panel');

        // 为每个tab按钮添加点击事件监听器
        for (let i = 0; i < tabButtons.length; i++) {
            const tabButton = tabButtons[i] as HTMLButtonElement;
            if (!tabButton) continue;

            tabButton.addEventListener('click', () => {
                // 移除所有tab按钮的选中状态
                for (const button of tabButtons) {
                    (button as HTMLButtonElement).ariaSelected = 'false';
                    button.classList.remove('md-tabs__tab--active');
                }

                // 添加当前tab按钮的选中状态
                tabButton.ariaSelected = 'true';
                tabButton.classList.add('md-tabs__tab--active');

                // 隐藏所有tab面板
                for (const panel of tabPanels) {
                    (panel as HTMLElement).ariaHidden = 'true';
                    (panel as HTMLElement).setAttribute('hidden', '');
                }

                // 显示当前tab面板
                const currentPanel = tabPanels[i] as HTMLElement;
                if (currentPanel) {
                    currentPanel.ariaHidden = 'false';
                    currentPanel.removeAttribute('hidden');
                }
            });
        }
    }
}
