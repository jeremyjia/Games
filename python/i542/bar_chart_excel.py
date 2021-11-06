import matplotlib.pyplot as plt
import argparse
import pandas as pd

parser = argparse.ArgumentParser(description='bar chart for argparse') # run by 'py .\bar_chart_excel.py -f d:/1.xlsx'
parser.add_argument('--filepath', '-f', help='filepath属性，必要参数', required=True)
args = parser.parse_args()

file_path = args.filepath
df = pd.read_excel(file_path)
# bar = Bar()
# bar.add_xaxis(df["TOY"].to_list())
# bar.add_yaxis("RA", df["RA"].to_list())
# bar.add_yaxis("RB", df["RB"].to_list())

name_list = df['TOY']
num_list = df['RA']
num_list1 = df['RB']
x = list(range(len(num_list)))
total_width, n = 0.8, 2
width = total_width / n
plt.title('SALES of TOYS')
plt.bar(x, num_list, width = width, tick_label = name_list, label='Shop A', fc='y')
for i in range(len(x)):
    x[i] = x[i] + width
plt.bar(x, num_list1, width=width, tick_label = name_list, label='Shop B', fc ='r')
plt.legend()
plt.savefig('bar_chart_excel.jpg')
plt.show()