// server.js
const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// 中间件
app.use(express.json());
app.use(express.static('public'));

// 保存视频数据
app.post('/save', (req, res) => {
  fs.writeFileSync('data.json', JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// 获取视频数据
app.get('/data', (req, res) => {
  try {
    const data = fs.readFileSync('data.json');
    res.json(JSON.parse(data));
  } catch (e) {
    res.status(404).send('File not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});