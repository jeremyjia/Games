const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');
const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

async function createSongList() {
    // 1. 获取并解析内容
    const url = 'https://mp.weixin.qq.com/s/gwNZXWQckTW29m7_HCxiPg';
    const html = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...' }
    }).then(res => res.data);

    const $ = cheerio.load(html);
    const songs = [];
    
    // 2. 改进后的解析逻辑
    $('#js_content p').each((i, el) => {
        let text = $(el).text()
            .trim()
            .replace(/\s+/g, ' ')  // 合并多余空格
            .replace(/^(\d+)\.\s*/, '') // 去除原有序号
            .replace(/~{3,}/g, '～'); // 统一符号

        // 过滤非歌曲行
        if (text && isValidSong(text)) {
            // 处理特殊格式
            text = text.replace(/（/g, '(').replace(/）/g, ')');
            songs.push(text);
        }
    });

    // 3. 专业排版逻辑
    const doc = new Document({
        sections: [{
            properties: {
                page: { margin: { top: 700, right: 700, bottom: 700, left: 700 } },
                column: { count: 2, space: 720 }
            },
            children: [
                createHeader(),
                ...songs.map((song, index) => createSongItem(song, index))
            ]
        }]
    });

    // 生成文件
    Packer.toBuffer(doc).then(buffer => {
        fs.writeFileSync('s4.docx', buffer);
        console.log('纯净版歌单生成成功！');
    });
}

// 辅助函数：创建标题
function createHeader() {
    return new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({
            text: "🎸 专业演出歌单 🎤",
            bold: true,
            color: "2F5496",
            size: 40
        })],
        alignment: "center",
        spacing: { after: 400 }
    });
}

// 辅助函数：创建歌曲条目
function createSongItem(song, index) {
    const isOriginal = song.includes("原创");
    const isEnglish = song.includes("英文");
    
    return new Paragraph({
        children: [
            new TextRun({
                text: `${index + 1}. ${cleanSongText(song)}`,
                size: 24,
                color: isOriginal ? "AB1942" : 
                      isEnglish ? "3DA742" : "44546A",
                bold: isOriginal,
                font: "微软雅黑",
                shading: { fill: index % 2 === 0 ? "D9E2F3" : "FFFFFF" }
            })
        ],
        spacing: { line: 350 },
        indent: { left: 200 }
    });
}

// 辅助函数：清洗文本
function cleanSongText(text) {
    return text
        .replace(/^(\d+\.)/, '')  // 确保去除残留序号
        .replace(/\s{2,}/g, ' ')   // 压缩多余空格
        .replace(/^～/, '')        // 去除开头特殊符号
        .trim();
}

// 辅助函数：验证有效歌曲
function isValidSong(text) {
    const invalidKeywords = [
        '点歌单', '点击', '简谱', 'WED', 
        'mp.weixin.qq.com', 'style'
    ];
    return text.length > 3 && 
           !invalidKeywords.some(kw => text.includes(kw));
}

createSongList().catch(console.error);