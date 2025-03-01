const express = require('express');
const fs = require('fs');
const { createCanvas } = require('canvas');
const ffmpeg = require('fluent-ffmpeg');
const { execSync } = require('child_process');
const path = require('path');
const app = express();
const port = 3000;
// 确保临时目录在启动时被清理
const tmpDir = path.join(__dirname, 'tmp');
if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true, force: true });

app.use(express.json());
app.use(express.static('public'));

app.post('/export', async (req, res) => {
  const data = req.body;
  const fps = data.fps || 1;
  const tmpDir = path.join(__dirname, 'tmp');
  const outputPath = path.join(tmpDir, 'output.mp4');

  try {
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

    let frameCount = 0;
    for (const scene of data.scenes) {
      try {
        // 验证背景颜色格式
        if (!/^#([A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(scene.background)) {
          throw new Error(`无效的背景颜色格式: ${scene.background}`);
        }

        for (let i = 0; i < scene.duration; i++) {
          const canvas = createCanvas(1024, 768);
          const ctx = canvas.getContext('2d');
          
          // 使用try-catch包裹单个帧的生成
          try {
            renderScene(scene, ctx);
          } catch (renderError) {
            console.error(`场景渲染失败 (${scene.name} 第${i+1}帧):`, renderError.message);
            throw renderError;
          }

          const framePath = path.join(tmpDir, `frame_${frameCount.toString().padStart(4, '0')}.png`);
          fs.writeFileSync(framePath, canvas.toBuffer());
          frameCount++;
        }
      } catch (sceneError) {
        console.error(`场景处理失败: ${scene.name}`, sceneError.message);
        throw sceneError;
      }
    }

    // 转换路径分隔符为FFmpeg兼容格式
    const inputPattern = path.join(tmpDir, 'frame_%04d.png').replace(/\\/g, '/');
    
    ffmpeg()
      .input(inputPattern)
      .inputFPS(fps)
      .videoCodec('libx264')
      .outputOptions('-pix_fmt yuv420p')
      .save(outputPath)
      .on('end', () => {
        // 设置正确的Content-Type
        res.setHeader('Content-Type', 'video/mp4');
        res.sendFile(outputPath, () => {
          fs.rmSync(tmpDir, { recursive: true, force: true });
        });
      })
      .on('error', (err) => {
        console.error('FFmpeg错误:', err.message);
        fs.rmSync(tmpDir, { recursive: true, force: true });
        res.status(500).send(`视频生成失败: ${err.message}`);
      });

  } catch (error) {
    console.error('处理流程错误:', error.message);
    fs.rmSync(tmpDir, { recursive: true, force: true });
    res.status(500).send(`处理失败: ${error.message}`);
  }
});
function renderScene(scene, ctx) {
  // 背景
  ctx.fillStyle = scene.background || '#FFFFFF';
  ctx.fillRect(0, 0, 1024, 768);

  // 绘制元素
  (scene.elements || []).forEach(element => {
    ctx.fillStyle = element.color;
    ctx.strokeStyle = element.color;
    ctx.lineWidth = element.lineWidth || 2;

    switch (element.type) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(element.x, element.y, element.radius, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(element.x1, element.y1);
        ctx.lineTo(element.x2, element.y2);
        ctx.lineTo(element.x3, element.y3);
        ctx.closePath();
        ctx.fill();
        break;
      case 'line':
        ctx.beginPath();
        ctx.moveTo(element.x1, element.y1);
        ctx.lineTo(element.x2, element.y2);
        ctx.stroke();
        break;
    }
  });
}

// 保持原有路由不变...
// [原有保存和获取数据的路由保持不动]

// 保存视频数据
app.post('/save', (req, res) => {
  fs.writeFileSync('data.json', JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// 获取视频数据
app.get('/data', (req, res) => {
  try {
    const data = fs.readFileSync('data.json');
    res.json(JSON.parse(data));
  } catch (e) {
    res.status(404).send('File not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});