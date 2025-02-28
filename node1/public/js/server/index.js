const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/generate-video', async (req, res) => {
    try {
        const { fps, audio, scenes } = req.body;
        
        // 生成临时文件名
        const tempVideoFile = `temp-${Date.now()}.mp4`;
        const outputFile = `output-${Date.now()}.mp4`;

        // 创建FFmpeg命令链
        let command = ffmpeg();
        
        // 添加所有场景
        scenes.forEach((scene, index) => {
            command.input(`color=c=${scene.color.replace('#', '0x')}:s=640x480:d=${scene.duration}`)
                  .inputFPS(fps)
                  .videoCodec('libx264');
        });

        // 合并场景
        command.mergeToFile(tempVideoFile)
               .on('error', (err) => {
                   throw new Error(`场景合并失败: ${err.message}`);
               })
               .on('end', async () => {
                   try {
                       // 添加音频
                       await new Promise((resolve, reject) => {
                           ffmpeg(tempVideoFile)
                               .input(audio)
                               .outputOptions([
                                   '-c:v copy',
                                   '-c:a aac',
                                   '-shortest'
                               ])
                               .save(outputFile)
                               .on('end', resolve)
                               .on('error', reject);
                       });

                       // 发送生成的文件
                       res.download(outputFile, (err) => {
                           if (err) throw err;
                           // 清理临时文件
                           [tempVideoFile, outputFile].forEach(fs.unlinkSync);
                       });
                   } catch (err) {
                       res.status(500).send(`音频合成失败: ${err.message}`);
                   }
               });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('请确保已安装FFmpeg并配置环境变量');
});