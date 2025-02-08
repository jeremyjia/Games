const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const app = express();
const port = 3000;

// 内存存储监控数据
const monitoredSites = new Map();

app.use(express.static('public'));

app.get('/check-update', async (req, res) => {
    const targetUrl = req.query.url;
    
    try {
        // 获取网页内容
        const response = await axios.get(targetUrl, {
            timeout: 5000,
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        
        // 计算内容哈希
        const contentHash = crypto
            .createHash('sha256')
            .update(response.data)
            .digest('hex');

        // 获取上次存储的哈希值
        const previousHash = monitoredSites.get(targetUrl);
        const updated = previousHash && previousHash !== contentHash;
        
        // 更新存储
        monitoredSites.set(targetUrl, contentHash);

        res.json({
            status: 'online',
            updated: updated,
            contentHash: contentHash,
            timestamp: new Date()
        });
        
    } catch (error) {
        res.json({
            status: 'offline',
            updated: false,
            error: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`监控服务运行在 http://localhost:${port}`);
});