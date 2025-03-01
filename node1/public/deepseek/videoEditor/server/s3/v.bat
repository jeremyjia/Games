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
echo const bgColorMap = {
echo   '操场': '#90EE90',
echo   '马路边': '#A9A9A9',
echo   '树林': '#228B22',
echo   '海边': '#87CEEB'
echo };
echo.
echo app.post('/generate-video', async (req, res^) =^> {
echo   try {
echo     const { frames, fileName, fps } = req.body;
echo     const { path: tempDir, cleanup } = await getTmpDir({ unsafeCleanup: true });
echo.
echo     // Generate frames
echo     const canvas = createCanvas(800, 600);
echo     const ctx = canvas.getContext('2d');
echo.
echo     for (let i = 0; i < frames.length; i++^) {
echo       const frame = frames[i];
echo       ctx.fillStyle = bgColorMap[frame.background] || '#FFFFFF';
echo       ctx.fillRect(0, 0, 800, 600);
echo       ctx.fillStyle = '#000000';
echo       ctx.font = '30px Arial';
echo       ctx.fillText(frame.background, 350, 300);
echo       const buffer = canvas.toBuffer('image/png');
echo       fs.writeFileSync(path.join(tempDir, `frame-${i+1}.png`), buffer);
echo     }
echo.
echo     // Generate video
echo     const outputPath = path.join(__dirname, 'public', 'output', fileName);
echo     await new Promise((resolve, reject^) =^> {
echo       ffmpeg()
echo         .input(path.join(tempDir, 'frame-%%d.png'))
echo         .inputFPS(fps)
echo         .output(outputPath)
echo         .on('end', resolve)
echo         .on('error', reject)
echo         .run();
echo     });
echo.
echo     cleanup();
echo     res.download(outputPath, fileName);
echo   } catch (err) {
echo     console.error(err);
echo     res.status(500).send('视频生成失败');
echo   }
echo });
echo.
echo app.listen(port, () =^> {
echo   console.log(`服务已启动：http://localhost:${port}`);
echo });
) > server.js
endlocal
 
echo.
echo ================================================= 