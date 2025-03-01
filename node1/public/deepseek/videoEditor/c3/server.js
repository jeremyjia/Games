const express = require('express');
const { createCanvas } = require('canvas');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3005;

// 配置静态文件目录
app.use(express.static('public'));
app.use(express.json());

// 视频生成端点
app.post('/generate-video', async (req, res) => {
    try {
        const { scenes, fps } = req.body;
        const frameDir = path.join(__dirname, 'frames');
        
        // 创建临时帧目录
        if (!fs.existsSync(frameDir)) {
            fs.mkdirSync(frameDir);
        }

        // 生成每一帧
        for (let i = 0; i < scenes.length; i++) {
            const scene = scenes[i];
            const canvas = createCanvas(1280, 1080);
            const ctx = canvas.getContext('2d');
            
            // 绘制背景
            ctx.fillStyle = scene.background;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 绘制元素
            scene.elements.forEach(element => {
                ctx.fillStyle = element.color;
                ctx.strokeStyle = element.color;
                ctx.lineWidth = 2;

                switch (element.type) {
                    case 'circle':
                        ctx.beginPath();
                        ctx.arc(element.x, element.y, element.radius, 0, Math.PI * 2);
                        ctx.fill();
                        break;
                    case 'rectangle':
                        ctx.fillRect(element.x, element.y, element.width, element.height);
                        break;
                    case 'line':
                        ctx.beginPath();
                        ctx.moveTo(element.x1, element.y1);
                        ctx.lineTo(element.x2, element.y2);
                        ctx.stroke();
                        break;
                    case 'triangle':
                        ctx.beginPath();
                        ctx.moveTo(element.x1, element.y1);
                        ctx.lineTo(element.x2, element.y2);
                        ctx.lineTo(element.x3, element.y3);
                        ctx.closePath();
                        ctx.fill();
                        break;
                }
            });

            // 保存帧
            const out = fs.createWriteStream(path.join(frameDir, `frame-${i}.png`));
            const stream = canvas.createPNGStream();
            stream.pipe(out);
        }

        // 使用FFmpeg生成视频
        const outputPath = path.join(__dirname, 'public', 'output.mp4');
        await new Promise((resolve, reject) => {
            ffmpeg()
                .input(path.join(frameDir, 'frame-%d.png'))
                .inputFPS(fps)
                .outputOptions('-c:v libx264')
                .outputOptions('-pix_fmt yuv420p')
                .save(outputPath)
                .on('end', resolve)
                .on('error', reject);
        });

        // 清理临时帧
        fs.rmSync(frameDir, { recursive: true, force: true });

        res.json({ videoUrl: '/output.mp4' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating video');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});