@echo off
chcp 65001 >nul
setlocal DisableDelayedExpansion

echo Creating project structure...
mkdir "video-generator" 2>nul
cd "video-generator"
mkdir public 2>nul
mkdir public\output 2>nul

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
setlocal EnableDelayedExpansion
(
echo // -*- coding: utf-8 -*-
echo const express = require('express'^);
echo const bodyParser = require('body-parser'^);
echo const { createCanvas } = require('canvas'^);
echo const ffmpeg = require('fluent-ffmpeg'^);
echo const fs = require('fs'^);
echo const path = require('path'^);
echo const { dir: getTmpDir } = require('tmp-promise'^);
echo.
echo const app = express(^);
echo const port = 3000;
echo.
echo app.use(bodyParser.json(^)^);
echo app.use(express.static('public'^)^);
echo.
echo const bgColorMap = ^^{
echo   '操场': '#90EE90',
echo   '马路边': '#A9A9A9',
echo   '树林': '#228B22',
echo   '海边': '#87CEEB'
echo ^^};
echo.
echo app.post('/generate-video', async (req, res^) => ^^{
echo   try ^^{
echo     const { frames, fileName, fps } = req.body;
echo     const { path: tempDir, cleanup } = await getTmpDir(^^^<unsafeCleanup: true^^^>);
echo.
echo     // 生成帧画面
echo     const canvas = createCanvas(800, 600^);
echo     const ctx = canvas.getContext('2d'^);
echo.
echo     for ^^(let i = 0^; i ^^^< frames.length^; i++^^^) ^^{
echo       const frame = frames[i^];
echo       ctx.fillStyle = bgColorMap[frame.background] || '#FFFFFF';
echo       ctx.fillRect(0, 0, 800, 600^);
echo       ctx.fillStyle = '#000000';
echo       ctx.font = '30px Arial';
echo       ctx.fillText(frame.background, 350, 300^);
echo       const buffer = canvas.toBuffer('image/png'^);
echo       fs.writeFileSync(path.join(tempDir, `frame-${i+1}.png`^), buffer^);
echo     ^^}
echo.
echo     // 生成视频
echo     const outputPath = path.join(__dirname, 'public', 'output', fileName^);
echo     await new Promise(^(resolve, reject^) => ^^{
echo       ffmpeg(^)
echo         .input(path.join(tempDir, 'frame-%%%%d.png'^)^)
echo         .inputFPS(fps^)
echo         .output(outputPath^)
echo         .on('end', ^(^) => resolve(^)^)
echo         .on('error', ^(err^) => reject(err^)^)
echo         .run(^);
echo     ^^}^);
echo.
echo     cleanup(^);
echo     res.download(outputPath, fileName^);
echo   ^^} catch ^^(err^) ^^{
echo     console.error(err^);
echo     res.status(500^).send('视频生成失败'^);
echo   ^^}
echo ^^}^);
echo.
echo app.listen(port, ^(^) => ^^{
echo   console.log(^^`服务已启动：http://localhost:${port}^^`^);
echo ^^}^);
) > server.js
endlocal

echo Writing public files...
(
echo ^<!DOCTYPE html^>
echo ^<html lang="zh-CN"^>
echo ^<head^>
echo   ^<meta charset="UTF-8"^/^>
echo   ^<title^>视频生成器^</title^>
echo   ^<link rel="stylesheet" href="style.css"^/^>
echo ^</head^>
echo ^<body^>
echo   ^<h1^>视频生成器^</h1^>
echo   ^<button onclick="generateVideo()"^>立即生成^</button^>
echo   ^<script src="app.js"^/^>
echo ^</body^>
echo ^</html^>
) > public\index.html

(
echo body {
echo   font-family: "Microsoft YaHei", sans-serif;
echo   text-align: center;
echo   padding: 50px;
echo }
echo button {
echo   padding: 15px 30px;
echo   font-size: 18px;
echo   background-color: #4CAF50;
echo   color: white;
echo   border: none;
echo   border-radius: 5px;
echo   cursor: pointer;
echo }
echo button:hover {
echo   background-color: #45a049;
echo }
) > public\style.css

setlocal EnableDelayedExpansion
(
echo function generateVideo() {
echo   const testData = {
echo     frames: [
echo       {background: "操场", objects: []},
echo       {background: "操场", objects: []},
echo       {background: "马路边", objects: []},
echo       {background: "马路边", objects: []},
echo       {background: "树林", objects: []},
echo       {background: "海边", objects: []},
echo       {background: "马路边", objects: []},
echo       {background: "马路边", objects: []},
echo       {background: "树林", objects: []}
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
endlocal

echo Installing dependencies...
call npm install --loglevel=error --msvs_version=2019

echo.
echo =================================================
echo 项目创建成功！请按以下步骤操作：
echo 1. 确认已安装以下前置软件：
echo    - FFmpeg (添加 bin 目录到 PATH)
echo    - Python 3.10+
echo    - Visual Studio 2019 Build Tools
echo 2. 运行命令: npm start
echo 3. 访问 http://localhost:3000
echo 
echo 常见问题解决方案：
echo [1] canvas安装失败：
echo     npm config set python "C:\Python310\python.exe"
echo     npm install --global windows-build-tools
echo [2] 中文乱码问题：
echo     用记事本打开文件 → 另存为 → 编码选择 UTF-8
echo =================================================
pause