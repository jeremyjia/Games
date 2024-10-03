const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// 配置Multer
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// 确保uploads目录存在
const fs = require('fs');
const dir = './public/uploads';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

// 配置CORS中间件
// 你可以传递一个配置对象，或者简单地使用默认设置来允许所有来源的请求
app.use(cors({
    origin: '*', // 允许所有域名访问
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的HTTP方法
    allowedHeaders: ['Content-Type', 'Authorization'] // 允许的Header头
}));

// 指定静态文件的存放位置，这里假设你的HTML文件放在public文件夹下
app.use(express.static(path.join(__dirname, 'public')));

// 处理文件上传
app.post('/upload', upload.single('audio'), (req, res) => {
    res.json({ message: '文件上传成功: <a target="_blank" href="uploads/' + req.file.filename + '">' + req.file.filename + '</a>' });
});

app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});