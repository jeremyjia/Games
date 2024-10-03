const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// 配置Multer
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// 确保uploads目录存在
const fs = require('fs');
const dir = './uploads';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

// 处理文件上传
app.post('/upload', upload.single('audio'), (req, res) => {
    res.json({ message: '文件上传成功: ' + req.file.filename });
});

app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});