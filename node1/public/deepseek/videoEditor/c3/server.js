// 后端代码 server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// 模拟视频生成（实际应集成FFmpeg等视频处理库）
app.post('/generateVideo', (req, res) => {
    // 这里应该添加实际的视频生成逻辑
    // 以下为模拟实现，返回一个空视频文件
    const dummyVideo = Buffer.from('', 'utf-8');
    
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', 'attachment; filename="video.mp4"');
    res.send(dummyVideo);
});

const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});