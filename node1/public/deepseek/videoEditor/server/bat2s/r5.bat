@echo off
chcp 65001 >nul
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
echo   "scripts": ^{
echo     "start": "node server.js"
echo   ^},
echo   "dependencies": ^{
echo     "express": "^4.18.2",
echo     "body-parser": "^1.20.2",
echo     "canvas": "^2.11.2",
echo     "fluent-ffmpeg": "^2.1.2",
echo     "tmp-promise": "^3.0.3"
echo   ^}
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
const bgColorMap = ^{
  '操场': '#90EE90',^
  '马路边': '#A9A9A9',^
  '树林': '#228B22',^
  '海边': '#87CEEB'^
^};^
^
app.post('/generate-video', async (req, res) => ^{
  try ^{
    const { frames, fileName, fps } = req.body;^
    const { path: tempDir, cleanup } = await getTmpDir(^{ unsafeCleanup: true });^
^
    // 生成帧画面^
    const canvas = createCanvas(800, 600);^
    const ctx = canvas.getContext('2d');^
^
    for (let i = 0; i < frames.length; i++^) ^{
      const frame = frames[i];^
      ctx.fillStyle = bgColorMap[frame.background] || '#FFFFFF';^
      ctx.fillRect(0, 0, 800, 600);^
      ctx.fillStyle = '#000000';^
      ctx.font = '30px Arial';^
      ctx.fillText(frame.background, 350, 300);^
      const buffer = canvas.toBuffer('image/png');^
      fs.writeFileSync(path.join(tempDir, `frame-${i+1}.png`), buffer);^
    ^}^
^
    // 生成视频^
    const outputPath = path.join(__dirname, 'public', 'output', fileName);^
    await new Promise((resolve, reject) => ^{
      ffmpeg()^
        .input(path.join(tempDir, 'frame-%%d.png'))^
        .inputFPS(fps)^
        .output(outputPath)^
        .on('end', resolve)^
        .on('error', reject)^
        .run();^
    ^});^
^
    cleanup();^
    res.download(outputPath, fileName);^
  ^} catch (err) ^{
    console.error(err);^
    res.status(500).send('视频生成失败');^
  ^}^
^});^
^
app.listen(port, () => ^{
  console.log(`服务已启动：http://localhost:${port}`);^
^});"

echo !server_js! > server.js

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

set "app_js=function generateVideo() {^
  const testData = {^
    frames: [^
      {background: '操场', objects: []},^
      {background: '操场', objects: []},^
      {background: '马路边', objects: []},^
      {background: '马路边', objects: []},^
      {background: '树林', objects: []},^
      {background: '海边', objects: []},^
      {background: '马路边', objects: []},^
      {background: '马路边', objects: []},^
      {background: '树林', objects: []}^
    ],^
    fileName: 'demo.mp4',^
    fps: 1^
  };^
^
  fetch('/generate-video', {^
    method: 'POST',^
    headers: { 'Content-Type': 'application/json' },^
    body: JSON.stringify(testData)^
  })^
  .then(response => {^
    if (!response.ok) throw new Error('网络响应异常');^
    return response.blob();^
  })^
  .then(blob => {^
    const url = window.URL.createObjectURL(blob);^
    const a = document.createElement('a');^
    a.style.display = 'none';^
    a.href = url;^
    a.download = testData.fileName;^
    document.body.appendChild(a);^
    a.click();^
    window.URL.revokeObjectURL(url);^
    document.body.removeChild(a);^
  })^
  .catch(error => {^
    console.error('发生错误:', error);^
    alert('视频生成失败，请查看控制台日志');^
  });^
}^
"

echo !app_js! > public\app.js

echo Installing dependencies...
call npm install --loglevel=error

echo.
echo =================================================
echo 项目创建成功！请按以下步骤操作：
echo 1. 确保已安装FFmpeg并添加到系统PATH
echo 2. 运行命令: npm start
echo 3. 访问 http://localhost:3000
echo 
echo 常见问题解决方案：
echo - 中文乱码：用记事本打开文件后另存为UTF-8编码
echo - 安装canvas需要Python和Visual Studio Build Tools
echo =================================================
pause