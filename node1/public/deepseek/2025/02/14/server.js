const express = require('express'); 
const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, ImageRun } = require('docx');
const hljs = require('highlight.js'); // 新增代码高亮库
const cors = require('cors');
const app = express();
const port = 3000;
// 添加在路由之前
const filesDir = path.join(__dirname, '');

app.use(cors()); 
app.use(express.static('public'));
app.use('/static', express.static('public')); // 添加新的静态文件路径

app.use(express.json());
// 代码段落样式配置
const codeStyle = {
       font: "Courier New",
       color: "2C3E50",
       size: 22,
       background: "F8F9FA",
       border: {
         color: "BDC3C7",
         space: 20,
         size: 4
       }
     };
// 添加新的路由
app.get('/get-files', (req, res) => {
    fs.readdir(filesDir, { withFileTypes: true }, (err, files) => {
        if (err) {
            return res.status(500).json({ error: '无法读取文件列表' });
        }
        
        const fileList = files.map(dirent => ({
            name: dirent.name,
            type: dirent.isDirectory() ? 'folder' : 'file',
            size: dirent.isFile() ? fs.statSync(path.join(filesDir, dirent.name)).size : 0,
            modified: fs.statSync(path.join(filesDir, dirent.name)).mtime
        }));
        
        res.json(fileList);
    });
});

app.use('/files', express.static(filesDir, {
    setHeaders: (res, filePath) => {
        res.setHeader('Content-Disposition', `attachment; filename=${path.basename(filePath)}`);
    }
}));
app.post('/generate-doc', async (req, res) => {
    try {
        const { title, paragraphs } = req.body;
        
        const docChildren = paragraphs.flatMap(item => { 
            if (item.type === 'code') {
                              const codeLines = item.content.split('\n').map(line => 
                                 new TextRun({
                                     text: line,
                                      break: 1
                                  })
                              );
                              
                              return [
                                  new Paragraph({
                                      heading: HeadingLevel.HEADING_3,
                                      text: `代码片段 (${item.language})`,
                                      spacing: { after: 200 }
                                  }),
                                  new Paragraph({
                                      children: codeLines,
                                      style: "Code",
                                      border: codeStyle.border,
                                      shading: {
                                          fill: codeStyle.background
                                      }
                                  })
                              ];
                          }

            if (item.type === 'image') {
                const base64Data = item.src.replace(/^data:image\/\w+;base64,/, "");
                const imageBuffer = Buffer.from(base64Data, 'base64');
                if (imageBuffer.length > 2 * 1024 * 1024) { // 2MB限制
                    throw new Error('图片大小不能超过2MB');
                }
                return [
                    new Paragraph({
                        children: [
                            new ImageRun({
                                data: imageBuffer,
                                transformation: {
                                    width: 500,
                                    height: 300
                                }
                            })
                        ],
                        alignment: "CENTER"
                    }),
                    new Paragraph({
                        text: item.caption || "图片描述",
                        alignment: "CENTER",
                        italics: true,
                        color: "666666"
                    })
                ];
            }
            if (item.type === 'text') {
                return [
                    new Paragraph({
                        heading: HeadingLevel.HEADING_2,
                        text: item.title,
                        spacing: { after: 200 }
                    }),
                    new Paragraph({
                        text: item.body,
                        spacing: { line: 300 }
                    })
                ];
            }
            return [];
        });

        const doc = new Document({
            styles: {
                              paragraphStyles: [{
                                  id: "Code",
                                  name: "Code Style",
                                  basedOn: "Normal",
                                  quickFormat: true,
                                  run: {
                                      font: codeStyle.font,
                                      color: codeStyle.color,
                                      size: codeStyle.size * 2
                                  }
                              }]
            },
            sections: [{
                                children: [
                                    new Paragraph({
                                        heading: HeadingLevel.TITLE,
                                        children: [/* 标题内容 */],
                                        spacing: { after: 800 }
                                    }),
                                    ...docChildren  // 只保留处理过的特殊内容
                                ]
            }]
        });

        const buffer = await Packer.toBuffer(doc);
        
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.setHeader('Content-Disposition', 'attachment; filename=generated-doc.docx');
        res.send(buffer);
    } catch (error) {
        console.error('生成错误:', error);
        res.status(500).json({ 
            error: '生成失败',
            message: error.message || '未知错误'
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});