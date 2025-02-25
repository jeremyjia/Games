@echo off
setlocal enabledelayedexpansion

mkdir mynodeapp
cd mynodeapp

:: Generate server.js
echo const express =^> require('express'); > server.js
echo const fs =^> require('fs'); >> server.js
echo const path =^> require('path'); >> server.js
echo const app =^> express(); >> server.js
echo app.use(express.static('public')); >> server.js
echo app.get('/getPlugins', (req, res) =^> { >> server.js
echo   fs.readdir('public/plugIns', (err, files) =^> { >> server.js
echo     res.json(files.filter(f =^> f.endsWith('.js'))); >> server.js
echo   }); >> server.js
echo }); >> server.js
echo app.listen(3000, () =^> console.log('Server running on port 3000')); >> server.js

:: Create public structure
mkdir public
cd public

echo ^<!DOCTYPE html^> > index.html
echo ^<html^> >> index.html
echo ^<head^>^<script src="main.js"^>^</script^>^</head^> >> index.html
echo ^<body^>^<div id="toolbar"^>^</div^>^</body^> >> index.html
echo ^</html^> >> index.html

echo class Plugin { >> main.js
echo  constructor(name) { this.name = name; this.window = null; } >> main.js
echo  createWindow() { >> main.js
echo    this.window = document.createElement('div'); >> main.js
echo    this.window.style = 'position:absolute;background:#fff;border:1px solid #000;'; >> main.js
echo    document.body.appendChild(this.window); >> main.js
echo  } >> main.js
echo } >> main.js

echo fetch('/getPlugins').then(r=^>r.json()).then(plugins=^>{ >> main.js
echo  plugins.forEach(p=^>{ >> main.js
echo    const btn = document.createElement('button'); >> main.js
echo    btn.textContent = p; >> main.js
echo    btn.onclick = ()=^>{ >> main.js
echo      import(`./plugIns/${p}`).then(m=^>{ >> main.js
echo        if(!window.pluginInsts) window.pluginInsts =^> {}; >> main.js
echo        const inst = window.pluginInsts[p] || new m.default(p); >> main.js
echo        inst.window ? inst.window.remove() : inst.createWindow(); >> main.js
echo        window.pluginInsts[p] = inst; >> main.js
echo      }); >> main.js
echo    }; >> main.js
echo    document.getElementById('toolbar').appendChild(btn); >> main.js
echo  }); >> main.js
echo }); >> main.js

mkdir plugIns
cd plugIns

echo export default class Plugin1 { >> p1.js
echo  showUI() { >> p1.js
echo    this.ui =^> document.createElement('div'); >> p1.js
echo    this.ui.innerHTML = 'Plugin 1 UI'; >> p1.js
echo    document.body.appendChild(this.ui); >> p1.js
echo  } >> p1.js
echo } >> p1.js

echo export default class Plugin2 { >> p2.js
echo  showUI() { >> p2.js
echo    this.ui =^> document.createElement('div'); >> p2.js
echo    this.ui.innerHTML = 'Plugin 2 UI'; >> p2.js
echo    document.body.appendChild(this.ui); >> p2.js
echo  } >> p2.js
echo } >> p2.js

cd ..\..\
echo Installation complete. Run these commands to start:
echo cd mynodeapp
echo npm install express
echo node server.js
endlocal