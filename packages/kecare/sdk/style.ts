export const __STYLE__ = `
.kecare h1 {
  font-size: 24px;
}

.kecare {
  position: relative;
}

.kecare-copy-button {
  position: absolute;
  top: -42px;
  right: 12px;
  padding: 6px;
  background: rgba(255, 255, 255, 0.92);
  color: #ff6b93;
  border: 1px solid #ffd2dc;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 11;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.kecare-copy-button:hover {
  background: #fff2f6;
}

.kecare-copy-button.success {
  background: rgba(82, 196, 26, 0.12);
  color: #2f9e44;
  border-color: rgba(47, 158, 68, 0.35);
}

.kecare-copy-button.error {
  background: rgba(245, 108, 108, 0.12);
  color: #e03131;
  border-color: rgba(224, 49, 49, 0.35);
}

.code-copy-button {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 6px;
  background-color: rgb(40, 44, 52);
  color: #abb2bf;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.code-copy-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
}

.code-copy-button.success {
  background-color: rgba(82, 196, 26, 0.8);
  color: #ffffff;
  border-color: rgba(82, 196, 26, 0.8);
}

.code-copy-button.error {
  background-color: rgba(245, 108, 108, 0.8);
  color: #ffffff;
}
.md-tabs {
  --tabs-border: rgba(169, 169, 169, 0.2);
  --tabs-bg: rgba(255, 255, 255, 0.7);
  --tabs-text: #666;
  --tabs-text-active: #2c3e50;
  --tabs-accent: #ff6b93;
  border: 1px solid var(--tabs-border);
  border-radius: 16px;
  overflow: hidden;
  margin: 16px 0;
  background: var(--tabs-bg);
  backdrop-filter: blur(10px) saturate(150%);
  -webkit-backdrop-filter: blur(10px) saturate(150%);
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.md-tabs__nav {
  display: flex;
  gap: 20px;
  align-items: flex-end;
  padding: 0 12px;
  background: rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid var(--tabs-border);
  height: 49px;
}

.md-tabs__tab {

  position: relative;
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--tabs-text);
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  padding: 12px 14px;
  cursor: pointer;
  transition: color 0.2s ease;
}

.md-tabs__tab:hover {
  color: var(--tabs-text-active);
}

.md-tabs__tab[aria-selected="true"] {
  color: var(--tabs-text-active);
  background: rgba(255, 255, 255, 0.65);
  border-radius: 10px 10px 0 0;
}

.md-tabs__tab[aria-selected="true"]::after {
  content: "";
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: -1px;
  height: 2px;
  border-radius: 999px;
  background: var(--tabs-accent);
}

.md-tabs__panels {
   background: rgba(255, 255, 255, 0.7);
   backdrop-filter: blur(10px) saturate(150%);
   -webkit-backdrop-filter: blur(10px) saturate(150%);
}

.md-tabs__panel {
  margin: 0;
  padding: 14px 16px;
  font-size: 1rem;
  line-height: 1.8;
  color: #2c3e50;
}

.md-tabs__panel[hidden] {
  display: none;
}

.md-tabs__panel p {
  margin: 1em 0;
  font-size: 1rem;
  line-height: 1.8;
}

.md-tabs__panel > p:first-child {
  margin-top: 0;
}

.md-tabs__panel > p:last-child {
  margin-bottom: 0;
}

.md-tabs__panel pre {
  margin: 0;
  border-radius: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 13px;
  line-height: 1.6;
}

.md-tabs__panel pre code {
  font-family: inherit;
}
pre.shiki.has-diff code .line {
  display: inline-block;
  width: 100%;
  margin: 0;
  padding: 0;
}

pre.shiki.has-diff code .line.diff.remove {
  background-color: rgba(239,68,68,0.15);
}
pre.shiki.has-diff code .line.diff.remove::before {
  content: '-';
  font-size: 1em;
  color: rgba(239,68,68,0.8);
  margin-right: 1em;
}
pre.shiki.has-diff code .line.diff.add {
  background-color: rgba(34,197,94,0.15);
}
pre.shiki.has-diff code .line.diff.add::before {
  content: '+';
  font-size: 1em;
  color: rgba(34,197,94,0.8);
  margin-right: 1em;
}
  
/* 给高亮行添加背景色和字体颜色 */
pre.shiki.has-highlighted code .line.highlighted {
  display: inline-block;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: rgba(142, 150, 170, .14);
  border-left: 3px solid rgba(253, 253, 150, 0.7);
}

/* 使得高亮的行比其他行更醒目 */
pre.shiki.has-highlighted code .line.highlighted:hover {
  background-color: rgba(253, 253, 150, 0.5);
}

/* 默认状态：聚焦行清晰，其他行模糊 */
pre.shiki.has-focused code .line {
  display: inline-block;
  width: 100%;
  margin: 0;
  padding: 0;
  filter: blur(0.07rem);
  opacity: 0.35;
}

/* 聚焦行：保持清晰显示 */
pre.shiki.has-focused code .line.focused {
  filter: none;
  opacity: 1; 
  background-color: rgba(66, 153, 225, 0.12);
  border-left: 3px solid rgba(66, 153, 225, 0.6);
}

/* 鼠标悬停时：取消所有行的模糊效果 */
pre.shiki.has-focused code:hover .line {
  filter: none; 
  opacity: 1;
}

/* 鼠标悬停时，聚焦行样式仍然有效 */
pre.shiki.has-focused code .line.focused:hover {
  background-color: rgba(66, 153, 225, 0.22);
}

/* 鼠标悬停时，非聚焦行也会变清晰 */
pre.shiki.has-focused code .line:not(.focused):hover {
  filter: none;
  opacity: 1;
}


`; // 这里放你需要在用户那边加载的编辑器区域的样式

export async function style() {
    // 创建 style 标签并添加到 head
    const styleElement = document.createElement('style');
    styleElement.textContent = __STYLE__;
    document.head.appendChild(styleElement);
}
