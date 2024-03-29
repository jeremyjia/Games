import cv2
import numpy as np
import argparse

#face_cascade = cv2.CascadeClassifier('/users/hasee/opencv-master/data/haarcascades/haarcascade_frontalface_alt.xml')
#eye_cascade = cv2.CascadeClassifier('/home/shahsparx/opencv-master/data/haarcascades/haarcascade_eye.xml')

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_eye.xml")

parser = argparse.ArgumentParser(description='statistics for argparse')  # examplify running by ‘face_with_glasses.py -i 16.jpg -x 2.5 -y 1.1 -w 3.5’
parser.add_argument('--filepath', '-i', help='filepath属性，必要参数', required=True)  # 必须是文件名 有眼镜的生物图片
parser.add_argument('--output', '-o',  help='file_out 输出文件属性，非必要参数', default='glassed_img.jpg') #必须图片名
parser.add_argument('--x_position', '-x', help='x_position属性，非必要参数', default=2.5)  #眼镜的X轴坐标 range of x [2.16, 3.16] for 16.jpg; x [-1, 1.2] for 51.jpg
parser.add_argument('--y_position', '-y',  help='y_postion属性，非必要参数', default=1.1)  #眼镜的Y轴坐标 when x=2.66, range of y [-1.25,4.55] for 16.jpg, when x 0.1, y [-30.5,20.3] for 51.jpg
parser.add_argument('--glass_width_co', '-w',  help='glass_width_co属性，非必要参数', default=3.5)  #眼镜的宽度 when x=2.66, y=1.9, range of w [0.1, 4.1] for 16.jpg,如果这个程序不容易修改，可能尝试再找一个更好的项目
args = parser.parse_args()

x_po = float(args.x_position)  
y_po = float(args.y_position) 
width_co = float(args.glass_width_co) 
file_path = args.filepath
output = args.output
print (x_po,y_po,width_co)

# read both the images of the face and the glasses
image = cv2.imread(file_path)
glass_img = cv2.imread('kl.jpg')
#glass_img = cv2.imread('glass_image.jpg')

gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

centers = []
faces = face_cascade.detectMultiScale(gray, 1.3, 5)   

# iterating over the face detected
for (x, y, w, h) in faces:

    # create two Regions of Interest.
    roi_gray = gray[y:y + h, x:x + w]
    roi_color = image[y:y + h, x:x + w]
    eyes = eye_cascade.detectMultiScale(roi_gray)

    # Store the coordinates of eyes in the image to the 'center' array
    for (ex, ey, ew, eh) in eyes:
        centers.append((x + int(ex + 0.5 * ew), y + int(ey + 0.5 * eh)))

if len(centers) > 0:
    # change the given value of 2.15 according to the size of the detected face
    glasses_width = width_co * abs(centers[1][0] - centers[0][0])
    overlay_img = np.ones(image.shape, np.uint8) * 255
    h, w = glass_img.shape[:2]
    scaling_factor = glasses_width / w

    overlay_glasses = cv2.resize(glass_img, None, fx=scaling_factor, fy=scaling_factor, interpolation=cv2.INTER_AREA)

    x = centers[0][0] if centers[0][0] < centers[1][0] else centers[1][0]

    # The x and y variables below depend upon the size of the detected face.
    x -= x_po * overlay_glasses.shape[1]
    y += y_po * overlay_glasses.shape[0]

    # Slice the height, width of the overlay image.
    h, w = overlay_glasses.shape[:2]
    overlay_img[int(y):int(y + h), int(x):int(x + w)] = overlay_glasses

    # Create a mask and generate it's inverse.
    gray_glasses = cv2.cvtColor(overlay_img, cv2.COLOR_BGR2GRAY)
    ret, mask = cv2.threshold(gray_glasses, 110, 255, cv2.THRESH_BINARY)
    #ret, mask = cv2.threshold(gray_glasses, 110, 255, cv2.THRESH_BINARY)
    mask_inv = cv2.bitwise_not(mask)
    temp = cv2.bitwise_and(image, image, mask=mask)

    temp2 = cv2.bitwise_and(overlay_img, overlay_img, mask=mask_inv)
    final_img = cv2.add(temp, temp2)

    imS = cv2.resize(final_img, (1366, 768))
    cv2.imwrite(output, final_img)
    # cv2.imshow('Lets wear Glasses', final_img)
    # cv2.waitKey()
    # cv2.destroyAllWindows()