#coding:utf-8
# 为图片添加水波纹效果，通过A，B来微调水波纹的效果，目前发现算法会改变原图的尺寸，但尚不知原因
# e.g, python water_effect.py -i f1.jpg -o f2.jpg -c 3 -w 4

import numpy as np
from skimage import img_as_float  # need to install first by 'pip install scikit-image'
import matplotlib.pyplot as plt
from PIL import Image
from skimage import io
import numpy.matlib
import argparse
import random

parser = argparse.ArgumentParser(description='image for argparse')
parser.add_argument('--input', '-i', help='file_input 输入文件属性，必要参数', required=True)
parser.add_argument('--out', '-o',  help='file_out 输出文件属性，非必要参数', default='out_img.jpg')
parser.add_argument('--clear', '-c', help='img_clear 属性，非必要参数，但是有默认值', default=2.0)
parser.add_argument('--width', '-w', help='mark_width 属性，非必要参数，但是有默认值', default=3.0)
args = parser.parse_args()

in_file_name = args.input
out_file_name = args.out

img=io.imread(in_file_name)
img = img_as_float(img)

row, col, channel = img.shape
img_out = img * 1.0
A = float(args.clear)  #值越小 越接近原图
B = float(args.width)  #值越小 水波纹越宽

center_x = (col-1)/2.0
center_y = (row-1)/2.0

xx = np.arange (col) 
yy = np.arange (row)

x_mask = numpy.matlib.repmat (xx, row, 1)
y_mask = numpy.matlib.repmat (yy, col, 1)
y_mask = np.transpose(y_mask)

xx_dif = x_mask - center_x
yy_dif = center_y - y_mask

theta = np.arctan2(yy_dif,  xx_dif)
r = np.sqrt(xx_dif * xx_dif + yy_dif * yy_dif)
r1 = r + A*col*0.01*np.sin(B*0.1*r)

x_new = r1 * np.cos(theta) + center_x
y_new = center_y - r1 * np.sin(theta) 

int_x = np.floor (x_new)
int_x = int_x.astype(int)
int_y = np.floor (y_new)
int_y = int_y.astype(int)

for ii in range(row):
    for jj in range (col):
        new_xx = int_x [ii, jj]
        new_yy = int_y [ii, jj]

        if x_new [ii, jj] < 0 or x_new [ii, jj] > col -1 :
            continue
        if y_new [ii, jj] < 0 or y_new [ii, jj] > row -1 :
            continue

        img_out[ii, jj, :] = img[new_yy, new_xx, :]

# Jeremyjia 恢复原图尺寸，相当于加了一个随机颜色的边框
plt.figure(figsize=(col/100.0, row/100.0),facecolor=random.choice(['g', 'r', 'c', 'm', 'y', 'k']))
plt.imshow (img_out)
plt.axis('off')
plt.savefig(out_file_name)

# plt.show()

