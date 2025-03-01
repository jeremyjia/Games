const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');
const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

async function createSongList() {
    // 1. 获取文章内容
    const url = 'https://mp.weixin.qq.com/s/gwNZXWQckTW29m7_HCxiPg';
    const html = await axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    }).then(res => res.data);

    // 2. 解析歌单内容
    const $ = cheerio.load(html);
    const songs = [];
    
    // 正确选择器定位到内容区域
    const contentDiv = $('#js_content');
    
    // 遍历所有<p>标签
    contentDiv.find('p').each((i, el) => {
        const $el = $(el);
        // 移除内部链接标签
        $el.find('a').remove();
        const text = $el.text().trim();
        
        // 过滤空行和非歌曲行
        if (text && !text.includes("mp.weixin.qq.com") && !text.includes("点击")) {
            // 处理特殊序号（如33号）
            const cleanText = text.replace(/^(\d+\.)/, (_, num) => `${num} `);
            songs.push(cleanText);
        }
    });

    // 3. 创建专业排版文档
    const doc = new Document({
        sections: [{
            properties: {
                page: {
                    margin: { top: 700, right: 700, bottom: 700, left: 700 },
                    pageNumbers: { start: 1 }
                },
                column: { count: 2, space: 720 } // 双栏排版
            },
            children: [
                new Paragraph({
                    heading: HeadingLevel.HEADING_1,
                    children: [new TextRun({
                        text: "🎤 专业演出歌单 🎸",
                        bold: true,
                        color: "2F5496",
                        size: 40
                    })],
                    alignment: "center",
                    spacing: { after: 600 }
                }),
                ...songs.map((song, index) => {
                    // 识别特殊颜色标记
                    const isOriginal = song.includes("原创");
                    const isEnglish = song.includes("英文");
                    
                    return new Paragraph({
                        children: [
                            new TextRun({
                                text: `${index + 1}. ${song}`,
                                size: 24,
                                color: isOriginal ? "AB1942" : 
                                      isEnglish ? "3DA742" : "44546A",
                                bold: isOriginal,
                                font: "微软雅黑",
                                shading: { 
                                    fill: index % 2 === 0 ? "D9E2F3" : "FFFFFF" 
                                }
                            })
                        ],
                        spacing: { line: 350 },
                        indent: { left: 200 }
                    });
                })
            ]
        }]
    });

    // 4. 生成文件
    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync('s3.docx', buffer);
        console.log('专业歌单生成成功！');
    });
}

createSongList().catch(console.error);