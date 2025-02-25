@echo off
setlocal enabledelayedexpansion

mkdir my-node-project
cd my-node-project

:: 创建项目结构
mkdir public
mkdir public\plugIns
mkdir server

:: 生成package.json
(
echo {
echo   "name": "node-web-server",
echo   "version": "1.0.0",
echo   "description": "",
echo   "main": "server/server.js",
echo   "scripts": {
echo     "start": "node server/server.js"
echo   },
echo   "dependencies": {
echo     "express": "^4.18.2",
echo     "cors": "^2.8.5"
echo   }
echo }
) > package.json

:: 生成服务器文件
(
echo const express = require('express');
echo const cors = require('cors');
echo const fs = require('fs');
echo const path = require('path');
echo 
echo const app = express();
echo const PORT = 3000;
echo 
echo app.use(cors());
echo app.use(express.static('public'));
echo 
echo app.get('/plugins', (req, res) => {
echo   fs.readdir(path.join(__dirname, '../public/plugIns'), (err, files) => {
echo     if (err) return res.status(500).send(err);
echo     const plugins = files.filter(f => f.endsWith('.js')).map(f => f.replace('.js', ''));
echo     res.json(plugins);
echo   });
echo });
echo 
echo app.listen(PORT, () => {
echo   console.log(`Server running at http://localhost:${PORT}`);
echo });
) > server\server.js

:: 生成主页
(
echo ^<!DOCTYPE html^>
echo ^<html^>
echo ^<head^>
echo   ^<meta charset="UTF-8"^>
echo   ^<meta name="viewport" content="width=device-width, initial-scale=1.0"^>
echo   ^<title^>Plugin System^</title^>
echo   ^<script src="main.js" defer^>^</script^>
echo ^</head^>
echo ^<body^>
echo   ^<div id="toolbar" style="padding: 10px; background: #f0f0f0;"^>^</div^>
echo ^</body^>
echo ^</html^>
) > public\index.html

:: 生成main.js
(
echo class PluginManager {
echo   constructor() {
echo     this.pluginWindows = new Map();
echo     this.loadPlugins();
echo   }
echo 
echo   async loadPlugins() {
echo     const response = await fetch('/plugins');
echo     const plugins = await response.json();
echo     
echo     const toolbar = document.getElementById('toolbar');
echo     plugins.forEach(pluginName => {
echo       const btn = document.createElement('button');
echo       btn.textContent = pluginName;
echo       btn.style.margin = '5px';
echo       btn.onclick = () => this.togglePlugin(pluginName);
echo       toolbar.appendChild(btn);
echo     });
echo   }
echo 
echo   togglePlugin(pluginName) {
echo     if (!this.pluginWindows.has(pluginName)) {
echo       this.loadPluginScript(pluginName);
echo     } else {
echo       const win = this.pluginWindows.get(pluginName);
echo       win.style.display = win.style.display === 'none' ? 'block' : 'none';
echo     }
echo   }
echo 
echo   loadPluginScript(pluginName) {
echo     const script = document.createElement('script');
echo     script.src = `plugIns/${pluginName}.js`;
echo     script.onload = () => {
echo       const plugin = new window[pluginName]();
echo       const win = plugin.showUI();
echo       this.makeDraggable(win);
echo       this.pluginWindows.set(pluginName, win);
echo     };
echo     document.head.appendChild(script);
echo   }
echo 
echo   makeDraggable(element) {
echo     let isDragging = false;
echo     let offset = [0,0];
echo     
echo     element.style.position = 'absolute';
echo     element.style.cursor = 'move';
echo     
echo     element.addEventListener('mousedown', (e) => {
echo       isDragging = true;
echo       offset = [
echo         e.clientX - element.offsetLeft,
echo         e.clientY - element.offsetTop
echo       ];
echo     });
echo 
echo     document.addEventListener('mousemove', (e) => {
echo       if (isDragging) {
echo         element.style.left = (e.clientX - offset[0]) + 'px';
echo         element.style.top = (e.clientY - offset[1]) + 'px';
echo       }
echo     });
echo 
echo     document.addEventListener('mouseup', () => {
echo       isDragging = false;
echo     });
echo   }
echo }
echo 
echo // 初始化插件系统
echo new PluginManager();
) > public\main.js

:: 生成插件模板
(
echo class p1 {
echo   showUI() {
echo     const pluginWindow = document.createElement('div');
echo     pluginWindow.style = `
echo       position: absolute;
echo       width: 200px;
echo       height: 150px;
echo       background: #fff;
echo       border: 1px solid #ccc;
echo       padding: 10px;
echo       box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
echo     `;
echo     pluginWindow.innerHTML = `
echo       ^<h3 style="margin:0"^>插件1^</h3^>
echo       ^<p^>这是第一个插件示例^</p^>
echo       ^<button onclick="this.parentElement.style.display='none'"^>关闭^</button^>
echo     `;
echo     document.body.appendChild(pluginWindow);
echo     return pluginWindow;
echo   }
echo }
) > public\plugIns\p1.js

(
echo class p2 {
echo   showUI() {
echo     const pluginWindow = document.createElement('div');
echo     pluginWindow.style = `
echo       position: absolute;
echo       width: 220px;
echo       height: 180px;
echo       background: #f0f0ff;
echo       border: 2px solid blue;
echo       padding: 15px;
echo       box-shadow: 3px 3px 10px rgba(0,0,0,0.3);
echo     `;
echo     pluginWindow.innerHTML = `
echo       ^<h3 style="color: blue; margin:0"^>插件2^</h3^>
echo       ^<p^>第二个插件示例内容^</p^>
echo       ^<button style="background: blue; color: white" 
echo               onclick="this.parentElement.style.display='none'"^>
echo         关闭
echo       ^</button^>
echo     `;
echo     document.body.appendChild(pluginWindow);
echo     return pluginWindow;
echo   }
echo }
) > public\plugIns\p2.js

:: 安装依赖并启动
echo 正在安装依赖...
call npm install

echo 项目创建完成！
echo 使用以下命令启动服务：
echo cd my-node-project
echo npm start
echo 然后在手机浏览器访问：http://你的电脑IP:3000

 