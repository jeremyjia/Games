@echo off
setlocal enabledelayedexpansion

set "output=index.html"
set "count=0"
set "css=style.css"

:: 删除旧文件
if exist "%output%" del "%output%"
if exist "%css%" del "%css%"

:: 生成CSS样式表
(
echo body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f0f0f0; }
echo .container { display: grid; grid-template-columns: 250px 1fr; gap: 20px; max-width: 1200px; margin: auto; }
echo .playlist { background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
echo .player-box { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
echo audio { width: 100%%; margin-bottom: 20px; }
echo .lyrics { height: 400px; overflow-y: auto; padding: 10px; background: #333; color: white; border-radius: 5px; }
echo .lyric-line { margin: 5px 0; transition: all 0.3s; }
echo .highlight { color: #ff6b6b; font-size: 1.2em; font-weight: bold; }
echo .song-item { padding: 8px; cursor: pointer; border-radius: 4px; }
echo .song-item:hover { background: #f0f0f0; }
) > "%css%"

:: 写入HTML头部
(
echo ^<!DOCTYPE html^>
echo ^<html^>
echo ^<head^>
echo ^<title^>多媒体播放器^</title^>
echo ^<meta charset="UTF-8"^>
echo ^<link rel="stylesheet" href="!css!"^>
echo ^</head^>
echo ^<body^>
echo ^<div class="container"^>
echo ^<div class="playlist"^>
echo ^<h2^>播放列表^</h2^>
echo ^<div id="playlist"^>
) > "%output%"

:: 遍历多媒体文件
for %%i in (*.mp3 *.html) do (
    if /i not "%%i"=="%output%" (
        set /a "count+=1"
        set "filename=%%i"
        set "filename=!filename:&=^&amp;!"
        set "filename=!filename:<=^&lt;!"
        set "filename=!filename:>=^&gt;!"
        
        echo ^<div class="song-item" onclick="loadMedia('!filename!')"^>%%i^</div^> >> "%output%"
        
        if /i "%%~xi"==".mp3" (
            set "lrcfile=%%~ni.lrc"
            if exist "!lrcfile!" (
                set "lyrics="
                for /f "usebackq delims=" %%L in ("!lrcfile!") do (
                    set "line=%%L"
                    set "line=!line:[=!"
                    set "line=!line:]= !"
                    for /f "tokens=1-3 delims=:." %%a in ("!line!") do (
                        if not "%%a"=="" if not "%%b"=="" (
                            set /a "time=%%a*60 + %%b"
                            set "text=%%c"
                            set "text=!text:&=^&amp;!"
                            set "text=!text:<=^&lt;!"
                            set "text=!text:>=^&gt;!"
                            set "text=!text:'=^'!"
                            set "text=!text:!=^^^!"
                            if defined text (
                                set "lyrics=!lyrics!{time: !time!, text: '!text!'},"
                            )
                        )
                    )
                )
                if defined lyrics (
                    set "lyrics=!lyrics:~0,-1!"
                )
                echo ^<script^> >> "%output%"
                echo lyricsDB['%%i'] = [!lyrics!]; >> "%output%"
                echo ^</script^> >> "%output%"
            )
        )
    )
)

:: 处理无文件情况
if %count% equ 0 (
    echo ^<p^>无可用媒体文件^</p^> >> "%output%"
)

:: 写入播放器部分
(
echo ^</div^>
echo ^</div^>
echo ^<div class="player-box"^>
echo ^<audio id="player" controls^>
echo ^<source src="" type="audio/mpeg"^>
echo ^</audio^>
echo ^<div class="lyrics" id="lyricsBox"^>
echo ^</div^>
echo ^</div^>
echo ^</div^>
echo ^<script^>
echo const lyricsDB = {};
echo let currentLyrics = [];
echo
echo function loadMedia(filename) {
echo   const player = document.getElementById('player');
echo   player.src = filename;
echo   currentLyrics = lyricsDB[filename] || [];
echo   updateLyricsDisplay();
echo   player.play();
echo }
echo
echo function updateLyricsDisplay() {
echo   const box = document.getElementById('lyricsBox');
echo   box.innerHTML = currentLyrics.map(l => ^
echo     `^<div class="lyric-line" data-time="${l.time}"^>${l.text}^</div^>`).join('');
echo }
echo
echo document.getElementById('player').addEventListener('timeupdate', function() {
echo   const ct = Math.floor(this.currentTime);
echo   const lines = document.querySelectorAll('.lyric-line');
echo   lines.forEach((line, index) => {
echo     line.classList.remove('highlight');
echo     const nextTime = index ^< lines.length - 1 ? lines[index + 1].dataset.time : 9999;
echo     if (ct >= line.dataset.time ^&^& ct ^< nextTime) {
echo       line.classList.add('highlight');
echo       line.scrollIntoView({ behavior: 'smooth', block: 'center' });
echo     }
echo   });
echo });
echo ^</script^>
echo ^</body^>
echo ^</html^>
) >> "%output%"

:: 完成提示
echo 已生成多媒体播放器：%output%
start "" "%output%"