const fs = require('fs');
const { createCanvas } = require('canvas');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');

// 中间件配置
app.use(express.json());
app.use(cors());
app.use('/output', express.static(path.join(__dirname, 'output')));

class VideoGenerator {
  constructor() {
    this.tempDir = path.join(__dirname, 'temp_frames');
    this.outputDir = path.join(__dirname, 'output');
    this._initDirs();
    this.frameSize = { width: 1280, height: 720 };
  }

  _initDirs() {
    [this.tempDir, this.outputDir].forEach(dir => {
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    });
  }

  async generateFromData(data, outputFileName = 'output.mp4', fps = 24) {
    const tempFiles = [];
    try {
      // 生成所有帧图片
      for (let i = 0; i < data.length; i++) {
        const framePath = path.join(this.tempDir, `frame_${i.toString().padStart(4, '0')}.png`);
        await this._renderFrame(data[i], framePath);
        tempFiles.push(framePath);
      }

      // 合成视频
      await this._createVideo(tempFiles, outputFileName, fps);
      return { 
        success: true, 
        output: path.join(this.outputDir, outputFileName),
        downloadUrl: `/output/${outputFileName}`
      };
    } finally {
      this._cleanup(tempFiles);
    }
  }

  async _renderFrame(frameData, outputPath) {
    const canvas = createCanvas(this.frameSize.width, this.frameSize.height);
    const ctx = canvas.getContext('2d');
    
    // 绘制背景
    this._drawBackground(ctx, frameData.background);
    
    // 绘制对象
    frameData.objects.forEach(obj => {
      ctx.save();
      ctx.translate(obj.x || 0, obj.y || 0);
      ctx.scale(obj.scale || 1, obj.scale || 1);
      this._drawObject(ctx, obj);
      ctx.restore();
    });

    // 保存图片
    await new Promise((resolve, reject) => {
      const out = fs.createWriteStream(outputPath);
      const stream = canvas.createPNGStream();
      stream.pipe(out);
      out.on('finish', resolve);
      out.on('error', reject);
    });
  }

  _drawBackground(ctx, type) {
    ctx.save();
    switch(type) {
      case '操场':
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(0, 0, this.frameSize.width, this.frameSize.height);
        ctx.beginPath();
        ctx.arc(this.frameSize.width/2, this.frameSize.height/2, 50, 0, Math.PI*2);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.stroke();
        break;

      case '马路边':
        ctx.fillStyle = '#808080';
        ctx.fillRect(0, this.frameSize.height*0.7, this.frameSize.width, this.frameSize.height*0.3);
        ctx.fillStyle = '#F5F5F5';
        ctx.fillRect(0, this.frameSize.height*0.7 + 20, this.frameSize.width, 10);
        break;

      case '树林':
        ctx.fillStyle = '#228B22';
        ctx.fillRect(0, 0, this.frameSize.width, this.frameSize.height);
        break;

      case '海边':
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(0, 0, this.frameSize.width, this.frameSize.height/2);
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(0, this.frameSize.height/2, this.frameSize.width, this.frameSize.height/2);
        break;
    }
    ctx.restore();
  }

  _drawObject(ctx, obj) {
    switch(obj.type) {
      case '汽车':
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(-20, -10, 40, 20);
        ctx.fillRect(-15, -20, 30, 10);
        break;
    }
  }

  _createVideo(framePaths, outputFile, fps) {
    return new Promise((resolve, reject) => {
      const outputPath = path.join(this.outputDir, outputFile);
      
      ffmpeg()
        .input(path.join(this.tempDir, 'frame_%04d.png'))
        .inputFPS(fps)
        .outputOptions([
          '-c:v libx264',
          '-preset medium',
          '-crf 23',
          '-pix_fmt yuv420p'
        ])
        .output(outputPath)
        .on('start', cmd => console.log(`FFmpeg命令: ${cmd}`))
        .on('progress', progress => {
          console.log(`处理进度: ${Math.floor(progress.percent)}%`);
        })
        .on('end', resolve)
        .on('error', reject)
        .run();
    });
  }

  _cleanup(files) {
    files.forEach(file => {
      try { fs.unlinkSync(file); } 
      catch (err) { console.error('清理文件失败:', err); }
    });
  }
}

// 初始化视频生成器
const videoGenerator = new VideoGenerator();

// Web服务路由
app.post('/api/generate', async (req, res) => {
  try {
    const { frames, fileName = `video_${Date.now()}.mp4`, fps = 24 } = req.body;
    
    if (!frames || !Array.isArray(frames)) {
      return res.status(400).json({ error: 'Invalid frames data' });
    }

    const result = await videoGenerator.generateFromData(frames, fileName, fps);
    res.json({
      status: 'success',
      downloadUrl: result.downloadUrl,
      filePath: result.output
    });
    
  } catch (error) {
    console.error('生成错误:', error);
    res.status(500).json({ 
      status: 'error',
      message: error.message 
    });
  }
});

// 启动服务
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test with: curl -X POST http://localhost:${PORT}/api/generate \\
  -H "Content-Type: application/json" \\
  -d '{
    "frames": [
      {"background": "操场", "objects": []},
      {"background": "操场", "objects": []},
      {"background": "马路边", "objects": []},
      {"background": "马路边", "objects": []},
      {"background": "树林", "objects": []},
      {"background": "海边", "objects": []},
      {"background": "马路边", "objects": []},
      {"background": "马路边", "objects": []},
      {"background": "树林", "objects": []}
    ],
    "fileName": "demo.mp4",
    "fps": 24
  }'`);
});