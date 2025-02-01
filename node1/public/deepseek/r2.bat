@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

set "filename=mp3_downloader.html"
set "target_url=https://www.21voa.com/special_english/in-india-sudden-sea-turtle-deaths-cause-concern-93323.html"

(
echo ^<!DOCTYPE html^>
echo ^<html lang="zh-CN"^>
echo ^<head^>
echo     ^<meta charset="UTF-8"^>
echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0"^>
echo     ^<title^>MP3下载列表^</title^>
echo     ^<style^>
echo         body { 
echo             font-family: Arial, sans-serif;
echo             max-width: 800px;
echo             margin: 20px auto;
echo             padding: 20px;
echo             background-color: #f8f9fa;
echo         }
echo         .mp3-list {
echo             background: white;
echo             padding: 20px;
echo             border-radius: 8px;
echo             box-shadow: 0 2px 4px rgba(0,0,0,0.1);
echo         }
echo         .mp3-item {
echo             padding: 10px;
echo             border-bottom: 1px solid #eee;
echo         }
echo         .mp3-link {
echo             color: #1a73e8;
echo             text-decoration: none;
echo             word-break: break-all;
echo         }
echo         .mp3-link:hover {
echo             text-decoration: underline;
echo         }
echo         .loading {
echo             color: #666;
echo             font-style: italic;
echo         }
echo     ^</style^>
echo ^</head^>
echo ^<body^>
echo     ^<h1^>MP3下载列表^</h1^>
echo     ^<div class="mp3-list"^>
echo         ^<div id="mp3-container" class="loading"^>正在加载MP3链接...^</div^>
echo     ^</div^>
echo     ^<script^>
echo         async function fetchMP3Links() {
echo             const proxyUrl = 'https://api.allorigins.win/get?url=';
echo             const targetUrl = encodeURIComponent('%target_url%');
echo             
echo             try {
echo                 const response = await fetch(proxyUrl + targetUrl);
echo                 const data = await response.json();
echo                 const parser = new DOMParser();
echo                 const doc = parser.parseFromString(data.contents, 'text/html');
echo                 
echo                 const links = Array.from(doc.querySelectorAll('a'))
echo                     .map(a => a.href)
echo                     .filter(href => href.toLowerCase().endsWith('.mp3'));
echo                 
echo                 const container = document.getElementById('mp3-container');
echo                 if (links.length > 0) {
echo                     container.className = '';
echo                     container.innerHTML = `
echo                         ^<h2^>发现 ${links.length} 个MP3文件^</h2^>
echo                         ${links.map(link => `
echo                             ^<div class="mp3-item"^>
echo                                 ^<a href="${link}" class="mp3-link" target="_blank"^>
echo                                     ${link.split('/').pop()}
echo                                 ^</a^>
echo                             ^</div^>
echo                         `).join('')}
echo                     `;
echo                 } else {
echo                     container.innerHTML = '未找到MP3链接';
echo                 }
echo             } catch (error) {
echo                 document.getElementById('mp3-container').innerHTML = 
echo                     '获取失败: ' + error.message;
echo             }
echo         }
echo         window.onload = fetchMP3Links;
echo     ^</script^>
echo ^</body^>
echo ^</html^>
) > "%filename%"

if exist "%filename%" (
    echo 网页已生成: %filename%
    start "" "%filename%"
) else (
    echo 生成失败
)