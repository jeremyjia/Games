const express = require('express');
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.post('/generate-doc', async (req, res) => {
    try {
        const { title, paragraphs } = req.body;
        
        const doc = new Document({
            sections: [{
                properties: {
                    page: {
                        margin: {
                            top: 1000,
                            right: 1000,
                            bottom: 1000,
                            left: 1000,
                        }
                    }
                },
                children: [
                    new Paragraph({
                        heading: HeadingLevel.TITLE,
                        children: [
                            new TextRun({
                                text: title,
                                bold: true,
                                color: "2E74B5",
                                size: 48,
                                font: "Arial"
                            })
                        ],
                        spacing: { after: 800 }
                    }),
                    ...paragraphs.flatMap(p => [
                        new Paragraph({
                            heading: HeadingLevel.HEADING_2,
                            children: [
                                new TextRun({
                                    text: p.title,
                                    bold: true,
                                    color: "2EAD4B",
                                    size: 28,
                                    font: "Calibri"
                                })
                            ],
                            spacing: { after: 400 }
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: p.body,
                                    color: "444444",
                                    size: 24,
                                    font: "Times New Roman"
                                })
                            ],
                            spacing: { after: 600 }
                        })
                    ])
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