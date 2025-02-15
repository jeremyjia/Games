@echo off
echo 正在创建项目目录结构...

:: 创建主项目目录
mkdir your-project 2>nul
cd your-project

:: 创建子目录
mkdir public 2>nul
mkdir output 2>nul
mkdir temp_frames 2>nul

:: 创建示例文件
echo. > public\index.html
echo. > public\404.html

echo 目录结构创建完成！
echo.
echo 生成结构：
echo your-project/
echo ├── public/
echo │   ├── index.html
echo │   └── 404.html
echo ├── output/
echo ├── temp_frames/
echo └── server.js

echo.
echo 请将您的代码文件保存为 server.js
echo 并将前端文件放入 public 目录
pause