const http = require('http');
const https = require('https');
const fs = require('fs');
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
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    try {
        await getLrcLinks();

        let html = '<!DOCTYPE html>';
        html += '<html lang="zh-CN">';
        html += '<head>';
        html += '<meta charset="UTF-8">';
        html += '<title>21Voa LRC 链接监测结果</title>';
        html += '</head>';
        html += '<body>';
        html += '<h1>21Voa LRC 链接监测结果</h1>';

        if (lrcLinks.length > 0) {
            html += '<p>找到了 LRC 文件链接：</p>';
            html += '<ul>';
            lrcLinks.forEach((link) => {
                html += `<li><a href="${link}" target="_blank">${link}</a></li>`;
            });
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
});

// 启动服务器
const port = 3005;
server.listen(port, () => {
    console.log(`服务器已启动，访问 http://localhost:${port} 查看结果`);
});