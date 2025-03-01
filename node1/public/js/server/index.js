const express = require('express');
const { createCanvas } = require('canvas');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const tmp = require('tmp-promise');
const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');

ffmpeg.setFfmpegPath(ffmpegPath);

const app = express();
app.use(express.json({ limit: '50mb' }));

// 图形绘制函数
function drawShape(ctx, obj) {
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
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // 绘制背景
  ctx.fillStyle = scene.color;
  ctx.fillRect(0, 0, width, height);

  // 绘制图形
  scene.drawingObjs.forEach(obj => drawShape(ctx, obj));

  // 保存图片
  const filePath = path.join(tempDir, `scene-${scene.id}.png`);
  const out = fs.createWriteStream(filePath);
  const stream = canvas.createPNGStream();
  stream.pipe(out);

  return new Promise((resolve, reject) => {
    out.on('finish', () => resolve(filePath));
    out.on('error', reject);
  });
}

// 创建场景视频片段
async function createSceneClip(scene, pngPath, duration, fps, tempDir) {
  const outputPath = path.join(tempDir, `clip-${scene.id}.mp4`);
  
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
        '-vf scale=640:480' // 强制输出分辨率
      ])
      .output(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', reject)
      .run();
  });
}

// 合并视频片段
async function mergeClips(clipPaths, tempDir) {
  const listPath = path.join(tempDir, 'list.txt');
  await fs.writeFile(listPath, clipPaths.map(p => `file '${p}'`).join('\n'));

  const outputPath = path.join(tempDir, 'merged.mp4');
  
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(listPath)
      .inputOptions(['-f concat', '-safe 0'])
      .outputOptions(['-c copy'])
      .output(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', reject)
      .run();
  });
}

// 添加音频到视频
async function addAudio(videoPath, audioPath, outputPath) {
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
      .on('end', () => resolve(outputPath))
      .on('error', reject)
      .run();
  });
}

// 主处理路由
app.post('/generate-video', async (req, res) => {
  let tempDir;
  try {
    const { fps, audio, scenes, width = 640, height = 480 } = req.body;
    
    // 创建临时目录
    const dir = await tmp.dir();
    tempDir = dir.path;

    // 下载音频文件
    const audioPath = path.join(tempDir, 'audio.mp3');
    const audioResponse = await axios({
      url: audio,
      responseType: 'stream',
    });
    await new Promise((resolve, reject) => {
      audioResponse.data.pipe(fs.createWriteStream(audioPath))
        .on('finish', resolve)
        .on('error', reject);
    });

    // 处理所有场景
    const clipPaths = [];
    for (const scene of scenes) {
      const pngPath = await generateSceneImage(scene, width, height, tempDir);
      const clipPath = await createSceneClip(scene, pngPath, scene.duration, fps, tempDir);
      clipPaths.push(clipPath);
    }

    // 合并视频
    const mergedPath = await mergeClips(clipPaths, tempDir);
    
    // 添加音频
    const outputPath = path.join(tempDir, 'final.mp4');
    await addAudio(mergedPath, audioPath, outputPath);

    // 发送结果
    res.download(outputPath, 'video-output.mp4', async (err) => {
      await dir.cleanup();
      if (err) {
        console.error('下载失败:', err);
        res.status(500).send('视频生成失败');
      }
    });

  } catch (error) {
    console.error('处理失败:', error);
    if (tempDir) await fs.remove(tempDir);
    res.status(500).json({
      error: '视频生成失败',
      message: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});