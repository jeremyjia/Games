const express = require('express');
const bodyParser = require('body-parser');
const { Document, Packer, Paragraph, TextRun } = require('docx');
const diff = require('diff');

const app = express();
const port = 3004;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/compare', (req, res) => {
    const { text1, text2 } = req.body;
    const differences = diff.diffWords(text1, text2);
    res.json({ differences });
});

app.post('/generate-doc', (req, res) => {
    const { differences } = req.body;

    const doc = new Document({
        sections: [
            {
                properties: {},
                children: differences.map(diff => new Paragraph({
                    children: [
                        new TextRun({
                            text: diff.value,
                            color: diff.added ? 'green' : diff.removed ? 'red' : 'black'
                        })
                    ]
                }))
            }
        ]
    });

    Packer.toBuffer(doc).then(buffer => {
        const filePath = `./public/diffs.docx`;
        require('fs').writeFileSync(filePath, buffer);
        res.json({ filePath: '/diffs.docx' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});