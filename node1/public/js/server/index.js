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
        const tempVideoFile = `temp-${Date.now()}.mp4`;
        const outputFile = `output-${Date.now()}.mp4`;

        let command = ffmpeg();
        
        scenes.forEach((scene) => {
            command.input(`lavfi:color=c=${scene.color.replace('#', '0x')}:s=640x480:d=${scene.duration}`)
                  .inputFPS(fps)
                  .videoCodec('libx264');
        });

        command.mergeToFile(tempVideoFile)
               .on('error', (err) => {
                   throw new Error(`场景合并失败: ${err.message}`);
               })
               .on('end', async () => {
                   try {
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

                       res.download(outputFile, (err) => {
                           if (err) throw err;
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