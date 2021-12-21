#coding:utf-8
#人脸识别
#e,g.  python faceDetect.py -i jia.jpg -o out.jpg -r 110 -g 255 -b 10 -w 3 -s true
#It can detect the face and eyes.
import cv2
import os.path
import argparse

def str2bool(str):
    return True if str.lower() == 'true' else False

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
        face_image = gray[y:y+h, x:w+x]
        eyesDetet(image, face_image, x, y)
        #temp = image[y:y+h,x:x+w,:]
        #cv2.imwrite('%s_%d.jpg'%(os.path.basename(filename).split('.')[0],i),temp)
    if b_show_image:
        cv2.imshow("AnimeFaceDetect", image)
        cv2.waitKey(0)
    cv2.imwrite(out_file_name, image)
    
def eyesDetet(image, face_image, x, y):
    eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_eye.xml")
    eyes = eye_cascade.detectMultiScale(face_image, scaleFactor = 1.1, minNeighbors = 4, minSize = (30,30))
    for ex, ey, ew, eh in eyes:
        cv2.circle(image, (x+ex+ew//2, y+ey+eh//2), W*3, (0,G,0), -1)


parser = argparse.ArgumentParser(description='image for argparse')
parser.add_argument('--input', '-i', help='file_input 输入文件属性，必要参数', required=True)
parser.add_argument('--out', '-o',  help='file_out 输出文件属性，非必要参数', default='out_img.jpg')
parser.add_argument('--red', '-r', help='read color 属性，非必要参数，但是有默认值', default=0)
parser.add_argument('--green', '-g', help='green color 属性，非必要参数，但是有默认值', default=0)
parser.add_argument('--blue', '-b', help='blue color 属性，非必要参数，但是有默认值', default=255)
parser.add_argument('--width', '-w', help='line width 属性，非必要参数，但是有默认值', default=4)
parser.add_argument('--show', '-s', help='image_show 是否显示图像属性，必要参数', default='true')
args = parser.parse_args()
    
in_file_name = args.input
out_file_name = args.out
R = int(args.red)
G = int(args.green)
B = int(args.blue)
W = int(args.width)
b_show_image = str2bool(args.show)

faceDetect(in_file_name, out_file_name)
