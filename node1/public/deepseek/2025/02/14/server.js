const express = require('express'); 
const { Document, Packer, Paragraph, TextRun, HeadingLevel, ImageRun } = require('docx');
const hljs = require('highlight.js'); // 新增代码高亮库
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('public'));
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
            return [
                new Paragraph({
                    heading: HeadingLevel.HEADING_2,
                    children: [
                        new TextRun({
                            text: item.title,
                            // ...原有文本样式
                        })
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: item.body,
                            // ...原有文本样式
                        })
                    ]
                })
            ];
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
                properties: {
                    page: {
                        margin: {
                            top: 1000,
                            right: 1000,
                            bottom: 1000,
                            left: 1000,
                        }
                    }
                },
                children: [
                    new Paragraph({
                        heading: HeadingLevel.TITLE,
                        children: [
                            new TextRun({
                                text: title,
                                bold: true,
                                color: "2E74B5",
                                size: 48,
                                font: "Arial"
                            })
                        ],
                        spacing: { after: 800 }
                    }),
                    ...paragraphs.flatMap(p => [
                        new Paragraph({
                            heading: HeadingLevel.HEADING_2,
                            children: [
                                new TextRun({
                                    text: p.title,
                                    bold: true,
                                    color: "2EAD4B",
                                    size: 28,
                                    font: "Calibri"
                                })
                            ],
                            spacing: { after: 400 }
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: p.body,
                                    color: "444444",
                                    size: 24,
                                    font: "Times New Roman"
                                })
                            ],
                            spacing: { after: 600 }
                        })
                    ]
                ),
                ...docChildren
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