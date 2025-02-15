const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');
const fs = require('fs');

// 示例数据 - 请替换为实际歌单
const songs = [
    "《成都》 - 赵雷",
    "《海阔天空》 - Beyond",
    "《Hotel California》 - Eagles",
    // ...添加更多歌曲
];

function createSongList() {
    const doc = new Document({
        sections: [{
            properties: {
                page: {
                    margin: { top: 700, right: 700, bottom: 700, left: 700 },
                    pageNumbers: { start: 1 }
                },
                column: { count: 2, space: 720 } // 分两栏排版
            },
            children: [
                new Paragraph({
                    heading: HeadingLevel.HEADING_1,
                    children: [new TextRun({
                        text: "🎤 演出歌单 🎸",
                        bold: true,
                        color: "2F5496",
                        size: 40
                    })],
                    alignment: "center",
                    spacing: { after: 600 }
                }),
                ...songs.map((song, index) => {
                    return new Paragraph({
                        children: [
                            new TextRun({
                                text: `${index + 1}. ${song}`,
                                size: 24,
                                color: "44546A",
                                font: "微软雅黑",
                                shading: { fill: index % 2 === 0 ? "D9E2F3" : "FFFFFF" }
                            })
                        ],
                        spacing: { line: 350 },
                        indent: { left: 200 }
                    });
                })
            ]
        }]
    });

    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync('SongList.docx', buffer);
        console.log('专业歌单生成成功！');
    });
}

createSongList();