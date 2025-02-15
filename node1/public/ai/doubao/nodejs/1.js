const officegen = require('officegen');
const fs = require('fs');

// 创建Word文档对象
const docx = officegen('docx');

// 设置文档属性
docx.setDocTitle('2025年2月7日 周四 卖唱歌手停工学AI编程日记');

// 设置默认样式
const defaultStyle = {
    font_face: '微软雅黑',
    font_size: 12,
    line_spacing: 240 // 240=1.5倍行距
};

// 创建可写流
const output = fs.createWriteStream('2025年2月7日 周四 卖唱歌手停工学AI编程日记.docx');

// 正文内容
const pObj = docx.createP();
pObj.addText('🎵 2025年2月7日 周四 卖唱歌手停工学AI编程', {
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
    { text: '【停驻的决心】', style: { bold: true, font_size: 16, color: 'C00000' } },
    { text: '\n大抵是今日与往常不同了，往常这个时候，我必是背着那把旧吉他，穿梭在这城市的街头巷尾，用歌声换那碎银几两。可今日，那琴盒静静地立在墙角，似是被这时代的风遗忘了一般。我坐在这冰冷的电脑前，手指在键盘上摩挲，心中竟无半分犹豫。少挣了一天的钱，本应是件令人懊恼之事，可不知怎的，我竟有些高兴，仿佛看到了另一条崭新的路，在这科技的迷雾中隐隐浮现。' },

    { text: '\n\n【学习波折】', style: { bold: true, font_size: 16, color: 'C00000' } },
    { text: '\n原本我寄希望于那 DeepSeek 服务器，想着借此深入那 AI 编程的世界。可那服务器，仿佛是个任性的孩子，极不稳定，时而断连，时而卡顿，搅得我满心烦躁。无奈之下，我只好转向豆包编程，这豆包倒似个可靠的老友，为我铺开了一条清晰的学习之路，让我能在这编程的迷宫中，寻得一丝方向。' },

    { text: '\n\n【学习进展】', style: { bold: true, font_size: 16, color: 'C00000' } },
    { text: '\n借助豆包编程，我似是推开了一扇新的门。那些基础的编程语法和逻辑，如同一颗颗散落的珠子，在我的脑海中逐渐串成了线。我学会了用代码实现简单的功能，也懂得了如何调试和优化程序。虽只是初窥门径，却也让我满心欢喜。' },

    { text: '\n\n【技术挑战】', style: { bold: true, font_size: 16, color: 'C00000' } },
    { text: '\n这编程的世界，宛如一片荆棘丛生的丛林，每前进一步，都充满了挑战。那些复杂的编程概念和算法逻辑，就像隐藏在暗处的陷阱，稍不留意，便会让我的程序陷入崩溃。可我并不畏惧，我知道，每一次跌倒，都是成长的契机，每一次爬起，都离那光明更近一步。' },

    { text: '\n\n【明日展望】', style: { bold: true, font_size: 16, color: 'C00000' } },
    { text: '\n明日，我定要继续在这豆包编程的世界中探索，尝试用所学开发一个简单的音乐小程序。同时，我也盼着那 DeepSeek 服务器能恢复正常，让我能汲取更多的知识。我相信，只要我坚持不懈，定能在这 AI 编程的领域中，开垦出属于自己的一片天地。' },

    { text: '\n\n【心灵感悟】', style: { bold: true, font_size: 16, color: 'C00000' } },
    { text: '\n这 AI 时代，宛如一场突如其来的风暴，席卷了这世间的每一个角落。它打破了旧有的秩序，也带来了新的希望。我感谢这 AI 时代给我的激情，让我在这看似平凡的生活中，看到了明天的希望。音乐与编程，这看似毫不相干的两者，或许在未来的某一天，会碰撞出绚丽的火花，照亮我前行的路。' }
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
lastPage.addText('\n继续深入学习豆包编程并尝试开发音乐小程序\n\n', { italic: true });
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