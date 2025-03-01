const express = require('express');
const bodyParser = require('body-parser');
const { createCanvas } = require('canvas');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const port = 3000;

// 配置
const config = {
  fps: 30,
  width: 640,
  height: 480
};

// 目录设置
const tempDir = path.join(__dirname, 'temp');
const configDir = path.join(__dirname, 'saved_configs');

// 初始化目录
[tempDir, configDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static('public'));

// 视频生成端点
app.post('/generate', async (req, res) => {
  try {
    const videoConfig = validateConfig(req.body);
    const sessionId = crypto.randomBytes(8).toString('hex');
    const sessionDir = path.join(tempDir, sessionId);
    
    fs.mkdirSync(sessionDir);
    
    // 生成帧
    const totalDuration = Math.max(...videoConfig.map(s => s.end));
    const totalFrames = Math.ceil(totalDuration * config.fps);
    
    for (let i = 0; i < totalFrames; i++) {
      const time = i / config.fps;
      const color = getColorAtTime(videoConfig, time);
      const framePath = path.join(sessionDir, `frame-${i.toString().padStart(6, '0')}.png`);
      generateFrame(color, framePath);
    }

    // 生成视频
    const outputPath = path.join(sessionDir, 'output.mp4');
    execSync(
      `ffmpeg -y -framerate ${config.fps} ` +
      `-i ${path.join(sessionDir, 'frame-%06d.png')} ` +
      `-c:v libx264 -preset fast -pix_fmt yuv420p ${outputPath}`
    );

    res.sendFile(outputPath, () => {
      fs.rmSync(sessionDir, { recursive: true, force: true });
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 配置保存端点
app.post('/save-config', (req, res) => {
  try {
    const { config, filename } = req.body;
    validateConfig(config);
    
    if (!/^[\w\-]+\.json$/.test(filename)) {
      throw new Error('无效文件名');
    }

    const filePath = path.join(configDir, filename);
    fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
    
    res.json({ success: true, filename });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// 配置管理端点
app.get('/configs', (req, res) => {
  try {
    const files = fs.readdirSync(configDir)
      .filter(file => file.endsWith('.json'))
      .map(file => ({
        name: file,
        path: path.join(configDir, file),
        created: fs.statSync(path.join(configDir, file)).birthtime
      }));
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: '无法读取配置' });
  }
});

app.get('/configs/:filename', (req, res) => {
  const filename = req.params.filename;
  if (!/^[\w\-]+\.json$/.test(filename)) {
    return res.status(400).send('无效文件名');
  }
  const filePath = path.join(configDir, filename);
  res.sendFile(filePath);
});

app.delete('/configs/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(configDir, filename);
  
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false });
  }
});

// 辅助函数
function validateConfig(config) {
  if (!Array.isArray(config)) throw new Error('配置必须是数组');
  config.forEach((segment, i) => {
    if (typeof segment.start !== 'number' || 
        typeof segment.end !== 'number' ||
        !segment.color) {
      throw new Error(`片段 ${i} 格式错误`);
    }
    if (segment.start >= segment.end) throw new Error(`片段 ${i} 时间无效`);
  });
  return config;
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
  console.log(`服务器运行在 http://localhost:${port}`);
});