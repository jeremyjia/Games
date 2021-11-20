# -*- coding: utf-8 -*-
# 程序内给出指定数据，并显示并保存该柱状图
import matplotlib.pyplot as plt

name_list = ['Monday','Tuesday','Friday','Sunday']
num_list = [1.5,3,7.8,6]
num_list1 = [1,2,3,2.5]
x = list(range(len(num_list)))
total_width, n = 0.8, 2
width = total_width / n

plt.bar(x, num_list, width = width, label='boy',fc='y')
for i in range(len(x)):
    x[i] = x[i] + width
plt.bar(x, num_list1, width=width, label='girl',tick_label = name_list,fc ='r')
plt.legend()
plt.savefig('bar_chart.jpg')
plt.show()
