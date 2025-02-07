const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3004;

// 中间件
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// 对比文本的API端点
app.post('/compare', (req, res) => {
    const text1 = req.body.text1 || '';
    const text2 = req.body.text2 || '';
    
    // 简单的文本对比逻辑
    const areEqual = text1 === text2;
    const difference = areEqual ? '文本内容完全相同' : '文本内容存在差异';

    res.json({
        result: difference,
        details: {
            lengthComparison: `文本1长度：${text1.length}，文本2长度：${text2.length}`,
            exactMatch: areEqual
        }
    });
});

app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});