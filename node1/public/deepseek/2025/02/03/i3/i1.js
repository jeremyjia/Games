const { spawn } = require('child_process');
const path = require('path');
const cliProgress = require('cli-progress');

// 创建进度条实例
const progressBar = new cliProgress.SingleBar({
  format: '进度 | {bar} | {percentage}% | 耗时: {duration}s',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true
});

/**
 * 获取音频时长(秒)
 */
function getAudioDuration(audioPath) {
  return new Promise((resolve, reject) => {
    const ffprobe = spawn('ffprobe', [
      '-v', 'error',
      '-show_entries', 'format=duration',
      '-of', 'default=noprint_wrappers=1:nokey=1',
      audioPath
    ]);

    let duration = 0;
    ffprobe.stdout.on('data', (data) => {
      duration = parseFloat(data.toString());
    });

    ffprobe.on('close', (code) => {
      code === 0 ? resolve(duration) : reject(new Error(`获取时长失败 code: ${code}`));
    });
  });
}

/**
 * 生成视频文件（带进度条）
 */
async function createVideoWithProgress(audioPath, imagePath, outputPath) {
  try {
    // 获取音频总时长
    const totalDuration = await getAudioDuration(audioPath);
    if (!totalDuration) throw new Error('无法获取音频时长');

    // 启动进度条
    progressBar.start(100, 0, { duration: 0 });
    const startTime = Date.now();

    // FFmpeg参数
    const args = [
      '-y',
      '-loop', '1',
      '-i', imagePath,
      '-i', audioPath,
      '-c:v', 'libx264',
      '-tune', 'stillimage',
      '-c:a', 'aac',
      '-shortest',
      '-pix_fmt', 'yuv420p',
      outputPath
    ];

    // 启动FFmpeg进程
    const ffmpeg = spawn('ffmpeg', args);

    // 解析进度
    ffmpeg.stderr.on('data', (chunk) => {
      const str = chunk.toString();
      const lines = str.split('\n');
      
      lines.forEach(line => {
        if (line.includes('time=')) {
          const timeMatch = line.match(/time=(\d+:\d+:\d+\.\d+)/);
          if (timeMatch) {
            // 将时间转换为秒数
            const parts = timeMatch[1].split(':');
            const hours = parseInt(parts[0]) || 0;
            const minutes = parseInt(parts[1]) || 0;
            const seconds = parseFloat(parts[2]) || 0;
            const currentTime = hours * 3600 + minutes * 60 + seconds;

            // 计算进度百分比
            const progress = Math.min((currentTime / totalDuration) * 100, 100);
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            
            progressBar.update(progress, { duration: elapsed });
          }
        }
      });
    });

    // 处理结果
    return new Promise((resolve, reject) => {
      ffmpeg.on('close', (code) => {
        progressBar.stop();
        code === 0 ? resolve(outputPath) : reject(new Error(`转换失败 code: ${code}`));
      });

      ffmpeg.on('error', (err) => {
        progressBar.stop();
        reject(err);
      });
    });
    
  } catch (err) {
    progressBar.stop();
    throw err;
  }
}

// 使用示例
(async () => {
  try {
    const audio = path.join(__dirname, '1.mp3');
    const image = path.join(__dirname, '1.jpg');
    const output = path.join(__dirname, 'o.mp4');

    console.log('开始生成视频...');
    const result = await createVideoWithProgress(audio, image, output);
    console.log(`\n视频生成成功：${result}`);
  } catch (err) {
    console.error('\n发生错误:', err.message);
  }
})();