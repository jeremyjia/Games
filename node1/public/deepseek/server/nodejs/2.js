const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

// 创建一个画布
const canvas = createCanvas(800, 600);
const ctx = canvas.getContext('2d');

// 设置背景颜色
ctx.fillStyle = '#87CEEB'; // 天蓝色
ctx.fillRect(0, 0, 800, 600);

// 画一个太阳
ctx.beginPath();
ctx.arc(700, 100, 50, 0, Math.PI * 2, true); // 太阳
ctx.fillStyle = '#FFD700'; // 金色
ctx.fill();

// 画一片草地
ctx.fillStyle = '#32CD32'; // 绿色
ctx.fillRect(0, 400, 800, 200);

// 画一个简单的房子
ctx.fillStyle = '#8B4513'; // 棕色
ctx.fillRect(300, 300, 200, 200); // 房子主体
ctx.fillStyle = '#A52A2A'; // 深棕色
ctx.beginPath();
ctx.moveTo(300, 300);
ctx.lineTo(400, 200);
ctx.lineTo(500, 300);
ctx.closePath();
ctx.fill(); // 屋顶

// 画一个门
ctx.fillStyle = '#654321'; // 深棕色
ctx.fillRect(380, 400, 40, 100); // 门

// 画一个窗户
ctx.fillStyle = '#ADD8E6'; // 浅蓝色
ctx.fillRect(330, 350, 50, 50); // 窗户

// 保存图像
const out = fs.createWriteStream(__dirname + '/comic.png');
const stream = canvas.createPNGStream();
stream.pipe(out);
out.on('finish', () => console.log('漫画已保存为comic.png'));