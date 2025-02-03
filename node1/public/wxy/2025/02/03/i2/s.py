# app.py
from flask import Flask, jsonify, render_template
import random
import datetime

app = Flask(__name__)

def generate_mock_stock_data(days=30):
    data = []
    base = datetime.datetime.today()
    date_lst = [base - datetime.timedelta(days=x) for x in range(days)]

    for date in date_lst:
        open_price = random.uniform(100, 200)
        high = open_price + random.uniform(0, 20)
        low = open_price - random.uniform(0, 20)
        close = random.uniform(low, high)
        volume = random.randint(1000, 10000)
        data.append({
            'date': date.strftime('%Y-%m-%d'),
            'open': round(open_price, 2),
            'high': round(high, 2),
            'low': round(low, 2),
            'close': round(close, 2),
            'volume': volume
        })
    return data

@app.route('/')
def index():
    return render_template('index.html', stock_data=generate_mock_stock_data())

@app.route('/api/stock-data')
def get_stock_data():
    return jsonify(generate_mock_stock_data())

if __name__ == '__main__':
    app.run(debug=True)