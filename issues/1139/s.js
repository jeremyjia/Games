const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// 配置multer的存储选项
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // 指定文件上传后的目录
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // 指定文件上传后的名称，这里使用原始文件名
        // 你可以根据需要自定义文件名，比如添加时间戳等
        cb(null, file.originalname);
    }
});

// 创建multer实例，并传入存储选项
const upload = multer({ storage: storage });

// 确保uploads目录存在
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// 创建一个路由来处理文件上传
app.post('/upload-endpoint', upload.single('file'), (req, res) => {
    // req.file包含了上传文件的信息
    // req.body包含了其他表单数据（如果有的话）

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    // 文件已经成功上传，可以在这里处理其他逻辑
    // 比如将文件信息保存到数据库等

    res.status(200).json({ message: 'File uploaded successfully.', file: req.file });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});