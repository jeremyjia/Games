@echo off
setlocal enabledelayedexpansion

set "output=index.html"
set "count=0"

:: 删除旧文件
if exist "%output%" del "%output%"

:: 写入HTML头部
(
echo ^<!DOCTYPE html^>
echo ^<html^>
echo ^<head^>
echo ^<title^>HTML文件列表^</title^>
echo ^<meta charset="UTF-8"^>
echo ^</head^>
echo ^<body^>
echo ^<h1^>当前目录HTML文件^</h1^>
) > "%output%"

:: 遍历并生成链接，排除自身
for %%i in (*.html) do (
    if /i not "%%i"=="%output%" (
        set /a "count+=1"
        set "filename=%%i"
        set "filename=!filename:&=^&amp;!"
        set "filename=!filename:<=^&lt;!"
        set "filename=!filename:>=^&gt;!"
        echo ^<a href="!filename!"^>!filename!^</a^>^<br^> >> "%output%"
    )
)

:: 处理无HTML文件的情况
if %count% equ 0 (
    echo ^<p^>无HTML文件^</p^> >> "%output%"
)

:: 写入HTML尾部
(
echo ^</body^>
echo ^</html^>
) >> "%output%"

:: 完成提示
echo 已生成网页文件：%output%
start "" "%output%"