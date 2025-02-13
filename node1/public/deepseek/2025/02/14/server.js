const express = require('express');
const { Document, Packer, Paragraph, TextRun } = require('docx');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.post('/generate-doc', async (req, res) => {
    try {
        const { content } = req.body;
        
        const doc = new Document({
            sections: [{
                children: [
                    new Paragraph({
                        children: [
                            new TextRun(content)
                        ]
                    })
                ]
            }]
        });

        const buffer = await Packer.toBuffer(doc);
        
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.setHeader('Content-Disposition', 'attachment; filename=generated-doc.docx');
        res.send(buffer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating document');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});