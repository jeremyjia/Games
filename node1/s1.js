const express = require('express');
const { createCanvas } = require('canvas');
const cors = require('cors');  // <-- 添加CORS模块
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const tmp = require('tmp-promise');
const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');

ffmpeg.setFfmpegPath(ffmpegPath);

const app = express();
app.use(cors());  // <-- 添加CORS中间件
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '50mb' }));

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

  // 保存图片
  const filePath = path.join(tempDir, `scene-${scene.id}.png`);
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


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\nServer started on port ${PORT}`);
  console.log(`FFmpeg path: ${ffmpegPath}`);
});