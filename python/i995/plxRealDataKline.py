import baostock as bs
import pandas as pd
import mplfinance as mpf
from datetime import datetime


def generate_kline_real_data_picture():
    # 登陆系统
    lg = bs.login()

    # 显示登陆返回信息
    print('login respond error_code:'+lg.error_code)
    print('login respond  error_msg:'+lg.error_msg)

    # 获取股票历史交易数据
    # 详细参数含义请参考baostock官方文档
    stockID = "601857.sh" #中国石油的股票号

    # 获取当前日期和时间
    now = datetime.now()
    # 格式化日期为 2024-12-07 这样的格式（保持两位数）
    formatted_end_date = now.strftime("%Y-%m-%d")

    rs = bs.query_history_k_data_plus(stockID,
                                    "date,code,open,high,low,close,preclose,volume,amount,pctChg",
                                    start_date="2024-12-01", end_date=formatted_end_date,
                                    frequency="d", adjustflag="3")

    # 打印结果集
    print('query_history_k_data_plus respond error_code:'+rs.error_code)
    print('query_history_k_data_plus respond  error_msg:'+rs.error_msg)

    # 查询结果转为pandas DataFrame格式方便处理
    data_list = []
    while (rs.error_code == '0') & rs.next():
        data_list.append(rs.get_row_data())

    result = pd.DataFrame(data_list, columns=rs.fields)
    # 打印数据
    print(result)
    # 将date转为索引
    result['date'] = pd.to_datetime(result['date'])
    result.set_index('date', inplace=True)

    # 更换字段类型
    for col in ['open', 'high', 'low', 'close', 'volume']:
        result[col] = result[col].astype(float)

    print(result)
    mpf.plot(result, type='candle', style='charles', volume=True, title=stockID+' Stock K-Line Chart', ylabel='Price', savefig='kline_real_data.jpg')
    #mpf.plot(result, type='candle', style='charles', volume=True, title='Stock Price K-Line Chart', ylabel='Price')
    # 登出系统
    bs.logout()

    return "kline_real_data.jpg"


