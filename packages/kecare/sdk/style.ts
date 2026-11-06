export const __STYLE__ = `
.kecare h1 {
  font-size: 24px;
}

.kecare {
  position: relative;

.kecare-copy-button {
  position: absolute;
  top: -40px;
  right: 12px;
  padding: 6px;
  background: rgba(255, 255, 255, 0.92);
  color: #4fc3f7;
  border: 1px solid #ffd2dc;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 2;
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

.kecare-language-switcher {
  position: absolute;
  top: -40px;
  right: 180px;
  z-index: 2;
}

.kecare-language-switcher-button {
  padding: 6px;
  background: rgba(255, 255, 255, 0.92);
  color: #4fc3f7;
  border: 1px solid #ffd2dc;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.kecare-language-switcher-button:hover {
  background: #fff2f6;
}

.kecare-language-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid #ffd2dc;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  min-width: 100px;
}

.kecare-language-item {
  display: block;
  width: 100%;
  padding: 10px 16px;
  border: none;
  background: transparent;
  color: #2c3e50;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease;
}

.kecare-language-item:hover {
  background: rgba(79, 195, 247, 0.1);
}

.kecare-language-item {
  display: block;
  width: 100%;
  padding: 10px 16px;
  border: none;
  background: transparent;
  color: #2c3e50;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease;
  text-decoration: none;
}

.kecare-language-item:hover {
  background: rgba(79, 195, 247, 0.1);
}

.kecare-language-item.active {
  color: #4fc3f7;
  font-weight: 600;
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
/* 代码行号：基于 CSS 计数器，在每个 .line 前自动生成行号 */
pre.shiki code {
  counter-reset: line;
}

pre.shiki code .line {
  display: inline-block;
  width: 100%;
  margin: 0;
  padding: 0;
  /* 所有行统一加透明左边框，保证带边框标记的行（highlighted/focused）行号不错位 */
  border-left: 3px solid transparent;
  box-sizing: border-box;
}

pre.shiki code .line::before {
  counter-increment: line;
  content: counter(line);
  display: inline-block;
  width: 2em;
  margin-right: 1.5em;
  text-align: right;
  color: rgba(171, 178, 191, 0.4);
  /* 行号不可选中，避免用户复制代码时带上行号 */
  user-select: none;
}

pre.shiki.has-diff code .line.diff.remove {
  background-color: rgba(239,68,68,0.15);
}
pre.shiki.has-diff code .line.diff.remove::before {
  /* 合并行号与删除标记，覆盖默认的 content: counter(line) */
  content: counter(line) " -";
  color: rgba(239,68,68,0.8);
}
pre.shiki.has-diff code .line.diff.add {
  background-color: rgba(34,197,94,0.15);
}
pre.shiki.has-diff code .line.diff.add::before {
  /* 合并行号与新增标记，覆盖默认的 content: counter(line) */
  content: counter(line) " +";
  color: rgba(34,197,94,0.8);
}
  
/* 给高亮行添加背景色和字体颜色（左边框覆盖全局透明边框，行号不会错位） */
pre.shiki.has-highlighted code .line.highlighted {
  background-color: rgba(142, 150, 170, .14);
  border-left: 3px solid rgba(253, 253, 150, 0.7);
}

/* 使得高亮的行比其他行更醒目 */
pre.shiki.has-highlighted code .line.highlighted:hover {
  background-color: rgba(253, 253, 150, 0.5);
}

/* 默认状态：聚焦行清晰，其他行模糊 */
pre.shiki.has-focused code .line {
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

/* 代码模糊：与聚焦相反，被标记的行默认模糊 */
pre.shiki.has-blurred code .line.blurred {
  filter: blur(0.07rem);
  opacity: 0.35;
}

/* 鼠标悬停到模糊行时：显示该行内容 */
pre.shiki.has-blurred code .line.blurred:hover {
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
