const express = require('express');
const fs = require('fs');
const { createCanvas } = require('canvas');
const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const path = require('path');
const app = express();
const port = 3000;
// 确保临时目录在启动时被清理
const tmpDir = path.join(__dirname, 'tmp');
if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true, force: true });

app.use(express.json());
app.use(express.static('public'));

// 新增视频生成路由
app.post('/export', async (req, res) => {
  const data = req.body;
  const fps = data.fps || 1;
  const tmpDir = path.join(__dirname, 'tmp');
  const outputPath = path.join(tmpDir, 'output.mp4');

  try {
    // 创建临时目录
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

    // 生成所有帧
    let frameCount = 0;
    data.scenes.forEach(scene => {
      for (let i = 0; i < scene.duration; i++) {
        try {
          const canvas = createCanvas(1024, 768);
          const ctx = canvas.getContext('2d');
          renderScene(scene, ctx);
          const framePath = path.join(tmpDir, `frame_${frameCount.toString().padStart(4, '0')}.png`);
          fs.writeFileSync(framePath, canvas.toBuffer());
          frameCount++;
        } catch (e) {
          console.error(`生成第 ${frameCount} 帧失败 (场景: ${scene.name})：`, e.message);
          throw e; // 可选择终止处理或跳过此帧
        }
      }
    });

    // 使用FFmpeg生成视频
    execSync(
      `${ffmpeg} -y -framerate ${fps} -i ${path.join(tmpDir, 'frame_%04d.png')} ` +
      `-c:v libx264 -pix_fmt yuv420p ${outputPath}`,
      { stdio: 'inherit' }  // 显示FFmpeg输出信息
    );

    // 发送视频文件并清理临时文件
    res.download(outputPath, () => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    });
  } catch (error) {
    console.error('视频生成失败:', error);
    fs.rmSync(tmpDir, { recursive: true, force: true });
    res.status(500).send('视频生成失败');
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