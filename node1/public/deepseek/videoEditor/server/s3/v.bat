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
(
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
echo const bgColorMap = ^{
echo   '操场': '#90EE90',
echo   '马路边': '#A9A9A9',
echo   '树林': '#228B22',
echo   '海边': '#87CEEB'
echo ^};
echo. 
echo app.post('/generate-video',  async (req, res^)  =^> ^{

) > server.js

echo xdEND