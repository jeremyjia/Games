from flask import Flask, render_template, request, send_file
from docx import Document
from io import BytesIO

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_word', methods=['POST'])
def generate_word():
    text = request.form.get('content', '')
    
    # 创建Word文档
    doc = Document()
    doc.add_paragraph(text)
    
    # 将文档保存到内存流
    file_stream = BytesIO()
    doc.save(file_stream)
    file_stream.seek(0)
    
    return send_file(
        file_stream,
        as_attachment=True,
        download_name='note.docx',
        mimetype='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    )

if __name__ == '__main__':
    app.run(debug=True)