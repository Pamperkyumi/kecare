const fs = require('fs/promises');
const path = require('path');

async function getReadmeContent() {
  try {
    const content = await fs.readFile(path.join(__dirname, 'README.md'), 'utf8');
    return content;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('README.md 文件不存在');
    } else {
      console.error('读取文件时出错:', error.message);
    }
    return null;
  }
}

// 使用示例
getReadmeContent().then((content) => {
  if (content) {
    console.log('文件内容:', content);
  }
});
