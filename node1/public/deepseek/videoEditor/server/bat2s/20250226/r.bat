@echo off
setlocal enabledelayedexpansion

mkdir myNodeApp
cd myNodeApp

echo const express = require('express'); > index.js
echo const fs = require('fs'); >> index.js
echo const path = require('path'); >> index.js
echo const app = express(); >> index.js
echo app.use(express.static('public')); >> index.js
echo app.get('/plugins', (req, res) =^> { >> index.js
echo   fs.readdir('public/plugIns', (err, files) =^> { >> index.js
echo     res.json(files.filter(f =^> f.endsWith('.js'))); >> index.js
echo   }); >> index.js
echo }); >> index.js
echo app.listen(3000, () =^> console.log('Server running on port 3000')); >> index.js

mkdir public
cd public

echo ^<!DOCTYPE html^> > index.html
echo ^<html^> >> index.html
echo ^<head^> >> index.html
echo   ^<meta charset="UTF-8"^> >> index.html
echo   ^<meta name="viewport" content="width=device-width, initial-scale=1.0"^> >> index.html
echo   ^<title^>Node App^</title^> >> index.html
echo ^</head^> >> index.html
echo ^<body^> >> index.html
echo   ^<script src="/util/floatingWindow.js"^>^</script^> >> index.html
echo   ^<script src="main.js"^>^</script^> >> index.html
echo ^</body^> >> index.html
echo ^</html^> >> index.html

echo class PluginManager { > main.js
echo   constructor() { >> main.js
echo     this.plugins = {}; >> main.js
echo     this.init(); >> main.js
echo   } >> main.js
echo   async init() { >> main.js
echo     const response = await fetch('/plugins'); >> main.js
echo     const plugins = await response.json(); >> main.js
echo     this.createToolbar(plugins); >> main.js
echo   } >> main.js
echo   createToolbar(plugins) { >> main.js
echo     const toolbar = document.createElement('div'); >> main.js
echo     toolbar.style = 'position:fixed;bottom:0;width:100%%;background:#333;padding:10px;z-index:9999'; >> main.js
echo     plugins.forEach(name =^> { >> main.js
echo       const btn = document.createElement('button'); >> main.js
echo       btn.textContent = name.replace('.js',''); >> main.js
echo       btn.style.margin = '0 5px'; >> main.js
echo       btn.onclick = () =^> this.togglePlugin(name); >> main.js
echo       toolbar.appendChild(btn); >> main.js
echo     }); >> main.js
echo     document.body.appendChild(toolbar); >> main.js
echo   } >> main.js
echo   togglePlugin(name) { >> main.js
echo     if (!this.plugins[name]) { >> main.js
echo       import(`/plugIns/${name}`).then(module =^> { >> main.js
echo         const PluginClass = window[name.replace('.js','')]; >> main.js
echo         if (!PluginClass) throw new Error('插件类未注册'); >> main.js
echo         this.plugins[name] = new PluginClass(); >> main.js
echo         this.plugins[name].showUI(); >> main.js
echo         if (!this.plugins[name].window) { >> main.js
echo           console.error(' 插件未正确初始化 window 属性 ' ); >> main.js
echo         } >> main.js
echo       }).catch(err =^> console.error('加载失败:', err)); >> main.js
echo     } else { >> main.js
echo       this.plugins[name].window.toggleVisibility(); >> main.js
echo     } >> main.js
echo   } >> main.js
echo } >> main.js
echo new PluginManager(); >> main.js

mkdir plugIns
cd plugIns
echo class p1 { > p1.js
echo   showUI() { >> p1.js
echo     const content = document.createElement('div'); >> p1.js
echo     content.innerHTML = '^<h1^>Plugin 1^</h1^>'; >> p1.js
echo     this.window = new window.FloatingWindow(content, { title: 'Plugin 1' });  >> p1.js
echo   } >> p1.js
echo } >> p1.js
echo window.p1 = p1; >> p1.js
 
echo class p2 { > p2.js
echo   showUI() { >> p2.js
echo     const content = document.createElement('div'); >> p2.js
echo     content.innerHTML = '^<h1^>Plugin 2^</h1^>'; >> p2.js
echo     this.window = new window.FloatingWindow(content, { title: 'Plugin 2' }); >> p2.js
echo   } >> p2.js
echo } >> p2.js
echo window.p2 = p2; >> p2.js

cd ..
mkdir util
cd util
 
echo class FloatingWindow { > floatingWindow.js
echo   constructor(content, options) { >> floatingWindow.js
echo     if (!content) throw new Error('必须提供内容参数'); >> floatingWindow.js
echo     this.visible = true; >> floatingWindow.js
echo     this.window = document.createElement('div'); >> floatingWindow.js
echo     this.window.style = 'position:absolute;border:1px solid #000;background:#fff;z-index:10000'; >> floatingWindow.js
echo     this.header = document.createElement('div'); >> floatingWindow.js
echo     this.header.textContent = options.title ^|^| 'Window'; >> floatingWindow.js
echo     this.header.style = 'background:#ddd;padding:5px;cursor:move'; >> floatingWindow.js
echo     this.content = content; >> floatingWindow.js
echo     this.window.appendChild(this.header); >> floatingWindow.js
echo     this.window.appendChild(this.content); >> floatingWindow.js
echo     document.body.appendChild(this.window); >> floatingWindow.js
echo     this.makeDraggable(); >> floatingWindow.js
echo   } >> floatingWindow.js
echo   makeDraggable() { >> floatingWindow.js
echo     let isDragging = false; >> floatingWindow.js
echo     let offset = [0,0]; >> floatingWindow.js
echo     this.header.onmousedown = (e) =^> { >> floatingWindow.js
echo       isDragging = true; >> floatingWindow.js
echo       offset = [e.clientX - this.window.offsetLeft, e.clientY - this.window.offsetTop]; >> floatingWindow.js
echo     }; >> floatingWindow.js
echo     document.onmousemove = (e) =^> { >> floatingWindow.js
echo       if (isDragging) { >> floatingWindow.js
echo         this.window.style.left = (e.clientX - offset[0]) + 'px'; >> floatingWindow.js
echo         this.window.style.top = (e.clientY - offset[1]) + 'px'; >> floatingWindow.js
echo       } >> floatingWindow.js
echo     }; >> floatingWindow.js
echo     document.onmouseup = () =^> isDragging = false; >> floatingWindow.js
echo   } >> floatingWindow.js
echo   toggleVisibility() { >> floatingWindow.js
echo     this.visible = !this.visible; >> floatingWindow.js
echo     this.window.style.display = this.visible ? '' : 'none'; >> floatingWindow.js
echo   } >> floatingWindow.js
echo } >> floatingWindow.js
 