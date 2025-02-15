// 后端代码 (server.js)
const express = require('express');
const bodyParser = require('body-parser');
const { createCanvas } = require('canvas');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static('public'));

// 视频配置
const config = {
  fps: 10,
  width: 640,
  height: 480
};

// 会话管理
const sessions = new Map();

// 创建新会话
app.post('/api/session', (req, res) => {
  const sessionId = crypto.randomBytes(16).toString('hex');
  const sessionDir = path.join(__dirname, 'sessions', sessionId);
  
  fs.mkdirSync(sessionDir, { recursive: true });
  sessions.set(sessionId, {
    dir: sessionDir,
    frameCount: 0
  });

  res.json({ sessionId });
});

// 接收帧数据
app.post('/api/frames', (req, res) => {
  const sessionId = req.headers['session-id'];
  const session = sessions.get(sessionId);
  
  if (!session) {
    return res.status(404).send('Session not found');
  }

  const frameData = req.body.frame.split(',')[1];
  const buffer = Buffer.from(frameData, 'base64');
  const framePath = path.join(session.dir, `frame-${session.frameCount.toString().padStart(5, '0')}.jpg`);
  
  fs.writeFileSync(framePath, buffer);
  session.frameCount++;
  
  res.sendStatus(200);
});

// 生成视频
app.get('/api/generate-video/:sessionId', async (req, res) => {
  const sessionId = req.params.sessionId;
  const session = sessions.get(sessionId);
  
  if (!session) {
    return res.status(404).send('Session not found');
  }

  const outputPath = path.join(session.dir, 'output.mp4');
  
  try {
    execSync(
      `ffmpeg -y -framerate ${config.fps} ` +
      `-i ${path.join(session.dir, 'frame-%05d.jpg')} ` +
      `-c:v libx264 -preset fast -pix_fmt yuv420p ${outputPath}`
    );

    res.sendFile(outputPath, () => {
      // 清理资源
      fs.rmSync(session.dir, { recursive: true, force: true });
      sessions.delete(sessionId);
    });
    
  } catch (error) {
    console.error('视频生成失败:', error);
    res.status(500).send('Video generation failed');
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});