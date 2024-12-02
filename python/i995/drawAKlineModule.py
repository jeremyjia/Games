import matplotlib.pyplot as plt
import mplfinance as mpf
import pandas as pd
import numpy as np


def generate_random_data(num_days):
    dates = pd.date_range(start='2023-01-01', periods=num_days, freq='D')
    data = {
        'Open': np.random.uniform(100, 200, num_days),
        'High': np.random.uniform(100, 200, num_days),
        'Low': np.random.uniform(50, 100, num_days),
        'Close': np.random.uniform(100, 200, num_days),
        'Volume': np.random.randint(100000, 200000, num_days)
    }
    df = pd.DataFrame(data, index=dates)
    return df


def generate_kline_picture():
    df = generate_random_data(10)
    #使用mplfinance保存绘制的K线图
    mpf.plot(df, type='candle', style='charles', volume=True, title='Stock Price K-Line Chart', ylabel='Price',savefig='kline.jpg')
    return 0



