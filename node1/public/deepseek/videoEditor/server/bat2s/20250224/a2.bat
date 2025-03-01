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

REM 生成移动友好主页和JS类
cd public

REM 生成JavaScript类文件
mkdir js
cd js
echo class AppClass { > appClass.js
echo   static createWindow(content) { >> appClass.js
echo     const win = document.createElement('div'); >> appClass.js
echo     win.className = 'draggable-window'; >> appClass.js
echo     win.innerHTML = ` >> appClass.js
echo       ^<div class="window-header"^> >> appClass.js
echo         ^<span^>弹出窗口^</span^> >> appClass.js
echo         ^<button class="close-btn"^>×^</button^> >> appClass.js
echo       ^</div^> >> appClass.js
echo       ^<div class="window-content"^>${content}^</div^> >> appClass.js
echo     `; >> appClass.js
echo     document.body.appendChild(win); >> appClass.js
 
echo     // 窗口拖动逻辑 >> appClass.js
echo     let isDragging = false; >> appClass.js
echo     let startX, startY, initialX, initialY; >> appClass.js
echo     const header = win.querySelector('.window-header'); >> appClass.js
 
echo     header.addEventListener('mousedown', (e) =^> { >> appClass.js
echo       isDragging = true; >> appClass.js
echo       startX = e.clientX; >> appClass.js
echo       startY = e.clientY; >> appClass.js
echo       initialX = win.offsetLeft; >> appClass.js
echo       initialY = win.offsetTop; >> appClass.js
echo     }); >> appClass.js
 
echo     document.addEventListener('mousemove', (e) =^> { >> appClass.js
echo       if (!isDragging) return; >> appClass.js
echo       win.style.left = `${initialX + e.clientX - startX}px`; >> appClass.js
echo       win.style.top = `${initialY + e.clientY - startY}px`; >> appClass.js
echo     }); >> appClass.js
 
echo     document.addEventListener('mouseup', () =^> { >> appClass.js
echo       isDragging = false; >> appClass.js
echo     }); >> appClass.js
 
echo     // 关闭按钮逻辑 >> appClass.js
echo     win.querySelector('.close-btn').addEventListener('click', () =^> { >> appClass.js
echo       win.remove(); >> appClass.js
echo     }); >> appClass.js
echo   } >> appClass.js
 
echo   static   openWindow1() { >> appClass.js
echo     this.createWindow('^<p^>这是第一个窗口内容^</p^>'); >> appClass.js
echo   } >> appClass.js
 
echo   static   openWindow2() { >> appClass.js
echo     this.createWindow('^<p^>这是第二个窗口内容^</p^>'); >> appClass.js
echo   } >> appClass.js
echo } >> appClass.js
cd ..

REM 生成增强版主页
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
echo     .btn-group { margin: 2rem 0; display: flex; gap: 1rem; } >> index.html
echo     button { >> index.html
echo       padding: 0.8rem 1.5rem; >> index.html
echo       background: #2563eb; >> index.html
echo       color: white; >> index.html
echo       border: none; >> index.html
echo       border-radius: 0.5rem; >> index.html
echo       cursor: pointer; >> index.html
echo     } >> index.html
echo     @media (max-width: 480px) { >> index.html
echo       h1 { font-size: 2rem; } >> index.html
echo       .btn-group { flex-direction: column; } >> index.html
echo       button { width: 100%%; } >> index.html
echo     } >> index.html
echo     .draggable-window { >> index.html
echo       position: absolute; >> index.html
echo       background: white; >> index.html
echo       border: 1px solid #ccc; >> index.html
echo       box-shadow: 0 2px 10px rgba(0,0,0,0.1); >> index.html
echo       min-width: 300px; >> index.html
echo     } >> index.html
echo     .window-header { >> index.html
echo       padding: 0.5rem 1rem; >> index.html
echo       background: #f0f0f0; >> index.html
echo       display: flex; >> index.html
echo       justify-content: space-between; >> index.html
echo       align-items: center; >> index.html
echo       cursor: move; >> index.html
echo     } >> index.html
echo     .close-btn { >> index.html
echo       background: transparent; >> index.html
echo       border: none; >> index.html
echo       font-size: 1.5rem; >> index.html
echo       cursor: pointer; >> index.html
echo     } >> index.html
echo     .window-content { >> index.html
echo       padding: 1rem; >> index.html
echo     } >> index.html
echo   ^</style^> >> index.html
echo ^</head^> >> index.html
echo ^<body^> >> index.html
echo   ^<div class="container"^> >> index.html
echo     ^<h1^>📱 移动测试就绪^</h1^> >> index.html
echo     ^<div class="btn-group"^> >> index.html
echo       ^<button onclick="AppClass.openWindow1()"^>win1^</button^> >> index.html
echo       ^<button onclick="AppClass.openWindow2()"^>win2^</button^> >> index.html
echo     ^</div^> >> index.html
echo     ^<p^>恭喜！您的Node.js服务器已在端口3006成功运行。^</p^> >> index.html
echo     ^<p^>在移动设备访问时请确保：^</p^> >> index.html
echo     ^<ul^> >> index.html
echo       ^<li^>设备与服务器在同一网络^</li^> >> index.html
echo       ^<li^>使用服务器的真实IP地址访问^</li^> >> index.html
echo       ^<li^>保持URL格式为：http://IP地址:3006^</li^> >> index.html
echo     ^</ul^> >> index.html
echo   ^</div^> >> index.html
echo   ^<script src="/js/appClass.js"^>^</script^> >> index.html
echo ^</body^> >> index.html
echo ^</html^> >> index.html

REM 返回根目录并安装依赖
cd ..
REM npm install
REM npm start