const http = require('http');
const fs = require('fs');
const path = require('path');

// 存储分数的文件路径
const scoresFilePath = path.join(__dirname, 'scores.txt');

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/save-score') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const { score } = JSON.parse(body);
                // 将分数追加到文件中
                fs.appendFile(scoresFilePath, `${score}\n`, (err) => {
                    if (err) {
                        console.error('保存分数时出错:', err);
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('保存分数时出错');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/plain' });
                        res.end('分数保存成功');
                    }
                });
            } catch (error) {
                console.error('解析请求体时出错:', error);
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('请求体格式错误');
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('未找到该接口');
    }
});

// 启动服务器
const port = 3005;
server.listen(port, () => {
    console.log(`服务器正在监听端口 ${port}`);
});