// 后端代码 (server.js)
const express = require('express');
const { createCanvas } = require('canvas');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 创建保存配置的目录
const configDir = path.join(__dirname, 'saved_configs');
if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
}

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

const config = {
  fps: 30,
  width: 640,
  height: 480
};


// 新增保存配置端点
app.post('/save-config', (req, res) => {
  try {
      const { config, filename } = req.body;
      
      // 验证输入
      if (!config || !filename) {
          throw new Error('无效的请求参数');
      }
      
      // 验证文件名格式
      if (!/^[\w\-]+\.json$/.test(filename)) {
          throw new Error('文件名格式不正确');
      }

      // 验证配置结构
      validateConfig(config);

      // 保存文件
      const filePath = path.join(configDir, filename);
      fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
      
      res.json({ 
          success: true,
          filename: filename,
          path: filePath
      });
      
  } catch (error) {
      res.status(400).json({
          success: false,
          message: error.message
      });
  }
});

app.post('/generate', async (req, res) => {
  try {
    const videoConfig = req.body;
    const tempDir = path.join(__dirname, 'temp');
    const outputPath = path.join(tempDir, 'output.mp4');

    // 验证配置
    validateConfig(videoConfig);

    // 准备临时目录
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
    
    // 生成帧
    const frameFiles = [];
    const totalDuration = Math.max(...videoConfig.map(s => s.end));
    const totalFrames = Math.ceil(totalDuration * config.fps);

    for (let frameIndex = 0; frameIndex < totalFrames; frameIndex++) {
      const time = frameIndex / config.fps;
      const color = getColorAtTime(videoConfig, time);
      const framePath = path.join(tempDir, `frame-${frameIndex.toString().padStart(6, '0')}.png`);
      
      generateFrame(color, framePath);
      frameFiles.push(framePath);
    }

    // 生成视频
    execSync(
      `ffmpeg -y -framerate ${config.fps} ` +
      `-i ${path.join(tempDir, 'frame-%06d.png')} ` +
      `-c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p ${outputPath}`
    );

    // 发送视频文件
    res.sendFile(outputPath, () => {
      // 清理临时文件
      fs.rmSync(tempDir, { recursive: true, force: true });
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

function validateConfig(config) {
  // 验证配置结构
  if (!Array.isArray(config)) throw new Error('配置必须是数组');
  
  config.forEach((segment, index) => {
    if (typeof segment.start !== 'number' || 
        typeof segment.end !== 'number' ||
        !segment.color) {
      throw new Error(`片段 ${index} 格式错误`);
    }
    
    if (segment.start >= segment.end) {
      throw new Error(`片段 ${index} 时间范围无效`);
    }
  });
}

function getColorAtTime(config, time) {
  const segment = config.find(s => time >= s.start && time < s.end);
  return segment ? parseColor(segment.color) : { r: 255, g: 255, b: 255 };
}

function parseColor(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function generateFrame(color, outputPath) {
  const canvas = createCanvas(640, 480);
  const ctx = canvas.getContext('2d');
  
  ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  fs.writeFileSync(outputPath, canvas.toBuffer('image/png'));
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});