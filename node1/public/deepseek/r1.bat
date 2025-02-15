@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

:: 设置输出文件名和临时标记
set "filename=success_page.html"
set "tempfile=temp.html"
set "errorflag=0"

:: 第一阶段：基础内容生成
(
    echo ^<!DOCTYPE html^>
    echo ^<html^>
    echo ^<head^>
    echo     ^<title^>生成成功^</title^>
    echo ^</head^>
    echo ^<body^>
    echo     ^<h1 style="color:green"^>基础内容生成成功^</h1^>
    echo ^</body^>
    echo ^</html^>
) > "%tempfile%"

:: 检查第一阶段生成结果
if not exist "%tempfile%" (
    echo 错误：第一阶段文件生成失败
    set "errorflag=1"
    goto :error
) else (
    echo 第一阶段验证通过
)

:: 第二阶段：完整内容生成
(
    echo ^<!DOCTYPE html^>
    echo ^<html lang="zh-CN"^>
    echo ^<head^>
    echo     ^<meta charset="UTF-8"^>
    echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0"^>
    echo     ^<title^>最终网页^</title^>
    echo     ^<style^>
    echo         body { font-family: Arial, sans-serif; margin: 20px; }
    echo         .success { color: green; font-weight: bold; }
    echo     ^</style^>
    echo ^</head^>
    echo ^<body^>
    echo     ^<h1 class="success"^>✓ 生成时间：%date% %time%^</h1^>
    echo     ^<p^>当前用户：%USERNAME%^</p^>
    echo     ^<p^>计算机名：%COMPUTERNAME%^</p^>
    echo ^</body^>
    echo ^</html^>
) > "%filename%"

:: 最终验证
if %errorlevel% neq 0 (
    echo 错误：网页生成失败，错误代码：%errorlevel%
    set "errorflag=1"
)

if exist "%filename%" (
    echo 生成验证：文件大小约为 
    for %%F in ("%filename%") do echo %%~zF 字节
    start "" "%filename%"
) else (
    set "errorflag=1"
)

:error
if %errorflag% equ 1 (
    echo.
    echo 故障排除建议：
    echo 1. 请右键以管理员身份运行
    echo 2. 检查杀毒软件是否拦截
    echo 3. 尝试在其他目录（例如桌面）运行
    echo 4. 确认磁盘有足够空间
    pause
)