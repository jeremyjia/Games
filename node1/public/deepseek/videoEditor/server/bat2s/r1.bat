@echo off
echo Creating project structure...
mkdir video-generator
cd video-generator
mkdir public
mkdir public\output

echo Writing package.json...
(
echo {
echo   "name": "video-generator",
echo   "version": "1.0.0",
echo   "scripts": {
echo     "start": "node server.js"
echo   },
echo   "dependencies": {
echo     "express": "^4.18.2",
echo     "body-parser": "^1.20.2",
echo     "canvas": "^2.11.2",
echo     "fluent-ffmpeg": "^2.1.2",
echo     "tmp-promise": "^3.0.3"
echo   }
echo }
) > package.json

echo Writing server.js...
(
echo const express = require('express'^);
echo const bodyParser = require('body-parser'^);
echo const { createCanvas } = require('canvas'^);
echo const ffmpeg = require('fluent-ffmpeg'^);
echo const fs = require('fs'^);
echo const path = require('path'^);
echo const { dir: getTmpDir, cleanup } = require('tmp-promise'^);
echo.
echo const app = express(^);
echo const port = 3000;
echo.
echo app.use(bodyParser.json(^)^);
echo app.use(express.static('public'^)^);
echo.
echo const bgColorMap = ^{
echo   '操场': '#90EE90',
echo   '马路边': '#A9A9A9',
echo   '树林': '#228B22',
echo   '海边': '#87CEEB'
echo ^};
echo.
echo app.post('/generate-video', async (req, res^) => ^{
echo   try ^{
echo     const { frames, fileName, fps } = req.body;
echo     const { path: tempDir, cleanup } = await getTmpDir(^{ unsafeCleanup: true ^}^);
echo.
echo     // Generate frames
echo     const canvas = createCanvas(800, 600^);
echo     const ctx = canvas.getContext('2d'^);
echo.
echo     for (let i = 0; i < frames.length; i++^) ^{
echo       const frame = frames[i];
echo       ctx.fillStyle = bgColorMap[frame.background] || '#FFFFFF';
echo       ctx.fillRect(0, 0, 800, 600^);
echo       ctx.fillStyle = '#000000';
echo       ctx.font = '30px Arial';
echo       ctx.fillText(frame.background, 350, 300^);
echo       const buffer = canvas.toBuffer('image/png'^);
echo       fs.writeFileSync(path.join(tempDir, `frame-${i+1}.png`^), buffer^);
echo     ^}
echo.
echo     // Generate video
echo     const outputPath = path.join(__dirname, 'public', 'output', fileName^);
echo     await new Promise((resolve, reject^) => ^{
echo       ffmpeg(^)
echo         .input(path.join(tempDir, 'frame-%%d.png'^)^)
echo         .inputFPS(fps^)
echo         .output(outputPath^)
echo         .on('end', resolve^)
echo         .on('error', reject^)
echo         .run(^);
echo     ^}^);
echo.
echo     cleanup(^);
echo     res.download(outputPath, fileName^);
echo   ^} catch (err^) ^{
echo     console.error(err^);
echo     res.status(500^).send('Error generating video'^);
echo   ^}
echo ^}^);
echo.
echo app.listen(port, (^) => ^{
echo   console.log(`Server running at http://localhost:${port}`^);
echo ^}^);
) > server.js

REM 其余部分保持原样...

echo Writing public files...
(
echo ^<!DOCTYPE html^>
echo ^<html^>
echo ^<head^>
echo   ^<title^>Video Generator^</title^>
echo   ^<link rel="stylesheet" href="style.css"^/^>
echo ^</head^>
echo ^<body^>
echo   ^<h1^>视频生成器^</h1^>
echo   ^<button onclick="generateVideo()"^>生成视频^</button^>
echo   ^<script src="app.js"^/^>
echo ^</body^>
echo ^</html^>
) > public\index.html

(
echo body {
echo   text-align: center;
echo   padding: 50px;
echo }
echo button {
echo   padding: 15px 30px;
echo   font-size: 18px;
echo   cursor: pointer;
echo }
) > public\style.css

(
echo function generateVideo() {
echo   const testData = {
echo     frames: [
echo       {"background": "操场", "objects": []},
echo       {"background": "操场", "objects": []},
echo       {"background": "马路边", "objects": []},
echo       {"background": "马路边", "objects": []},
echo       {"background": "树林", "objects": []},
echo       {"background": "海边", "objects": []},
echo       {"background": "马路边", "objects": []},
echo       {"background": "马路边", "objects": []},
echo       {"background": "树林", "objects": []}
echo     ],
echo     fileName: "demo.mp4",
echo     fps: 1
echo   };
echo
echo   fetch('/generate-video', {
echo     method: 'POST',
echo     headers: { 'Content-Type': 'application/json' },
echo     body: JSON.stringify(testData)
echo   })
echo   .then(response => response.blob())
echo   .then(blob => {
echo     const url = window.URL.createObjectURL(blob);
echo     const a = document.createElement('a');
echo     a.href = url;
echo     a.download = 'demo.mp4';
echo     document.body.appendChild(a);
echo     a.click();
echo     window.URL.revokeObjectURL(url);
echo     document.body.removeChild(a);
echo   });
echo }
) > public\app.js

echo Installing dependencies...
npm install

echo -----------------------------------------------
echo 安装完成后，请确保已安装FFmpeg并添加到系统PATH
echo 然后运行以下命令启动服务：
echo npm start
echo 访问 http://localhost:3000 使用生成器
echo -----------------------------------------------

pause