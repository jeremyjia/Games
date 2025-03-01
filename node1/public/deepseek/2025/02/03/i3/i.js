const { spawn } = require('child_process');
const path = require('path');

/**
 * 生成视频文件
 * @param {string} audioPath - MP3音频文件路径
 * @param {string} imagePath - 图片文件路径
 * @param {string} outputPath - 输出视频文件路径
 * @param {function} callback - 回调函数
 */
function createVideo(audioPath, imagePath, outputPath, callback) {
    // FFmpeg参数配置
    const args = [
        '-loop', '1',              // 循环输入图片
        '-i', imagePath,           // 输入图片
        '-i', audioPath,           // 输入音频
        '-c:v', 'libx264',         // 视频编码器
        '-tune', 'stillimage',     // 优化静态图片编码
        '-c:a', 'aac',             // 音频编码器
        '-b:a', '192k',            // 音频比特率
        '-shortest',               // 根据音频时长结束编码
        '-pix_fmt', 'yuv420p',     // 兼容的像素格式
        '-vf', 'scale=1920:1080',  // 输出分辨率（可选）
        outputPath
    ];

    // 创建FFmpeg进程
    const ffmpeg = spawn('ffmpeg', args);

    // 监听控制台输出
    ffmpeg.stderr.on('data', (data) => {
        console.log(`FFmpeg输出: ${data}`);
    });

    // 处理完成和错误
    ffmpeg.on('close', (code) => {
        if (code === 0) {
            callback(null, `视频已生成：${outputPath}`);
        } else {
            callback(new Error(`FFmpeg进程错误，退出码 ${code}`));
        }
    });

    ffmpeg.on('error', (err) => {
        callback(new Error(`执行错误: ${err.message}`));
    });
}

// 使用示例
const audio = path.join(__dirname, '1.mp3');
const image = path.join(__dirname, '1.png');
const output = path.join(__dirname, 'output.mp4');

createVideo(audio, image, output, (err, message) => {
    if (err) {
        console.error('错误:', err);
        return;
    }
    console.log(message);
});