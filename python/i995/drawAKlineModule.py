import matplotlib.pyplot as plt
import mplfinance as mpf
import pandas as pd
import numpy as np


def generate_all_random_data(num_days):
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
    df = generate_all_random_data(20)
    #使用mplfinance保存绘制的K线图
    mpf.plot(df, type='candle', style='charles', volume=True, title='Stock Price K-Line Chart', ylabel='Price',savefig='kline.jpg')
    return 'kline.jpg'



def generate_last_column_random_data(num_days):
    dates = pd.date_range(start='2024-01-01', periods=num_days, freq='D')
    data = {
        'Open': [190, 105, 103, 128, 110] + np.random.uniform(100, 200, 1).tolist(),
        'High': [110, 108, 106, 112, 115] + np.random.uniform(100, 200, 1).tolist(),
        'Low': [95, 102, 101, 107, 109] + np.random.uniform(50, 100, 1).tolist(),
        'Close': [105, 193, 200, 110, 174] + np.random.uniform(100, 200, 1).tolist(),
        'Volume': [10000, 15000, 12000, 13000, 1100] + np.random.randint(10000, 20000, 1).tolist()
    }
    df = pd.DataFrame(data, index=dates)
    return df


def generate_last_column_kline_picture():
    df = generate_last_column_random_data(6)
    mpf.plot(df, type='candle', style='charles', volume=True, title='Stock Price K-Line Chart', ylabel='Price', ylim=[10, 200],savefig='kline_column.jpg')
    return 'kline_column.jpg'



