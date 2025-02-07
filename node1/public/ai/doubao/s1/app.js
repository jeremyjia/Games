const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3005;

// 存储分数的文件路径
const scoresFilePath = path.join(__dirname, 'scores.txt');

// 解析 JSON 格式的请求体
app.use(express.json());

// 处理静态文件请求，将 public 目录作为静态资源目录
app.use(express.static(path.join(__dirname, 'public')));

// 处理保存分数的 POST 请求
app.post('/save-score', (req, res) => {
    const { score } = req.body;
    // 将分数追加到文件中
    fs.appendFile(scoresFilePath, `${score}\n`, (err) => {
        if (err) {
            console.error('保存分数时出错:', err);
            res.status(500).send('保存分数时出错');
        } else {
            res.status(200).send('分数保存成功');
        }
    });
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器正在监听端口 ${port}`);
});