@echo off
REM 创建项目目录和文件结构
mkdir my-node-server
cd my-node-server
mkdir public

REM 生成index.js
echo const express = require('express'); > index.js
echo const app = express(); >> index.js
echo app.use(express.static('public')); >> index.js
echo const port = 3006; >> index.js
echo app.listen(port, ^(^) =^> { >> index.js
echo   console.log(`Server is running on http://localhost:${port}`); >> index.js
echo }); >> index.js

REM 生成package.json
echo { > package.json
echo   "name": "mobile-node-server", >> package.json
echo   "version": "1.0.0", >> package.json
echo   "main": "index.js", >> package.json
echo   "scripts": { >> package.json
echo     "start": "node index.js" >> package.json
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

REM 生成appClass.js（更新后的openWindow3方法）
echo class AppClass { > appClass.js
echo   static currentWindows = {}; >> appClass.js

echo   static createWindow(id, content) { >> appClass.js
echo     const win = document.createElement('div'); >> appClass.js
echo     win.className = 'draggable-window'; >> appClass.js
echo     win.dataset.windowId = id; >> appClass.js
echo     const left = Math.floor( Math.random() * (window.innerWidth - 300) ) + 50; >> appClass.js
echo     const top = Math.floor( Math.random() * (window.innerHeight - 200) ) + 50; >> appClass.js
echo     win.style.left = `^${left}px`; >> appClass.js
echo     win.style.top = `^${top}px`; >> appClass.js
echo     win.innerHTML = ` >> appClass.js
echo       ^<div class="window-header"^> >> appClass.js
echo         ^<span^>弹出窗口^</span^> >> appClass.js
echo         ^<button class="close-btn"^>×^</button^> >> appClass.js
echo       ^</div^> >> appClass.js
echo       ^<div class="window-content"^>^${content}^</div^> >> appClass.js
echo     `; >> appClass.js
echo     document.body.appendChild(win); >> appClass.js

echo     // 统一的事件处理逻辑 >> appClass.js
echo     let isDragging = false; >> appClass.js
echo     let startX, startY, initialX, initialY; >> appClass.js
echo     const header = win.querySelector('.window-header'); >> appClass.js

echo     const startDrag = (clientX, clientY) =^> { >> appClass.js
echo       isDragging = true; >> appClass.js
echo       startX = clientX; >> appClass.js
echo       startY = clientY; >> appClass.js
echo       initialX = win.offsetLeft; >> appClass.js
echo       initialY = win.offsetTop; >> appClass.js
echo     }; >> appClass.js

echo     const moveDrag = (clientX, clientY) =^> { >> appClass.js
echo       if (!isDragging) return; >> appClass.js
echo       win.style.left = `^${initialX + clientX - startX}px`; >> appClass.js
echo       win.style.top = `^${initialY + clientY - startY}px`; >> appClass.js
echo     }; >> appClass.js

echo     const endDrag = () =^> { >> appClass.js
echo       isDragging = false; >> appClass.js
echo     }; >> appClass.js

echo     // 鼠标事件 >> appClass.js
echo     header.addEventListener('mousedown', (e) =^> { >> appClass.js
echo       startDrag(e.clientX, e.clientY); >> appClass.js
echo     }); >> appClass.js

echo     document.addEventListener('mousemove', (e) =^> { >> appClass.js
echo       moveDrag(e.clientX, e.clientY); >> appClass.js
echo     }); >> appClass.js

echo     document.addEventListener('mouseup', endDrag); >> appClass.js

echo     // 触摸事件处理 >> appClass.js
echo     header.addEventListener('touchstart', (e) =^> { >> appClass.js
echo       e.preventDefault(); >> appClass.js
echo       startDrag(e.touches[0].clientX, e.touches[0].clientY); >> appClass.js
echo     }, { passive: false }); >> appClass.js

echo     document.addEventListener('touchmove', (e) =^> { >> appClass.js
echo       e.preventDefault(); >> appClass.js
echo       moveDrag(e.touches[0].clientX, e.touches[0].clientY); >> appClass.js
echo     }, { passive: false }); >> appClass.js

echo     document.addEventListener('touchend', endDrag); >> appClass.js

echo     // 关闭按钮逻辑 >> appClass.js
echo     win.querySelector('.close-btn').addEventListener('click', () =^> { >> appClass.js
echo       const id = win.dataset.windowId; >> appClass.js
echo       win.remove(); >> appClass.js
echo       delete AppClass.currentWindows[id]; >> appClass.js
echo     }); >> appClass.js

echo     return win; >> appClass.js
echo   } >> appClass.js

echo   static toggleWindow(id, content) { >> appClass.js
echo     let win; >> appClass.js
echo     if (AppClass.currentWindows[id]) { >> appClass.js
echo       win = AppClass.currentWindows[id]; >> appClass.js
echo       win.style.display = win.style.display === 'none' ? 'block' : 'none'; >> appClass.js
echo     } else { >> appClass.js
echo       win = AppClass.createWindow(id, content); >> appClass.js
echo       AppClass.currentWindows[id] = win; >> appClass.js
echo     } >> appClass.js
echo     return win; >> appClass.js
echo   } >> appClass.js

echo   static openWindow1() { >> appClass.js
echo     AppClass.toggleWindow('window1', '^<p^>这是第一个窗口内容^</p^>'); >> appClass.js
echo   } >> appClass.js

echo   static openWindow2() { >> appClass.js
echo     AppClass.toggleWindow('window2', '^<p^>这是第二个窗口内容^</p^>'); >> appClass.js
echo   } >> appClass.js

echo   static openWindow3() { >> appClass.js
echo     const win = AppClass.toggleWindow('window3', sg.createUI()); >> appClass.js
echo   } >> appClass.js
echo } >> appClass.js

REM 生成snake.js（添加sg对象）
echo class SnakeGame { > snake.js
echo   constructor(canvas) { >> snake.js
echo     this.canvas = canvas; >> snake.js
echo     this.ctx = canvas.getContext('2d'); >> snake.js
echo     this.gridSize = 20; >> snake.js
echo     this.tileCount = canvas.width / this.gridSize; >> snake.js
echo     this.direction = 'right'; >> snake.js
echo     this.snake = [ >> snake.js
echo       { x: 5, y: 5 }, >> snake.js
echo       { x: 4, y: 5 }, >> snake.js
echo       { x: 3, y: 5 } >> snake.js
echo     ]; >> snake.js
echo     this.food = { x: 10, y: 10 }; >> snake.js
echo     this.score = 0; >> snake.js
echo     this.gameLoop = setInterval(() =^> this.update(), 100); >> snake.js
echo     this.bindEvents(); >> snake.js
echo   } >> snake.js

echo   bindEvents() { >> snake.js
echo     document.addEventListener('keydown', (e) =^> this.handleKey(e)); >> snake.js
echo     this.canvas.addEventListener('touchstart', (e) =^> this.handleTouchStart(e), false); >> snake.js
echo     this.canvas.addEventListener('touchmove', (e) =^> this.handleTouchMove(e), false); >> snake.js
echo   } >> snake.js

echo   handleKey(e) { >> snake.js
echo     switch(e.key) { >> snake.js
echo       case 'ArrowUp': if (this.direction !== 'down') this.direction = 'up'; break; >> snake.js
echo       case 'ArrowDown': if (this.direction !== 'up') this.direction = 'down'; break; >> snake.js
echo       case 'ArrowLeft': if (this.direction !== 'right') this.direction = 'left'; break; >> snake.js
echo       case 'ArrowRight': if (this.direction !== 'left') this.direction = 'right'; break; >> snake.js
echo     } >> snake.js
echo   } >> snake.js

echo   handleTouchStart(e) { >> snake.js
echo     e.preventDefault(); >> snake.js
echo     this.touchStartX = e.touches[0].clientX; >> snake.js
echo     this.touchStartY = e.touches[0].clientY; >> snake.js
echo   } >> snake.js

echo   handleTouchMove(e) { >> snake.js
echo     e.preventDefault(); >> snake.js
echo     const touchEndX = e.touches[0].clientX; >> snake.js
echo     const touchEndY = e.touches[0].clientY; >> snake.js
echo     const dx = touchEndX - this.touchStartX; >> snake.js
echo     const dy = touchEndY - this.touchStartY; >> snake.js
echo     if (Math.abs(dx) ^> Math.abs(dy)) { >> snake.js
echo       if (dx ^> 0 ^&^& this.direction !== 'left') this.direction = 'right'; >> snake.js
echo       else if (dx < 0 ^&^& this.direction !== 'right') this.direction = 'left'; >> snake.js
echo     } else { >> snake.js
echo       if (dy ^> 0 ^&^& this.direction !== 'up') this.direction = 'down'; >> snake.js
echo       else if (dy < 0 ^&^& this.direction !== 'down') this.direction = 'up'; >> snake.js
echo     } >> snake.js
echo   } >> snake.js

echo   update() { >> snake.js
echo     let head = { ...this.snake[0] }; >> snake.js
echo     switch(this.direction) { >> snake.js
echo       case 'up': head.y--; break; >> snake.js
echo       case 'down': head.y++; break; >> snake.js
echo       case 'left': head.x--; break; >> snake.js
echo       case 'right': head.x++; break; >> snake.js
echo     } >> snake.js
echo     if (head.x ^< 0 ^|^| head.x ^>= this.tileCount ^|^| head.y ^< 0 ^|^| head.y ^>= this.tileCount ^|^| this.checkCollision(head)) { >> snake.js
echo       clearInterval(this.gameLoop); >> snake.js
echo       alert('Game Over! Score: ' + this.score); >> snake.js
echo       return; >> snake.js
echo     } >> snake.js
echo     this.snake.unshift(head); >> snake.js
echo     if (head.x === this.food.x ^&^& head.y === this.food.y) { >> snake.js
echo       this.score += 10; >> snake.js
echo       this.generateFood(); >> snake.js
echo     } else { >> snake.js
echo       this.snake.pop(); >> snake.js
echo     } >> snake.js
echo     this.draw(); >> snake.js
echo   } >> snake.js

echo   checkCollision(head) { >> snake.js
echo     return this.snake.some((segment, index) =^> index !== 0 ^&^& segment.x === head.x ^&^& segment.y === head.y); >> snake.js
echo   } >> snake.js

echo   generateFood() { >> snake.js
echo     this.food = { >> snake.js
echo       x: Math.floor(Math.random() * this.tileCount), >> snake.js
echo       y: Math.floor(Math.random() * this.tileCount) >> snake.js
echo     }; >> snake.js
echo     while (this.snake.some(segment =^> segment.x === this.food.x ^&^& segment.y === this.food.y)) { >> snake.js
echo       this.food = { >> snake.js
echo         x: Math.floor(Math.random() * this.tileCount), >> snake.js
echo         y: Math.floor(Math.random() * this.tileCount) >> snake.js
echo       }; >> snake.js
echo     } >> snake.js
echo   } >> snake.js

echo   draw() { >> snake.js
echo     this.ctx.fillStyle = 'black'; >> snake.js
echo     this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height); >> snake.js
echo     this.ctx.fillStyle = 'lime'; >> snake.js
echo     this.snake.forEach(segment =^> { >> snake.js
echo       this.ctx.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize - 2, this.gridSize - 2); >> snake.js
echo     }); >> snake.js
echo     this.ctx.fillStyle = 'red'; >> snake.js
echo     this.ctx.fillRect(this.food.x * this.gridSize, this.food.y * this.gridSize, this.gridSize - 2, this.gridSize - 2); >> snake.js
echo   } >> snake.js
echo } >> snake.js

echo const sg = { >> snake.js
echo   createUI() { >> snake.js
echo     const content = '^<canvas id="snakeCanvas" width="400" height="400"^>^</canvas^>'; >> snake.js
echo     setTimeout(() =^> { >> snake.js
echo       const canvas = document.getElementById('snakeCanvas'); >> snake.js
echo       if (canvas) { >> snake.js
echo         new SnakeGame(canvas); >> snake.js
echo       } >> snake.js
echo     }, 0); >> snake.js
echo     return content; >> snake.js
echo   } >> snake.js
echo }; >> snake.js

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
echo     #snakeCanvas { background: black; } >> index.html
echo   ^</style^> >> index.html
echo ^</head^> >> index.html
echo ^<body^> >> index.html
echo   ^<div class="container"^> >> index.html
echo     ^<h1^>📱 移动测试就绪^</h1^> >> index.html
echo     ^<div class="btn-group"^> >> index.html
echo       ^<button onclick="AppClass.openWindow1()"^>win1^</button^> >> index.html
echo       ^<button onclick="AppClass.openWindow2()"^>win2^</button^> >> index.html
echo       ^<button onclick="AppClass.openWindow3()"^>Play Snake^</button^> >> index.html
echo     ^</div^> >> index.html
echo     ^<p^>恭喜！您的Node.js服务器已在端口3006成功运行。^</p^> >> index.html
echo     ^<p^>在移动设备访问时请确保：^</p^> >> index.html
echo     ^<ul^> >> index.html
echo       ^<li^>设备与服务器在同一网络^</li^> >> index.html
echo       ^<li^>使用服务器的真实IP地址访问^</li^> >> index.html
echo       ^<li^>保持URL格式为：http://IP地址:3006^</li^> >> index.html
echo     ^</ul^> >> index.html
echo   ^</div^> >> index.html
echo   ^<script src="/js/snake.js"^>^</script^> >> index.html
echo   ^<script src="/js/appClass.js"^>^</script^> >> index.html
echo ^</body^> >> index.html
echo ^</html^> >> index.html

REM 返回根目录并安装依赖
cd .. 
cd ..  