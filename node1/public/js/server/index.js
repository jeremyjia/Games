const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs'); // 引入fs模块
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/generate-video', async (req, res) => {
    const tempVideoFile = `temp-${Date.now()}.mp4`;
    const outputFile = `output-${Date.now()}.mp4`;
    
    try {
        const { fps, audio, scenes } = req.body;

        // 第一阶段：生成无音频视频
        await new Promise((resolve, reject) => {
            let command = ffmpeg();
            
            scenes.forEach((scene) => {
                command.input(
                    `color=c=${scene.color.replace('#', '0x')}:s=640x480:d=${scene.duration}:r=${fps}`
                )
                .inputFormat('lavfi')
                .inputOptions(['-f lavfi']);
            });

            command.complexFilter([`concat=n=${scenes.length}:v=1:a=0`])
                .outputOptions(['-c:v libx264', '-pix_fmt yuv420p'])
                .save(tempVideoFile)
                .on('end', resolve)
                .on('error', (err) => {
                    // 清理临时文件
                    fs.unlinkSync(tempVideoFile);
                    reject(new Error(`场景合并失败: ${err.message}`));
                });
        });

        // 第二阶段：合并音频
        await new Promise((resolve, reject) => {
            ffmpeg(tempVideoFile)
                .input(audio)
                .outputOptions([
                    '-c:v copy',
                    '-c:a aac',
                    '-shortest',
                    '-movflags +faststart'
                ])
                .save(outputFile)
                .on('end', () => {
                    // 删除第一阶段临时文件
                    fs.unlinkSync(tempVideoFile);
                    resolve();
                })
                .on('error', (err) => {
                    // 清理所有文件
                    [tempVideoFile, outputFile].forEach(file => {
                        fs.existsSync(file) && fs.unlinkSync(file);
                    });
                    reject(new Error(`音频合成失败: ${err.message}`));
                });
        });

        // 发送文件并处理完成后的清理
        res.download(outputFile, (err) => {
            // 无论是否出错都执行清理
            [outputFile].forEach(file => {
                if (fs.existsSync(file)) {
                    fs.unlinkSync(file);
                }
            });
            // 处理请求中止错误
            if (err && !res.headersSent) {
                console.error('下载中断:', err.message);
                res.status(500).end();
            }
        });

    } catch (err) {
        // 异常时清理可能存在的文件
        [tempVideoFile, outputFile].forEach(file => {
            if (fs.existsSync(file)) {
                fs.unlinkSync(file);
            }
        });
        // 确保没有发送过响应
        if (!res.headersSent) {
            res.status(500).send(err.message);
        }
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('请确保已安装FFmpeg并配置环境变量');
});