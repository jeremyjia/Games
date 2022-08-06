import aspose.words as aw

# pip install aspose-words
# create document object
doc = aw.Document()

# create a document builder object
builder = aw.DocumentBuilder(doc)

# create font
font = builder.font
font.size = 16
font.bold = True
font.name = "Arial"
font.underline = aw.Underline.DASH

# set paragraph formatting
paragraphFormat = builder.paragraph_format
paragraphFormat.first_line_indent = 8
paragraphFormat.alignment = aw.ParagraphAlignment.JUSTIFY
paragraphFormat.keep_together = True

# add text
builder.writeln("MS Word files are immensely used to create various types of documents such as invoices, reports, technical articles, etc. The document automation has facilitated the users to generate Word documents dynamically from within their web or desktop portals. Therefore, in this article, we will cover how to generate Word documents in Python without MS Office. Moreover, you will learn how to create a DOCX or DOC file and add text or other elements into it dynamically using Pytho")

# save document
doc.save("out.docx")