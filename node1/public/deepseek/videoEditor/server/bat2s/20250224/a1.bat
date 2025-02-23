@echo off
REM 创建项目目录和文件结构
mkdir my-node-server
cd my-node-server
mkdir public

REM 生成server.js
echo const express = require('express'); > server.js
echo const app = express(); >> server.js
echo app.use(express.static('public')); >> server.js
echo const port = 3006; >> server.js
echo app.listen(port, ^(^) =^> { >> server.js
echo   console.log(`Server is running on http://localhost:${port}`); >> server.js
echo }); >> server.js

REM 生成package.json
echo { > package.json
echo   "name": "mobile-node-server", >> package.json
echo   "version": "1.0.0", >> package.json
echo   "main": "server.js", >> package.json
echo   "scripts": { >> package.json
echo     "start": "node server.js" >> package.json
echo   }, >> package.json
echo   "dependencies": { >> package.json
echo     "express": "^4.18.2" >> package.json
echo   } >> package.json
echo } >> package.json

REM 生成移动友好主页
cd public
echo ^<!DOCTYPE html^> > index.html
echo ^<html lang="en"^> >> index.html
echo ^<head^> >> index.html
echo   ^<meta charset="UTF-8"^> >> index.html
echo   ^<meta name="viewport" content="width=device-width, initial-scale=1.0"^> >> index.html
echo   ^<title^>Mobile Ready Server^</title^> >> index.html
echo   ^<style^> >> index.html
echo     body { font-family: system-ui, sans-serif; margin: 0; padding: 2rem; } >> index.html
echo     .container { max-width: 680px; margin: 0 auto; } >> index.html
echo     h1 { color: #2563eb; font-size: 2.5rem; } >> index.html
echo     p { color: #4b5563; line-height: 1.6; } >> index.html
echo     @media (max-width: 480px) { >> index.html
echo       h1 { font-size: 2rem; } >> index.html
echo     } >> index.html
echo   ^</style^> >> index.html
echo ^</head^> >> index.html
echo ^<body^> >> index.html
echo   ^<div class="container"^> >> index.html
echo     ^<h1^>📱 移动测试就绪^</h1^> >> index.html
echo     ^<p^>恭喜！您的Node.js服务器已在端口3006成功运行。^</p^> >> index.html
echo     ^<p^>在移动设备访问时请确保：^</p^> >> index.html
echo     ^<ul^> >> index.html
echo       ^<li^>设备与服务器在同一网络^</li^> >> index.html
echo       ^<li^>使用服务器的真实IP地址访问^</li^> >> index.html
echo       ^<li^>保持URL格式为：http://IP地址:3006^</li^> >> index.html
echo     ^</ul^> >> index.html
echo   ^</div^> >> index.html
echo ^</body^> >> index.html
echo ^</html^> >> index.html

REM 返回根目录并安装依赖
cd ..
REM npm install
REM npm start