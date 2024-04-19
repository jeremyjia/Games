from flask import Flask, render_template, request
from wordcloud import WordCloud
import matplotlib.pyplot as plt
from io import BytesIO
import base64
from flask import Flask, jsonify
import cv2
import os
import numpy as np


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

@app.route('/get_message', methods=['GET'])
def get_message():
    data = {'message': 'Hello from Flask backend!'}
    return jsonify(data)


@app.route('/get_image_data', methods=['GET'])
def get_data():
    param1 = request.args.get('param1', '0.8')
    param2 = request.args.get('param2', '100') #blue
    print(param1+'_'+param2)
    filename='test.jpg'
    image_path = os.path.join(app.static_folder, filename)
    img = cv2.imread(image_path)
    image = np.power(img, float(param1))
    #将图片转换为NumPy数组
    image_array = np.array(image)
    #增加所有像素的蓝色分量
    image_array[:, :, 0] += int(param2)  #蓝色分量在索引0， R:2 G:1 B:0
    #确保RGB值在0-255的范围内
    image_array = np.clip(image_array, 0, 255)
    #cv2.imwrite(r"1_"+filename, image)
    img_str = numpy_to_base64(image_array)
    print(img_str)
    return f'<img src="data:image/png;base64,{img_str}">'

def numpy_to_base64(image_np): 
    data = cv2.imencode('.jpg', image_np)[1]
    image_bytes = data.tobytes()
    image_base4 = base64.b64encode(image_bytes).decode('utf8')
    return image_base4

if __name__ == '__main__':
    app.run(debug=True)