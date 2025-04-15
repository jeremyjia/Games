const express = require('express');
const app = express();
const path = require('path');

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 启动服务器
const port = 3002;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});    