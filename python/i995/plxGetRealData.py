import akshare as ak

# 中国石油的股票代码，根据akshare的要求填写
stock_code = "601857"

print(ak.__version__)


def get_stock_news(stock_code):
    """获取股票相关新闻"""
    try:
        stock_news_em_df = ak.stock_news_em(symbol=stock_code)
        return stock_news_em_df.head(10)  # 返回最新的5条新闻
    except Exception as e:
        st.error(f"获取新闻数据时出错: {str(e)}")
        return None


stock_zh_a_hist_df = ak.stock_zh_a_hist(
    symbol="601857", 
    period="daily", 
    start_date="20241212", 
    end_date="20241215", 
    adjust="hfq"
)
print(stock_zh_a_hist_df)
# 获取实时数据
stock_zh_a_realtime_em_df = ak.stock_zh_a_spot_em() #stock_zh_index_spot   stock_zh_a_spot_em

# 打印实时数据
print(stock_zh_a_realtime_em_df)

fuxing_code = stock_zh_a_realtime_em_df[stock_zh_a_realtime_em_df['名称'] == '中国石油']
print(fuxing_code)

