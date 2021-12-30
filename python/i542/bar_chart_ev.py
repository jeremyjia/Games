# -*- coding: utf-8 -*-
# 程序内给出指定数据，并显示并保存该柱状图
import matplotlib.pyplot as plt
import argparse


# parser = argparse.ArgumentParser(description='image for argparse')
# parser.add_argument('--input', '-i', help='file_input 输入文件属性，必要参数', required=True)
# parser.add_argument('--out', '-o',  help='file_out 输出文件属性，非必要参数', default='out_img.jpg')
# parser.add_argument('--clear', '-c', help='img_clear 属性，非必要参数，但是有默认值', default=2.0)
# parser.add_argument('--width', '-w', help='mark_width 属性，非必要参数，但是有默认值', default=3.0)
# args = parser.parse_args()

# in_file_name = args.input
# out_file_name = args.out

# img=io.imread(in_file_name)
# img = img_as_float(img)

parser = argparse.ArgumentParser(description='bar chart for argparse')
parser.add_argument('--namelist', '-x', help='bar chart x-axis 属性，非必要参数', default=['A','B','C','D'])#Q:运行命令并输入参数，需要知道如何输入数组型string: py .\bar_chart_ev.py -x '['A','B','C','D']'
parser.add_argument('--numlist', '-y',  help='bar chart y-axis值，非必要参数', default=['1','2','3','4'])
parser.add_argument('--numlist1', '-y1', help='bar chart y-axis值1，非必要参数', default=['1','2','3','4'])
args = parser.parse_args()


name_list = args.namelist
num_list = args.numlist
num_list1 = args.numlist1

# name_list = ['Monday','Tuesday','Friday','Sunday']
# num_list = [1.5,3,7.8,6]
# num_list1 = [1,2,3,2.5]
x = list(range(len(num_list)))
total_width, n = 0.8, 2
width = total_width / n

plt.bar(x, num_list, width = width, label='boy',fc='y')
for i in range(len(x)):
    x[i] = x[i] + width
plt.bar(x, num_list1, width=width, label='girl',tick_label = name_list,fc ='r')
plt.legend()
plt.savefig('bar_chart_ev.jpg')
plt.show()



