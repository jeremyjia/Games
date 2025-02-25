@echo off
setlocal enabledelayedexpansion

mkdir public 2>nul
mkdir public\plugIns 2>nul

(
echo const express = require('express');
echo const fs = require('fs');
echo const path = require('path');
echo const app = express();
echo app.use(express.static('public'));
echo 
echo app.get('/plugins', (req, res) =^> {
echo   fs.readdir(path.join(__dirname, 'public', 'plugIns'), (err, files) =^> {
echo     if (err) return res.status(500).send(err);
echo     res.json(files.filter(f =^> f.endsWith('.js')));
echo   });
echo });
echo 
echo app.listen(3000, () =^> {
echo   console.log('Server running on http://localhost:3000');
echo });
) > app.js

(
echo ^<!DOCTYPE html^>
echo ^<html^>
echo ^<head^>
echo   ^<meta charset="UTF-8"^>
echo   ^<meta name="viewport" content="width=device-width, initial-scale=1.0"^>
echo   ^<title^>Dynamic Plugins Demo^</title^>
echo   ^<script src="main.js"^>^</script^>
echo ^</head^>
echo ^<body^>
echo ^</body^>
echo ^</html^>
) > public\index.html

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
echo     this.createToolbar(plugins);
echo   }
echo 
echo   createToolbar(plugins) {
echo     const toolbar = document.createElement('div');
echo     toolbar.style = 'position:fixed;top:0;left:0;background:#333;padding:10px;z-index:9999;';
echo     
echo     plugins.forEach(plugin =^> {
echo       const btn = document.createElement('button');
echo       btn.textContent = plugin.replace('.js','');
echo       btn.style = 'margin-right:5px;padding:5px 10px;';
echo       btn.onclick = () =^> this.togglePlugin(plugin);
echo       toolbar.appendChild(btn);
echo     });
echo     
echo     document.body.prepend(toolbar);
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
echo     script.src = `plugIns/${pluginName}`;
echo     script.onload = () =^> {
echo       const plugin = new Plugin();
echo       const win = this.createPluginWindow();
echo       plugin.showUI(win.content);
echo       this.pluginWindows.set(pluginName, win.container);
echo     };
echo     document.head.appendChild(script);
echo   }
echo 
echo   createPluginWindow() {
echo     const container = document.createElement('div');
echo     container.style = `position:absolute;top:100px;left:100px;
echo       border:1px solid #ccc;background:white;box-shadow:2px 2px 5px rgba(0,0,0,0.3);`;
echo     
echo     const header = document.createElement('div');
echo     header.style = 'background:#eee;padding:5px;cursor:move;';
echo     header.textContent = 'Plugin Window';
echo     
echo     const content = document.createElement('div');
echo     content.style = 'padding:10px;min-width:200px;min-height:100px;';
echo     
echo     container.appendChild(header);
echo     container.appendChild(content);
echo     document.body.appendChild(container);
echo     
echo     // Make window draggable
echo     let isDragging = false;
echo     let startX, startY, startLeft, startTop;
echo     
echo     header.addEventListener('mousedown', e =^> {
echo       isDragging = true;
echo       startX = e.clientX;
echo       startY = e.clientY;
echo       startLeft = parseInt(container.style.left) || 0;
echo       startTop = parseInt(container.style.top) || 0;
echo       document.addEventListener('mousemove', move);
echo       document.addEventListener('mouseup', stop);
echo     });
echo     
echo     function move(e) {
echo       if (!isDragging) return;
echo       container.style.left = startLeft + e.clientX - startX + 'px';
echo       container.style.top = startTop + e.clientY - startY + 'px';
echo     }
echo     
echo     function stop() {
echo       isDragging = false;
echo       document.removeEventListener('mousemove', move);
echo       document.removeEventListener('mouseup', stop);
echo     }
echo     
echo     return { container, content };
echo   }
echo }
echo 
echo // Initialize plugin manager
echo new PluginManager();
) > public\main.js

(
echo class Plugin {
echo   showUI(container) {
echo     // Dynamic style
echo     const style = document.createElement('style');
echo     style.textContent = `
echo       .plugin-ui { padding: 10px; }
echo       .plugin-title { color: #2196F3; font-weight: bold; }
echo       .plugin-content { margin-top: 10px; }
echo     `;
echo     container.appendChild(style);
echo     
echo     // Dynamic DOM
echo     const ui = document.createElement('div');
echo     ui.className = 'plugin-ui';
echo     ui.innerHTML = ^
echo       '^<div class="plugin-title"^>Plugin 1 Demo^</div^>' +
echo       '^<div class="plugin-content"^>' +
echo         '^<input type="text" placeholder="Enter something" /^>' +
echo         '^<button onclick="alert(this.previousElementSibling.value)"^>Show Value^</button^>' +
echo       '^</div^>';
echo     container.appendChild(ui);
echo   }
echo }
) > public\plugIns\p1.js

(
echo class Plugin {
echo   showUI(container) {
echo     const style = document.createElement('style');
echo     style.textContent = `
echo       .plugin2-ui { background: #f0f0f0; padding: 15px; }
echo       .color-box { width:50px; height:50px; margin:5px; display:inline-block; }
echo     `;
echo     container.appendChild(style);
echo     
echo     const ui = document.createElement('div');
echo     ui.className = 'plugin2-ui';
echo     ui.innerHTML = ^
echo       '^<h3 style="margin:0"^>Color Picker^</h3^>' +
echo       '^<div^>' +
echo         '^<div class="color-box" style="background:red" onclick="this.style.background=this.style.background===''red''?''green'':''red''"^>^</div^>' +
echo         '^<div class="color-box" style="background:blue" onclick="this.style.background=this.style.background===''blue''?''yellow'':''blue''"^>^</div^>' +
echo       '^</div^>';
echo     container.appendChild(ui);
echo   }
echo }
) > public\plugIns\p2.js
 