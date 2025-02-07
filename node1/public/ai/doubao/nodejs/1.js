const officegen = require('officegen');

// 创建一个新的 Word 文档对象
const docx = officegen('docx');

// 监听错误事件
docx.on('error', function (err) {
    console.log(err);
});

// 定义小标题样式
const titleStyles = [
    { color: 'FF0000', font_face: 'Arial', font_size: 16 }, // 红色小标题
    { color: '00FF00', font_face: 'Arial', font_size: 16 }, // 绿色小标题
    { color: '0000FF', font_face: 'Arial', font_size: 16 }  // 蓝色小标题
];

// 定义段落内容
const paragraphs = [
    { title: '小标题1', content: '这是第一个段落的内容，描述了一些相关信息。' },
    { title: '小标题2', content: '这是第二个段落的内容，包含了更多的细节。' },
    { title: '小标题3', content: '这是第三个段落的内容，总结了前面的要点。' }
];

// 添加三个段落，每个段落有一个小标题
paragraphs.forEach((paragraph, index) => {
    const pObj = docx.createP();
    pObj.addText(paragraph.title, titleStyles[index]);
    pObj.addLineBreak();
    pObj.addText(paragraph.content);
    pObj.addLineBreak();
    pObj.addLineBreak();
});

// 创建一个表格
const table = [
    ['列1', '列2', '列3'],
    ['数据1', '数据2', '数据3'],
    ['数据4', '数据5', '数据6']
];

const tableStyle = {
    tableColWidth: 4261,
    tableSize: 24,
    tableColor: 'ada',
    tableAlign: 'left',
    tableFontFamily: 'Arial'
};

docx.createTable(table, tableStyle);

// 保存生成的 Word 文档
const fs = require('fs');
const out = fs.createWriteStream('example.docx');

out.on('close', function () {
    console.log('Word 文档已生成: example.docx');
});

docx.generate(out);