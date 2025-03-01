const fs = require('fs');
const { createCanvas } = require('canvas');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

class VideoGenerator {
  constructor() {
    this.tempDir = path.join(__dirname, 'temp_frames');
    this.outputDir = path.join(__dirname, 'output');
    this._initDirs();
    this.frameSize = { width: 1280, height: 720 }; // 视频分辨率
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
      return { success: true, output: path.join(this.outputDir, outputFileName) };
    } finally {
      this._cleanup(tempFiles);
    }
  }

  async _renderFrame(frameData, outputPath) {
    const canvas = createCanvas(this.frameSize.width, this.frameSize.height);
    const ctx = canvas.getContext('2d');
    
    // 绘制背景
    this._drawBackground(ctx, frameData.background);
    
    // 绘制对象（示例包含一个汽车对象）
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
        ctx.fillRect(-20, -10, 40, 20);  // 车身
        ctx.fillRect(-15, -20, 30, 10);  // 车顶
        break;
      // 可以继续添加其他对象类型
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

// 使用示例
const testData = [
  // 此处插入您提供的JSON数据
  // 为了演示添加一个移动的汽车对象
  ...Array(2).fill({
    background: "操场",
    objects: [{ type: "汽车", x: 200, y: 300, scale: 1 }]
  }),
  ...Array(2).fill({
    background: "马路边",
    objects: [{ type: "汽车", x: 400, y: 500, scale: 1 }]
  }),
  ...Array(2).fill({
    background: "树林",
    objects: []
  }),
  ...Array(3).fill({
    background: "海边",
    objects: []
  })
];

(async () => {
  const generator = new VideoGenerator();
  try {
    const result = await generator.generateFromData(testData, '1.mp4', 24);
    console.log('视频生成成功:', result.output);
  } catch (error) {
    console.error('生成失败:', error);
  }
})();