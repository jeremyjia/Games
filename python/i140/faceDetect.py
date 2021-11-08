#coding:utf-8
#人脸识别
#e,g.  python faceDetect.py -i jia.jpg -o out.jpg -r 110 -g 255 -b 10 -w 3
import cv2
import os.path
import argparse

parser = argparse.ArgumentParser(description='image for argparse')
parser.add_argument('--input', '-i', help='file_input 输入文件属性，必要参数', required=True)
parser.add_argument('--out', '-o',  help='file_out 输出文件属性，非必要参数', default='out_img.jpg')
parser.add_argument('--red', '-r', help='read color 属性，非必要参数，但是有默认值', default=0)
parser.add_argument('--green', '-g', help='green color 属性，非必要参数，但是有默认值', default=0)
parser.add_argument('--blue', '-b', help='blue color 属性，非必要参数，但是有默认值', default=255)
parser.add_argument('--width', '-w', help='line width 属性，非必要参数，但是有默认值', default=3)
args = parser.parse_args()

in_file_name = args.input
out_file_name = args.out
R = int(args.red)
G = int(args.green)
B = int(args.blue)
W = int(args.width)

def faceDetect(filename, out_file_name, cascade_file = "haarcascade_frontalface_alt.xml"):
    if not os.path.isfile(cascade_file):
        raise RuntimeError("%s: file not found." % cascade_file)

    cascade = cv2.CascadeClassifier(cascade_file)
    image = cv2.imread(filename)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    gray = cv2.equalizeHist(gray)

    faces = cascade.detectMultiScale(gray,scaleFactor = 1.1, minNeighbors = 5, minSize = (24, 24))
    i=0
    for (x, y, w, h) in faces:
        i+=1
        cv2.rectangle(image, (x, y), (x + w, y + h), (B, G, R), W)
        #temp = image[y:y+h,x:x+w,:]
        #cv2.imwrite('%s_%d.jpg'%(os.path.basename(filename).split('.')[0],i),temp)
    cv2.imshow("AnimeFaceDetect", image)
    cv2.waitKey(0)
    cv2.imwrite(out_file_name, image)
	

faceDetect(in_file_name, out_file_name)
