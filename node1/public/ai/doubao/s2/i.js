const express = require('express');
const app = express();
const officegen = require('officegen');
const fs = require('fs');
const path = require('path');

const port = 3005;
const scores = [];

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 保存成绩
app.post('/save-score', (req, res) => {
  const { score, level } = req.body;
  scores.push({ score, level, date: new Date().toLocaleString() });
  res.sendStatus(200);
});

// 获取历史记录
app.get('/history', (req, res) => {
  res.json(scores);
});

// 保存历史记录为 Word 文档
app.get('/save_history_to_word', (req, res) => {
  const docx = officegen('docx');
  const pObj = docx.createP();
  pObj.addText('贪吃蛇游戏历史记录');
  pObj.addLineBreak();

  scores.forEach((score, index) => {
    pObj.addText(`序号: ${index + 1}`);
    pObj.addLineBreak();
    pObj.addText(`成绩: ${score.score}`);
    pObj.addLineBreak();
    pObj.addText(`难度级别: ${score.level}`);
    pObj.addLineBreak();
    pObj.addText(`日期: ${score.date}`);
    pObj.addLineBreak();
    pObj.addLineBreak();
  });

  const filePath = path.join(__dirname, 'history.docx');
  const out = fs.createWriteStream(filePath);

  out.on('close', () => {
    res.download(filePath, 'history.docx', (err) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      }
      fs.unlinkSync(filePath);
    });
  });

  docx.generate(out);
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});