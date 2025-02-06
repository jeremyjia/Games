const fs = require('fs');
const { createCanvas } = require('canvas');
const ffmpeg = require('fluent-ffmpeg');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

class VideoGenerator {
  constructor() {
    this.tempDir = path.join(__dirname, 'temp');
    this.outputDir = path.join(__dirname, 'output');
    this._initDirs();
  }

  _initDirs() {
    if (!fs.existsSync(this.tempDir)) fs.mkdirSync(this.tempDir);
    if (!fs.existsSync(this.outputDir)) fs.mkdirSync(this.outputDir);
  }

  async generate(config) {
    const { inputFile, outputFile, width = 1280, height = 720, fps = 24 } = config;
    const frameData = this._loadJson(inputFile);
    const tempFiles = [];

    try {
      // 生成帧图片序列
      for (let i = 0; i < frameData.length; i++) {
        const framePath = await this._renderFrame(frameData[i], i, width, height);
        tempFiles.push(framePath);
      }

      // 合成视频
      await this._createVideo(tempFiles, outputFile, fps);
      return { success: true, output: outputFile };
    } finally {
      this._cleanup(tempFiles);
    }
  }

  _loadJson(filePath) {
    try {
      const data = fs.readFileSync(filePath);
      return JSON.parse(data);
    } catch (error) {
      throw new Error(`JSON解析失败: ${error.message}`);
    }
  }

  async _renderFrame(frame, index, width, height) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // 绘制背景
    this._drawBackground(ctx, frame.background, width, height);
    
    // 绘制所有对象
    frame.objects.forEach(obj => {
      ctx.save();
      ctx.translate(obj.x, obj.y);
      ctx.scale(obj.scale, obj.scale);
      this._drawObject(ctx, obj);
      ctx.restore();
    });

    // 保存临时文件
    const framePath = path.join(this.tempDir, `frame_${index}_${uuidv4()}.png`);
    await new Promise((resolve, reject) => {
      const out = fs.createWriteStream(framePath);
      const stream = canvas.createPNGStream();
      stream.pipe(out);
      out.on('finish', resolve);
      out.on('error', reject);
    });

    return framePath;
  }

  _drawBackground(ctx, type, width, height) {
    // 与前端一致的背景绘制逻辑
    switch(type) {
      case '海边':
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(0, 0, width, height/2);
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(0, height/2, width, height/2);
        break;
      // 其他背景类型...
    }
  }

  _drawObject(ctx, obj) {
    // 与前端一致的对象绘制逻辑
    switch(obj.type) {
      case '汽车':
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(-20, -10, 40, 20);
        ctx.fillRect(-15, -20, 30, 10);
        break;
      // 其他对象类型...
    }
  }

  _createVideo(framePaths, outputFile, fps) {
    return new Promise((resolve, reject) => {
      const outputPath = path.join(this.outputDir, outputFile);
      
      ffmpeg()
        .input(path.join(this.tempDir, 'frame_%d.png'))
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
        .on('end', () => {
          console.log('视频生成完成');
          resolve();
        })
        .on('error', err => reject(err))
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

// 使用示例
const generator = new VideoGenerator();

generator.generate({
  inputFile: 't1.json',  // 前端导出的JSON文件
  outputFile: 'output.mp4',
  width: 1920,
  height: 1080,
  fps: 30
}).then(console.log).catch(console.error);