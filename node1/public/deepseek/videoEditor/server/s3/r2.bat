@echo off
setlocal enabledelayedexpansion

echo Creating project structure...
mkdir "video-generator" 2>nul
cd "video-generator"
mkdir public 2>nul
mkdir public\output 2>nul

echo Writing package.json...
(
echo ^{
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
echo ^}
) > package.json

echo Writing server.js...
set "server_js=const express = require('express');^
const bodyParser = require('body-parser');^
const { createCanvas } = require('canvas');^
const ffmpeg = require('fluent-ffmpeg');^
const fs = require('fs');^
const path = require('path');^
const { dir: getTmpDir } = require('tmp-promise');^
^
const app = express();^
const port = 3000;^
^
app.use(bodyParser.json());^
app.use(express.static('public'));^
^
const bgColorMap = {^
  '操场': '#90EE90',^
  '马路边': '#A9A9A9',^
  '树林': '#228B22',^
  '海边': '#87CEEB'^
};^
^
app.post('/generate-video', async (req, res) => {^
  try {^
    const { frames, fileName, fps } = req.body;^
    const { path: tempDir, cleanup } = await getTmpDir({ unsafeCleanup: true });^
^
    // Generate frames^
    const canvas = createCanvas(800, 600);^
    const ctx = canvas.getContext('2d');^
^
    for (let i = 0; i < frames.length; i++) {^
      const frame = frames[i];^
      ctx.fillStyle = bgColorMap[frame.background] || '#FFFFFF';^
      ctx.fillRect(0, 0, 800, 600);^
      ctx.fillStyle = '#000000';^
      ctx.font = '30px Arial';^
      ctx.fillText(frame.background, 350, 300);^
      const buffer = canvas.toBuffer('image/png');^
      fs.writeFileSync(path.join(tempDir, `frame-${i+1}.png`), buffer);^
    }^
^
    // Generate video^
    const outputPath = path.join(__dirname, 'public', 'output', fileName);^
    await new Promise((resolve, reject) => {^
      ffmpeg()^
        .input(path.join(tempDir, 'frame-%%d.png'))^
        .inputFPS(fps)^
        .output(outputPath)^
        .on('end', resolve)^
        .on('error', reject)^
        .run();^
    });^
^
    cleanup();^
    res.download(outputPath, fileName);^
  } catch (err) {^
    console.error(err);^
    res.status(500).send('Error generating video');^
  }^
});^
^
app.listen(port, () => {^
  console.log(`Server running at http://localhost:${port}`);^
});"

echo !server_js! > server.js

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
call npm install --loglevel=error

echo.
echo ==============================================
echo 安装成功！请按以下步骤操作：
echo 1. 确认FFmpeg已安装并添加到系统PATH
echo 2. 运行命令: npm start
echo 3. 访问 http://localhost:3000
echo ==============================================
pause