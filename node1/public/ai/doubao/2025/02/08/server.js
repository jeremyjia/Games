const http = require('http');
const https = require('https');
const path = require('path');

// 目标网址
const targetUrl = 'https://www.21voa.com/';
let lrcLinks = [];

// 获取 LRC 链接的函数
function getLrcLinks() {
    return new Promise((resolve, reject) => {
        https.get(targetUrl, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                const lrcLinkRegex = /href="([^"]+\.lrc)"/g;
                lrcLinks = [];
                let match;
                while ((match = lrcLinkRegex.exec(data))!== null) {
                    lrcLinks.push(match[1]);
                }
                resolve(lrcLinks);
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

// 创建 HTTP 服务器
const server = http.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    if (req.url === '/') {
        try {
            await getLrcLinks();

            let html = '<!DOCTYPE html>';
            html += '<html lang="zh-CN">';
            html += '<head>';
            html += '<meta charset="UTF-8">';
            html += '<title>21Voa LRC 链接监测结果</title>';
            html += '<script>';
            html += 'async function getFileName() {';
            html += '  const response = await fetch("/getFileName");';
            html += '  const data = await response.text();';
            html += '  alert("LRC 文件名为: " + data);';
            html += '}';
            html += '</script>';
            html += '</head>';
            html += '<body>';
            html += '<h1>21Voa LRC 链接监测结果</h1>';

            if (lrcLinks.length > 0) {
                html += '<p>找到了 LRC 文件链接：</p>';
                html += '<ul>';
                html += `<li><a href="${lrcLinks[0]}" target="_blank">${lrcLinks[0]}</a>`;
                html += `<button onclick="getFileName()">获取文件名</button></li>`;
                for (let i = 1; i < lrcLinks.length; i++) {
                    html += `<li><a href="${lrcLinks[i]}" target="_blank">${lrcLinks[i]}</a></li>`;
                }
                html += '</ul>';
            } else {
                html += '<p>未找到 LRC 文件链接。</p>';
            }

            html += '</body>';
            html += '</html>';

            res.end(html);
        } catch (err) {
            const errorHtml = `
                <!DOCTYPE html>
                <html lang="zh-CN">
                <head>
                    <meta charset="UTF-8">
                    <title>错误</title>
                </head>
                <body>
                    <h1>请求发生错误</h1>
                    <p>${err.message}</p>
                </body>
                </html>
            `;
            res.end(errorHtml);
        }
    } else if (req.url === '/getFileName') {
        if (lrcLinks.length > 0) {
            const fileName = path.basename(lrcLinks[0]);
            res.end(fileName);
        } else {
            res.end('未找到 LRC 文件链接');
        }
    }
});

// 启动服务器
const port = 3005;
server.listen(port, () => {
    console.log(`服务器已启动，访问 http://localhost:${port} 查看结果`);
});