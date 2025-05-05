const express = require('express');
const { createCanvas } = require('canvas');
const cors = require('cors');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const tmp = require('tmp-promise');
const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');

ffmpeg.setFfmpegPath(ffmpegPath);

class C4GithubClient {
    constructor() {
        // 初始化 GitHub API 的基础 URL
        this.baseUrl = 'https://api.github.com';
    }

    async getIssueBody(owner, repo, issueNumber) {
        try {
            // 构建请求的 URL
            const url = `${this.baseUrl}/repos/${owner}/${repo}/issues/${issueNumber}`;
            // 发送 GET 请求
            const response = await axios.get(url);
            // 返回问题的正文内容
            return response.data.body;
        } catch (error) {
            // 处理请求错误
            console.error(`获取 GitHub 问题详情失败:`, error.message);
            return null;
        }
    }
}

class C4VideoClient {
    async createVideo1(publicDir) {
        const width = 640;
        const height = 480;
        const duration = 60; // 1 分钟
        const fps = 25;
        const frames = duration * fps;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const clockRadius = Math.min(width, height) / 2 * 0.8;
        const centerX = width / 2;
        const centerY = height / 2;

        const tempFramesDir = path.join(publicDir, 'temp_frames');
        await fs.ensureDir(tempFramesDir);

        for (let i = 0; i < frames; i++) {
            const currentTime = new Date();
            const seconds = currentTime.getSeconds() + i / fps;
            const minutes = currentTime.getMinutes() + seconds / 60;
            const hours = currentTime.getHours() % 12 + minutes / 60;

            // 清除画布
            ctx.clearRect(0, 0, width, height);

            // 绘制表盘
            ctx.beginPath();
            ctx.arc(centerX, centerY, clockRadius, 0, 2 * Math.PI);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 4;
            ctx.stroke();

            // 绘制刻度
            for (let j = 0; j < 60; j++) {
                ctx.save();
                ctx.translate(centerX, centerY);
                ctx.rotate(j * Math.PI / 30);
                ctx.beginPath();
                ctx.moveTo(0, -clockRadius * 0.9);
                ctx.lineTo(0, -clockRadius * 0.95);
                ctx.lineWidth = j % 5 === 0 ? 4 : 2;
                ctx.stroke();
                ctx.restore();
            }

            // 绘制时针
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(
                centerX + clockRadius * 0.5 * Math.sin(hours * (Math.PI / 6)),
                centerY - clockRadius * 0.5 * Math.cos(hours * (Math.PI / 6))
            );
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 6;
            ctx.stroke();

            // 绘制分针
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(
                centerX + clockRadius * 0.7 * Math.sin(minutes * (Math.PI / 30)),
                centerY - clockRadius * 0.7 * Math.cos(minutes * (Math.PI / 30))
            );
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 4;
            ctx.stroke();

            // 绘制秒针
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(
                centerX + clockRadius * 0.8 * Math.sin(seconds * (Math.PI / 30)),
                centerY - clockRadius * 0.8 * Math.cos(seconds * (Math.PI / 30))
            );
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.stroke();

            // 保存当前帧
            const frameFilePath = path.join(tempFramesDir, `frame_${i.toString().padStart(5, '0')}.png`);
            const out = fs.createWriteStream(frameFilePath);
            const stream = canvas.createPNGStream();
            stream.pipe(out);
            await new Promise((resolve, reject) => {
                out.on('finish', resolve);
                out.on('error', reject);
            });
        }

        const outputPath = path.join(publicDir, 'video1.mp4');
        return new Promise((resolve, reject) => {
            ffmpeg()
               .input(path.join(tempFramesDir, 'frame_%05d.png'))
               .inputOptions([
                    `-framerate ${fps}`
                ])
               .videoCodec('libx264')
               .outputOptions([
                    '-pix_fmt yuv420p',
                    '-vf scale=640:480'
                ])
               .output(outputPath)
               .on('end', async () => {
                    console.log(`Video1 created at ${outputPath}`);
                    await fs.remove(tempFramesDir);
                    resolve(outputPath);
                })
               .on('error', (err) => {
                    console.error('Video1 creation failed:', err);
                    reject(err);
                })
               .run();
        });
    }
}

const ghc = new C4GithubClient();
const vc = new C4VideoClient();
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '50mb' }));
// 确保 public 目录存在
const publicDir = path.join(__dirname, 'public');
fs.ensureDirSync(publicDir);

// 配置日志写入器
const logPath = path.join(publicDir, 'log.txt');
let logInterval;

async function writeLog() {
    const timestamp = new Date().toISOString();
    let logContent = `${timestamp}\n`;
    const issueBody = await ghc.getIssueBody("littleflute", "s177", 1);
    if (issueBody) {
        logContent += `${issueBody}\n`;
    }

    try {
        // 读取原有日志内容
        const existingLog = await fs.readFile(logPath, 'utf8');
        // 将新日志内容添加到原有内容前面
        logContent += existingLog;
    } catch (error) {
        if (error.code !== 'ENOENT') {
            console.error('读取日志文件失败:', error);
        }
    }

    // 将更新后的内容写回文件
    await fs.writeFile(logPath, logContent);
}

// 图形绘制函数
function drawShape(ctx, obj) {
    console.log(`Drawing ${obj.type} with color ${obj.color}`);
    ctx.strokeStyle = obj.color || '#000000';
    ctx.fillStyle = obj.color || '#000000';
    ctx.lineWidth = 2;

    switch (obj.type) {
        case 'Line':
            ctx.beginPath();
            ctx.moveTo(obj.startX, obj.startY);
            ctx.lineTo(obj.endX, obj.endY);
            ctx.stroke();
            break;
        case 'Rect':
            ctx.beginPath();
            ctx.rect(
                obj.startX,
                obj.startY,
                obj.endX - obj.startX,
                obj.endY - obj.startY
            );
            ctx.fill();
            ctx.stroke();
            break;
    }
}

// 生成场景图片
async function generateSceneImage(scene, width, height, tempDir) {
    console.log(`Starting image generation for scene ${scene.id}`);
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // 绘制背景
    ctx.fillStyle = scene.color;
    ctx.fillRect(0, 0, width, height);

    // 绘制图形
    console.log(`Drawing ${scene.drawingObjs.length} objects for scene ${scene.id}`);
    scene.drawingObjs.forEach(obj => drawShape(ctx, obj));

    const filePath = path.join(tempDir, `scene-${scene.uuid}.png`);
    const out = fs.createWriteStream(filePath);
    const stream = canvas.createPNGStream();
    stream.pipe(out);

    return new Promise((resolve, reject) => {
        out.on('finish', () => {
            console.log(`Scene image generated at ${filePath}`);
            resolve(filePath);
        });
        out.on('error', reject);
    });
}

// 创建场景视频片段
async function createSceneClip(scene, pngPath, duration, fps, tempDir) {
    console.log(`Creating video clip for scene ${scene.id} (${duration}s)`);
    const outputPath = path.join(tempDir, `clip-${scene.uuid}.mp4`);

    return new Promise((resolve, reject) => {
        ffmpeg()
           .input(pngPath)
           .inputOptions([
                '-loop 1',
                `-t ${duration}`
            ])
           .fps(fps)
           .videoCodec('libx264')
           .outputOptions([
                '-pix_fmt yuv420p',
                '-vf scale=640:480'
            ])
           .output(outputPath)
           .on('end', () => {
                console.log(`Video clip created at ${outputPath}`);
                resolve(outputPath);
            })
           .on('error', (err) => {
                console.error(`Clip creation failed for scene ${scene.id}:`, err);
                reject(err);
            })
           .run();
    });
}

// 合并视频片段
async function mergeClips(clipPaths, tempDir) {
    console.log(`Merging ${clipPaths.length} video clips`);
    const listPath = path.join(tempDir, 'list.txt');
    await fs.writeFile(listPath, clipPaths.map(p => `file '${p}'`).join('\n'));
    console.log(`Created merge list at ${listPath}`);

    const outputPath = path.join(tempDir, 'merged.mp4');

    return new Promise((resolve, reject) => {
        ffmpeg()
           .input(listPath)
           .inputOptions(['-f concat', '-safe 0'])
           .outputOptions(['-c copy'])
           .output(outputPath)
           .on('end', () => {
                console.log(`Clips merged successfully at ${outputPath}`);
                resolve(outputPath);
            })
           .on('error', (err) => {
                console.error('Clip merging failed:', err);
                reject(err);
            })
           .run();
    });
}

// 添加音频到视频
async function addAudio(videoPath, audioPath, outputPath) {
    console.log(`Adding audio from ${audioPath} to video`);
    return new Promise((resolve, reject) => {
        ffmpeg()
           .input(videoPath)
           .input(audioPath)
           .outputOptions([
                '-c:v copy',
                '-c:a aac',
                '-shortest',
                '-map 0:v:0',
                '-map 1:a:0'
            ])
           .output(outputPath)
           .on('end', () => {
                console.log(`Final video with audio created at ${outputPath}`);
                resolve(outputPath);
            })
           .on('error', (err) => {
                console.error('Audio mixing failed:', err);
                reject(err);
            })
           .run();
    });
}

// 主处理路由
app.post('/generate_video', async (req, res) => {
    console.log('\n=== Received video generation request ===');
    let tempDir;
    try {
        const { fps, audio, scenes, width = 640, height = 480 } = req.body;
        console.log(`Request details:
- FPS: ${fps}
- Scenes: ${scenes.length}
- Resolution: ${width}x${height}
- Audio URL: ${audio}`);

        // 创建临时目录
        const dir = await tmp.dir();
        tempDir = dir.path;
        console.log(`\nCreated temporary directory at ${tempDir}`);

        // 下载音频文件
        console.log(`\nStarting audio download from ${audio}`);
        const audioPath = path.join(tempDir, 'audio.mp3');
        const audioResponse = await axios({
            url: audio,
            responseType: 'stream',
        });
        await new Promise((resolve, reject) => {
            audioResponse.data.pipe(fs.createWriteStream(audioPath))
               .on('finish', () => {
                    console.log(`Audio downloaded to ${audioPath} (${fs.statSync(audioPath).size} bytes)`);
                    resolve();
                })
               .on('error', reject);
        });

        // 处理所有场景
        console.log(`\nProcessing ${scenes.length} scenes`);
        console.log(`\nProcessing ${scenes} ` + JSON.stringify(scenes));


        const clipPaths = [];
        for (const [index, scene] of scenes.entries()) {
            console.log(`\nProcessing scene ${index + 1}/${scenes.length} (ID: ${scene.id})`);

            console.log(`Generating image for scene ${scene.id}`);
            const pngPath = await generateSceneImage(scene, width, height, tempDir);

            console.log(`Creating video clip for scene ${scene.id}`);
            const clipPath = await createSceneClip(scene, pngPath, scene.duration, fps, tempDir);
            clipPaths.push(clipPath);
        }

        // 合并视频
        console.log(`\nMerging all video clips`);
        const mergedPath = await mergeClips(clipPaths, tempDir);

        // 添加音频
        console.log(`\nAdding audio track`);
        const outputPath = path.join(tempDir, 'final.mp4');
        await addAudio(mergedPath, audioPath, outputPath);

        // 发送结果
        console.log(`\nSending video to client`);
        res.download(outputPath, 'video-output.mp4', async (err) => {
            console.log('\nCleaning up temporary files');
            await dir.cleanup();
            if (err) {
                console.error('Download failed:', err);
                res.status(500).send('Video delivery failed');
            }
        });

    } catch (error) {
        console.error('\n!!! Processing Error !!!');
        console.error(error.stack);
        if (tempDir) {
            console.log(`Cleaning up temporary directory ${tempDir}`);
            await fs.remove(tempDir);
        }
        res.status(500).json({
            error: 'Video generation failed',
            message: error.message
        });
    }
});

// 新增路由，用于显示当前时间的网页
app.get('/timePage', async (req, res) => {
    const currentTime = new Date().toLocaleTimeString();
    const videoPath = await vc.createVideo1(publicDir);
    const relativeVideoPath = path.relative(publicDir, videoPath);
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Current Time</title>
</head>
<body>
    <h1>当前时间: ${currentTime}</h1>
    <video width="640" height="480" controls>
        <source src="${relativeVideoPath}" type="video/mp4">
        Your browser does not support the video tag.
    </video>
</body>
</html>
`;
    res.send(html);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\nServer started on port ${PORT}`);
    console.log(`FFmpeg path: ${ffmpegPath}`);
});

// 启动日志定时写入
logInterval = setInterval(writeLog, 5000);
console.log(`开始记录日志到 ${logPath}`);

// 清理逻辑
process.on('SIGINT', () => {
    clearInterval(logInterval);
    console.log('停止日志记录');
    process.exit();
});

// 初始化时写入空文件
fs.writeFileSync(logPath, '');    
/**
 * 升级
 * video1 是一个钟表
 * 
 * 
 */