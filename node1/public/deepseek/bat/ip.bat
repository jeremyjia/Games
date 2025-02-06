@echo off
setlocal

REM 获取IP地址
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
    set IP=%%a
    goto :OUTPUT
)

:OUTPUT
REM 去除IP地址前的空格
set IP=%IP: =%

REM 生成网页文件
(
    echo ^<html^>
    echo ^<head^>
    echo ^<title^>当前IP地址^</title^>
    echo ^</head^>
    echo ^<body^>
    echo ^<h1^>当前IP地址: ^<a href="http://%IP%"^>%IP%:^</a^>^</h1^>
    echo ^<h1^>当前IP地址: ^<a href="http://%IP%:3000"^>%IP%:3000^</a^>^</h1^>
    echo ^<h1^>当前IP地址: ^<a href="http://%IP%:3001"^>%IP%:3001^</a^>^</h1^>
    echo ^</body^>
    echo ^</html^>
) > index.html

echo IP地址已输出到ip.html文件
endlocal