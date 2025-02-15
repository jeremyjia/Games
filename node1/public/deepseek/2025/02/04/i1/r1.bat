@echo off
setlocal enabledelayedexpansion

set "output=index.html"

:: 删除旧文件（如果存在）
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

:: 遍历HTML文件并生成链接
for %%i in (*.html) do (
    echo ^<a href="%%i"^>%%i^</a^>^<br^> >> "%output%"
)

:: 写入HTML尾部
(
echo ^</body^>
echo ^</html^>
) >> "%output%"

:: 完成提示
echo 已生成网页文件：%output%
start "" "%output%"