@echo off
mkdir public 2>nul
mkdir public\plugIns 2>nul

echo const express = require('express')^; > server.js
echo const fs = require('fs')^; >> server.js
echo const path = require('path')^; >> server.js
echo const app = express()^; >> server.js
echo app.use(express.static('public'))^; >> server.js
echo app.get('/plugins', (req, res) =^> ^{ >> server.js
echo   const pluginDir = path.join(__dirname, 'public', 'plugIns')^; >> server.js
echo   fs.readdir(pluginDir, (err, files) =^> ^{ >> server.js
echo     if (err) return res.status(500).json([])^; >> server.js
echo     res.json(files.filter(f => f.endsWith('.js'))^; >> server.js
echo   })^; >> server.js
echo })^; >> server.js
echo app.listen(3000, () => console.log('Server running on port 3000'))^; >> server.js

echo ^<!DOCTYPE html^> > public\index.html
echo ^<html^> >> public\index.html
echo ^<head^> >> public\index.html
echo   ^<meta charset="UTF-8"^> >> public\index.html
echo   ^<meta name="viewport" content="width=device-width, initial-scale=1.0"^> >> public\index.html
echo   ^<title^>Plugin System^</title^> >> public\index.html
echo ^</head^> >> public\index.html
echo ^<body^> >> public\index.html
echo   ^<script src="main.js"^>^</script^> >> public\index.html
echo ^</body^> >> public\index.html
echo ^</html^> >> public\index.html

echo // Dynamic DOM and Style creation > public\main.js
echo document.addEventListener('DOMContentLoaded', async () => ^{ >> public\main.js
echo   const toolbar = document.createElement('div')^; >> public\main.js
echo   toolbar.style.cssText = 'position:fixed;left:0;top:0;background:^#333;padding:10px;z-index:1000;'^; >> public\main.js
echo   document.body.appendChild(toolbar)^; >> public\main.js
echo   const plugins = await fetch('/plugins').then(res => res.json())^; >> public\main.js
echo   plugins.forEach(name => ^{ >> public\main.js
echo     const btn = document.createElement('button')^; >> public\main.js
echo     btn.textContent = name.replace('.js', '')^; >> public\main.js
echo     btn.style.cssText = 'margin:0 5px;padding:5px 10px;'^; >> public\main.js
echo     let pluginInstance = null^; >> public\main.js
echo     btn.addEventListener('click', async () => ^{ >> public\main.js
echo       if (!pluginInstance) { >> public\main.js
echo         const module = await import(`./plugIns/${name}`)^; >> public\main.js
echo         pluginInstance = new module.default()^; >> public\main.js
echo         pluginInstance.showUI()^; >> public\main.js
echo       } else { >> public\main.js
echo         pluginInstance.uiContainer.hidden = ^!pluginInstance.uiContainer.hidden^; >> public\main.js
echo       } >> public\main.js
echo     })^; >> public\main.js
echo     toolbar.appendChild(btn)^; >> public\main.js
echo   })^; >> public\main.js
echo })^; >> public\main.js

echo export default class Plugin1 { > public\plugIns\p1.js
echo   showUI() { >> public\plugIns\p1.js
echo     this.uiContainer = document.createElement('div')^; >> public\plugIns\p1.js
echo     this.uiContainer.style.cssText = 'position:absolute;border:1px solid ^#ccc;background:white;padding:20px;'^; >> public\plugIns\p1.js
echo     this.uiContainer.innerHTML = '^<h3^>Plugin 1^</h3^>^<p^>Sample content^</p^>'^; >> public\plugIns\p1.js
echo     document.body.appendChild(this.uiContainer)^; >> public\plugIns\p1.js
echo     this.makeDraggable(this.uiContainer)^; >> public\plugIns\p1.js
echo   } >> public\plugIns\p1.js
echo   makeDraggable(element) { >> public\plugIns\p1.js
echo     let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0^; >> public\plugIns\p1.js
echo     element.addEventListener('mousedown', dragStart)^; >> public\plugIns\p1.js
echo     function dragStart(e) { >> public\plugIns\p1.js
echo       e.preventDefault()^; >> public\plugIns\p1.js
echo       pos3 = e.clientX^; >> public\plugIns\p1.js
echo       pos4 = e.clientY^; >> public\plugIns\p1.js
echo       document.addEventListener('mouseup', dragEnd)^; >> public\plugIns\p1.js
echo       document.addEventListener('mousemove', drag)^; >> public\plugIns\p1.js
echo     } >> public\plugIns\p1.js
echo     function drag(e) { >> public\plugIns\p1.js
echo       pos1 = pos3 - e.clientX^; >> public\plugIns\p1.js
echo       pos2 = pos4 - e.clientY^; >> public\plugIns\p1.js
echo       pos3 = e.clientX^; >> public\plugIns\p1.js
echo       pos4 = e.clientY^; >> public\plugIns\p1.js
echo       element.style.top = (element.offsetTop - pos2) + 'px'^; >> public\plugIns\p1.js
echo       element.style.left = (element.offsetLeft - pos1) + 'px'^; >> public\plugIns\p1.js
echo     } >> public\plugIns\p1.js
echo     function dragEnd() { >> public\plugIns\p1.js
echo       document.removeEventListener('mouseup', dragEnd)^; >> public\plugIns\p1.js
echo       document.removeEventListener('mousemove', drag)^; >> public\plugIns\p1.js
echo     } >> public\plugIns\p1.js
echo   } >> public\plugIns\p1.js
echo } >> public\plugIns\p1.js

echo export default class Plugin2 { > public\plugIns\p2.js
echo   showUI() { >> public\plugIns\p2.js
echo     this.uiContainer = document.createElement('div')^; >> public\plugIns\p2.js
echo     this.uiContainer.style.cssText = 'position:absolute;border:1px solid ^#ccc;background:white;padding:20px;'^; >> public\plugIns\p2.js
echo     this.uiContainer.innerHTML = '^<h3^>Plugin 2^</h3^>^<p^>Another plugin^</p^>'^; >> public\plugIns\p2.js
echo     document.body.appendChild(this.uiContainer)^; >> public\plugIns\p2.js
echo     this.makeDraggable(this.uiContainer)^; >> public\plugIns\p2.js
echo   } >> public\plugIns\p2.js
echo   makeDraggable(element) { >> public\plugIns\p2.js
echo     // Same drag implementation as Plugin1 >> public\plugIns\p2.js
echo   } >> public\plugIns\p2.js
echo } >> public\plugIns\p2.js

echo Installation complete. Run following commands:
echo npm install express
echo node server.js