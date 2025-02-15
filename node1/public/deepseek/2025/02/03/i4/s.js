const express = require('express');
const { createCanvas } = require('canvas');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// 视频配置参数
const config = {
  duration: 5,      // 视频时长（秒）
  fps: 24,          // 帧率
  width: 1280,      // 视频宽度
  height: 720       // 视频高度
};

// 生成单帧图像
function generateFrame(frameNumber) {
  const canvas = createCanvas(config.width, config.height);
  const ctx = canvas.getContext('2d');
  
  const time = frameNumber / config.fps;
  const grayValue = 255 - (255 * time % 255);
  const rgb = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
  
  ctx.fillStyle = rgb;
  ctx.fillRect(0, 0, config.width, config.height);
  
  return canvas.toBuffer('image/png');
}

// 生成视频端点
app.get('/generate-video', (req, res) => {
  try {
    const tempDir = path.join(__dirname, 'frames');
    const outputPath = path.join(__dirname, 'output.mp4');

    // 创建临时目录
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    // 生成所有帧
    const totalFrames = config.duration * config.fps;
    for (let i = 0; i < totalFrames; i++) {
      const frame = generateFrame(i);
      fs.writeFileSync(path.join(tempDir, `frame-${i.toString().padStart(4, '0')}.png`), frame);
    }

    // 使用FFmpeg生成视频
    execSync(
      `ffmpeg -y -r ${config.fps} -i ${tempDir}/frame-%04d.png ` +
      `-c:v libx264 -preset slow -crf 22 -pix_fmt yuv420p ${outputPath}`
    );

    // 清理临时文件
    fs.rmSync(tempDir, { recursive: true, force: true });

    // 返回生成的视频
    res.download(outputPath, 'animation.mp4', () => {
      fs.unlinkSync(outputPath);
    });

  } catch (error) {
    console.error('Error generating video:', error);
    res.status(500).send('Video generation failed');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});