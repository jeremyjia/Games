const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3005;
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');

// 存储分数的文件路径
const scoresFilePath = path.join(__dirname, 'scores.json');

// 解析 JSON 格式的请求体
app.use(express.json());
// 处理静态文件，将 public 目录作为静态资源根目录
app.use(express.static(path.join(__dirname, 'public')));

// 保存分数的接口
app.post('/save-score', (req, res) => {
    const { score, level } = req.body;
    fs.readFile(scoresFilePath, 'utf8', (err, data) => {
        let scores = [];
        if (!err && data) {
            scores = JSON.parse(data);
        }
        scores.push({ score, level });
        fs.writeFile(scoresFilePath, JSON.stringify(scores, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('保存分数时出错:', writeErr);
                res.status(500).send('保存分数时出错');
            } else {
                res.status(200).send('分数保存成功');
            }
        });
    });
});

// 获取历史记录的接口
app.get('/history', (req, res) => {
    fs.readFile(scoresFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('读取历史记录时出错:', err);
            res.status(500).send('读取历史记录时出错');
        } else {
            const scores = data ? JSON.parse(data) : [];
            res.json(scores);
        }
    });
});

// 导出历史记录为 Word 文档的接口
app.get('/export-history', (req, res) => {
    fs.readFile(scoresFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('读取历史记录时出错:', err);
            res.status(500).send('读取历史记录时出错');
            return;
        }
        const scores = data ? JSON.parse(data) : [];
        const content = fs.readFileSync(path.join(__dirname, 'template.docx'), 'binary');
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip);
        doc.render({
            scores
        });
        const buf = doc.getZip().generate({ type: 'nodebuffer' });
        res.setHeader('Content-Disposition', 'attachment; filename=history.docx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.send(buf);
    });
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器正在监听端口 ${port}`);
});