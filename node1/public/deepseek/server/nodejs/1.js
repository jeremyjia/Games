const officegen = require('officegen');
const fs = require('fs');

// 创建Word文档对象
const docx = officegen('docx');

// 设置文档属性
docx.setDocTitle('AI学习日记');
//docx.setCreator('街头音乐人');

// 设置默认样式
const defaultStyle = {
  font_face: '微软雅黑',
  font_size: 12,
  line_spacing: 240 // 240=1.5倍行距
};
//docx.setStyle(defaultStyle);

// 创建可写流
const output = fs.createWriteStream('AI学习日记.docx');




// 正文内容
const pObj = docx.createP();
pObj.addText('🎵 AI编程学习日记 - 2024年X月X日', {
  bold: true,
  font_size: 22,
  color: '2A5CAA',
  align: 'center',
  shdType: 'clear',
  shdColor: 'FFFFFF'
});

docx.createP().addText(' '); // 空行

// 正文段落
const content = [
  { text: '【停驻的意义】', style: { bold: true, font_size: 16, color: 'C00000' } },
  { text: '\n往日此时，我应背着吉他穿梭于城市角落。但今天，琴盒安静地立在墙角，手指触碰的不再是琴弦，而是键盘。这个决定并非偶然——当街头艺术遇到AI时代，我选择用代码谱写新乐章。' },
  
  { text: '\n\n【学习轨迹】', style: { bold: true, font_size: 16, color: 'C00000' } },
  { text: '\n今日学习重点：\n' },
  { list: [
    'Node.js核心模块应用',
    'officegen文档生成原理',
    '自动化排版技术',
    'Markdown与Word格式转换'
  ], listType: 'numbered' },
  
  { text: '\n\n【技术突破】', style: { bold: true, font_size: 16, color: 'C00000' } },
  { text: '\n成功实现：\n' },
  { list: [
    '动态内容生成',
    '多级标题样式控制',
    '自动分页与页眉设置',
    '打印优化格式适配'
  ], listType: 'bullet' },
  
  { text: '\n\n【明日计划】', style: { bold: true, font_size: 16, color: 'C00000' } },
  { text: '\n1. 集成天气API自动生成演出建议\n2. 开发自动生成歌词文档系统\n3. 研究AI作曲与编程结合的可能性' },
  
  { text: '\n\n【心灵感悟】', style: { bold: true, font_size: 16, color: 'C00000' } },
  { text: '\n音乐与代码，看似南辕北辙，实则异曲同工。两者都需要：\n' },
  { list: [
    '节奏与逻辑的平衡',
    '创意与规范的融合',
    '重复练习中的即兴灵感',
    '与受众/用户的深度共鸣'
  ], listType: 'bullet' }
];

content.forEach(item => {
  if (item.list) {
    const p = docx.createListOfDots(item.list, { listType: item.listType });
    p.options = { indent: 400 }; // 缩进400twips（约0.7cm）
  } else {
    const p = docx.createP();
    p.addText(item.text, item.style || {});
  }
});

// 分页
//docx.createPageBreak();

// 封底
const lastPage = docx.createP();
lastPage.addText('🎸 明日预告：', { bold: true, font_size: 14 });
lastPage.addText('\n街头演出与AI预测系统结合实验\n\n', { italic: true });
lastPage.addText('打印说明：', { color: 'FF0000' });
lastPage.addText('\n本文档已优化打印设置，建议使用：\n- A4纸张\n- 双面打印\n- 默认边距', {
  font_face: 'Consolas',
  color: '666666'
});

// 错误处理
output.on('error', (err) => {
  console.log('生成失败:', err);
});

// 完成生成
docx.generate(output, {
  page: {
    orientation: 'portrait',
    margins: {
      top: 1440,    // 1英寸 ≈ 1440twips
      right: 1080,  // 0.75英寸
      bottom: 1440,
      left: 1080
    }
  }
}, () => {
  console.log('✅ 日记文档已生成！建议使用WPS或Office打开打印');
});