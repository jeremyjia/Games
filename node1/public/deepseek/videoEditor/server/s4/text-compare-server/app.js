const express = require('express');
const { Document, Packer, Paragraph, TextRun } = require('docx');
const fs = require('fs');
const path = require('path');
const app = express();

// 中间件
app.use(express.static('public'));
app.use(express.json());

// 生成Word文档路由
app.post('/generate-doc', async (req, res) => {
    try {
        const diffs = req.body.diffs;
        const doc = new Document();

        diffs.forEach(part => {
            const textRun = new TextRun({
                text: part.value,
                color: part.added ? '00FF00' : part.removed ? 'FF0000' : '000000',
                strike: part.removed,
                underline: part.added ? { color: '00FF00' } : undefined
            });
            doc.addSection({
                children: [new Paragraph(textRun)],
            });
        });

        const buffer = await Packer.toBuffer(doc);
        const fileName = `diff-${Date.now()}.docx`;
        const filePath = path.join(__dirname, 'public', 'downloads', fileName);

        // 确保下载目录存在
        if (!fs.existsSync(path.dirname(filePath))) {
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
        }

        fs.writeFileSync(filePath, buffer);
        res.json({ url: `/downloads/${fileName}` });
    } catch (error) {
        res.status(500).json({ error: '生成文档失败' });
    }
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});