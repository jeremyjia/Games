const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');
const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

async function createSongList() {
    // 1. 获取文章内容（可能需要处理反爬机制）
    const url = 'https://mp.weixin.qq.com/s/gwNZXWQckTW29m7_HCxiPg';
    const html = await axios.get(url).then(res => res.data);
    
    // 2. 解析歌单内容（需根据实际HTML结构调整选择器）
    const $ = cheerio.load(html);
    const songs = [];
    console.log("xddbg:" +html);
    $('rich_media_content js_underline_content').each((i, el) => { // 请替换实际选择器
        console.log(songs);
        songs.push($(el).text().trim());
    });

    // 3. 创建美观的Word文档
    const doc = new Document({
        sections: [{
            properties: {
                page: {
                    margin: {
                        top: 1000,
                        right: 1000,
                        bottom: 1000,
                        left: 1000
                    }
                }
            },
            children: [
                new Paragraph({
                    heading: HeadingLevel.HEADING_1,
                    children: [new TextRun({
                        text: "演出歌单",
                        bold: true,
                        color: "2F5496",
                        size: 48
                    })],
                    alignment: "center"
                }),
                new Paragraph({ text: "" }), // 空行
                ...songs.map((song, index) => {
                    return new Paragraph({
                        children: [
                            new TextRun({
                                text: `${index + 1}. ${song}`,
                                size: 28,
                                color: "44546A",
                                font: "微软雅黑"
                            })
                        ],
                        spacing: { before: 200, after: 200 }
                    });
                })
            ]
        }]
    });

    // 4. 生成文件
    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync('s1.docx', buffer);
        console.log('歌单生成成功！');
    });
}

createSongList().catch(console.error);