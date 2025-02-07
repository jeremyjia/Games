const officegen = require('officegen');
const fs = require('fs');

// 创建 Word 文档
const docx = officegen('docx');

// 设置文档默认字体（可选）
docx.setDocTitle('多彩文档示例');
docx.setFont({
  name: '微软雅黑', // 中文字体建议使用系统自带字体
  size: 12
});

// ==================== 第一个段落 ====================
const p1 = docx.createP();
p1.addText('【健康生活小贴士】', {
  bold: true,
  color: '#2E86C1', // 深蓝色
  font_size: 16,
  font_face: '微软雅黑'
});
p1.addLineBreak();
p1.addText('每天保持适量的运动（如快走30分钟）、均衡饮食（推荐彩虹饮食法）、保证7-8小时睡眠。研究表明，良好的生活习惯可以降低慢性疾病风险。', {
  color: '#5D6D7E', // 深灰色
  italics: true
});

// ==================== 第二个段落 ====================
const p2 = docx.createP();
p2.addText('【高效工作技巧】', {
  bold: true,
  color: '#27AE60', // 绿色
  font_size: 16,
  font_face: '微软雅黑'
});
p2.addLineBreak();
p2.addText('使用番茄工作法（25分钟专注+5分钟休息），优先处理「重要不紧急」任务，每日结束前用10分钟做复盘。推荐工具：Trello、Notion。', {
  color: '#34495E', // 深蓝灰
  underline: true
});

// ==================== 第三个段落 ====================
const p3 = docx.createP();
p3.addText('【旅行必备清单】', {
  bold: true,
  color: '#E67E22', // 橙色
  font_size: 16,
  font_face: '微软雅黑'
});
p3.addLineBreak();
p3.addText('证件类：身份证/护照、信用卡；电子设备：充电宝、转换插头；应急物品：常用药品、紧急联系人卡片。建议使用收纳袋分类管理。', {
  color: '#7F8C8D', // 灰色
  highlight: 'yellow' // 黄色高亮
});

// ==================== 创建表格 ====================
const table = docx.createTable(4, 3); // 4行3列

// 表头样式
table.setTableStyle({
  borders: true,
  borderColor: '#AED6F1', // 浅蓝色边框
  borderSize: 2
});

// 表头行
table.getRow(0).setBgColor('#3498DB'); // 蓝色背景
table.getCell(0,0).addText('类别', { color: 'white', bold: true });
table.getCell(0,1).addText('推荐物品', { color: 'white', bold: true });
table.getCell(0,2).addText('注意事项', { color: 'white', bold: true });

// 表格数据（交替行颜色）
const data = [
  { category: '电子设备', items: '充电宝、耳机', tips: '注意航空公司容量限制' },
  { category: '衣物', items: '外套、舒适鞋', tips: '根据目的地气候选择' },
  { category: '证件', items: '护照/身份证', tips: '建议准备复印件' }
];

data.forEach((row, i) => {
  const rowIndex = i + 1;
  table.getRow(rowIndex).setBgColor(i % 2 === 0 ? '#EBF5FB' : '#FDFEFE'); // 交替浅蓝/白色
  table.getCell(rowIndex, 0).addText(row.category, { color: '#2C3E50' });
  table.getCell(rowIndex, 1).addText(row.items, { color: '#27AE60' });
  table.getCell(rowIndex, 2).addText(row.tips, { color: '#E74C3C' });
});

// ==================== 生成文件 ====================
const output = fs.createWriteStream('demo_output.docx');
docx.generate(output, {
  finalize: () => {
    console.log('✅ 文档已生成：demo_output.docx');
  },
  error: (err) => {
    console.error('❌ 生成失败:', err);
  }
});