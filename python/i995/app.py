from flask import Flask, render_template, request
from wordcloud import WordCloud
import matplotlib.pyplot as plt
from io import BytesIO
import base64

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['GET', 'POST'])
def generate_wordcloud():
    words = request.form['words']
    weights = request.form['weights']
    wordcloud = WordCloud(width=800, height=400).generate_from_frequencies(dict(zip(words.split(','), map(int, weights.split(',')))))
    plt.figure(figsize=(8, 4))
    plt.imshow(wordcloud, interpolation='bilinear')
    plt.axis('off')
    plt.tight_layout(pad=0)
    buffer = BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    img_str = base64.b64encode(buffer.read()).decode('utf-8')
    plt.close()
    return f'<img src="data:image/png;base64,{img_str}">'

@app.route('/create/')
def d():
    wd = request.args.get('wd')
    return '%s' % wd

if __name__ == '__main__':
    app.run(debug=True)