@echo off
setlocal enabledelayedexpansion

REM 创建目录结构
mkdir my-video-project
cd my-video-project
mkdir public
mkdir public\css
mkdir public\js
mkdir public\videos
mkdir routes
mkdir utils
mkdir frames

REM 生成前端文件
echo ^<!DOCTYPE html^>
echo ^<html lang="en"^>
echo ^<head^>
echo    ^<meta charset="UTF-8"^>
echo    ^<title^>Video Generator^</title^>
echo    ^<style^>
echo        body { font-family: Arial, sans-serif; padding: 20px; }
echo        button { padding: 10px 20px; font-size: 16px; cursor: pointer; }
echo        #result { margin-top: 20px; }
echo    ^</style^>
echo ^</head^>
echo ^<body^>
echo    ^<h1^>视频生成器^</h1^>
echo    ^<button onclick="generateVideo()"^>生成视频^</button^>
echo    ^<div id="result"^>^</div^>
echo    
echo    ^<script^>
echo        async function generateVideo() {
echo            const resultDiv = document.getElementById('result');
echo            resultDiv.innerHTML = '生成中...';
echo            
echo            try {
echo                const response = await fetch('/api/generate-video', {
echo                    method: 'POST',
echo                    headers: { 'Content-Type': 'application/json' },
echo                    body: JSON.stringify(%testData%)
echo                });
echo                
echo                const data = await response.json();
echo                if (data.success) {
echo                    resultDiv.innerHTML = `^<a href="${data.videoPath}"^>下载视频^</a^>`;
echo                } else {
echo                    resultDiv.innerHTML = '生成失败：' + data.error;
echo                }
echo            } catch (err) {
echo                resultDiv.innerHTML = '请求失败：' + err.message;
echo            }
echo        }
echo    ^</script^>
echo ^</body^>
echo ^</html^> > public\index.html

REM 生成Node.js服务器文件
echo const express = require('express');
echo const path = require('path');
echo const fs = require('fs');
echo const { generateVideo } = require('./utils/videoGenerator');
echo
echo const app = express();
echo const port = 3000;
echo
echo app.use(express.static('public'));
echo app.use(express.json());
echo
echo app.use('/api', require('./routes/api'));
echo
echo app.listen(port, () => {
echo    console.log(`Server running at http://localhost:${port}`);
echo }); > server.js

REM 生成路由文件
echo const express = require('express');
echo const router = express.Router();
echo const { generateVideo } = require('../utils/videoGenerator');
echo
echo router.post('/generate-video', async (req, res) => {
echo    try {
echo        const videoPath = await generateVideo(req.body);
echo        res.json({ success: true, videoPath });
echo    } catch (error) {
echo        res.status(500).json({ success: false, error: error.message });
echo    }
echo });
echo
echo module.exports = router; > routes\api.js

REM 生成视频生成工具
echo const ffmpeg = require('fluent-ffmpeg');
echo const ffmpegStatic = require('ffmpeg-static');
echo const path = require('path');
echo const fs = require('fs');
echo
echo const generateVideo = async (data) => {
echo    // 确保输出目录存在
echo    const outputDir = path.join(__dirname, '../public/videos');
echo    if (!fs.existsSync(outputDir)) {
echo        fs.mkdirSync(outputDir, { recursive: true });
echo    }
echo
echo    return new Promise((resolve, reject) => {
echo        const outputPath = path.join(outputDir, data.fileName);
echo        
echo        const command = ffmpeg()
echo            .setFfmpegPath(ffmpegStatic)
echo            .input('frames/%d.jpg') // 假设帧图片名为1.jpg, 2.jpg等
echo            .inputFPS(data.fps)
echo            .output(outputPath)
echo            .on('end', () => resolve(`/videos/${data.fileName}`))
echo            .on('error', (err) => reject(err))
echo            .run();
echo    });
echo };
echo
echo module.exports = { generateVideo }; > utils\videoGenerator.js

REM 初始化项目并安装依赖
cd ..
call npm init -y
call npm install express ffmpeg-static fluent-ffmpeg

echo 项目创建完成！
echo 请将帧图片（1.jpg, 2.jpg等）放入 frames 目录
echo 运行以下命令启动服务：
echo cd my-video-project ^&^& node server.js
endlocal