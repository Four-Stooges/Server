import cv2
import sys
from subprocess import call

# Get user supplied values
imagePath1 = sys.argv[1]
call(['pwd'])
cascPath = './public/resources/scripts/haarcascade_frontalface_default.xml'
imagePath2 = sys.argv[2]

# Create the haar cascade
faceCascade = cv2.CascadeClassifier(cascPath)

# Read the image
image1 = cv2.imread(imagePath1)
gray1 = cv2.imread(imagePath1,1)

image2 = cv2.imread(imagePath2)
gray2 = cv2.imread(imagePath2,1)

# Detect faces in the image
faces1 = faceCascade.detectMultiScale(
    gray1,
    scaleFactor=1.2,
    minNeighbors=5,
    minSize=(30, 30),
    flags = cv2.CASCADE_SCALE_IMAGE
)

faces2 = faceCascade.detectMultiScale(
    gray2,
    scaleFactor=1.2,
    minNeighbors=5,
    minSize=(30, 30),
    flags = cv2.CASCADE_SCALE_IMAGE
)

x1 = faces1[0][0]
y1 = faces1[0][1]
w1 = faces1[0][2] + x1
h1 = faces1[0][3] + y1
crop_img1 = image1[y1:h1, x1:w1]
size_x1 = w1 - x1
size_y1 = h1 - y1

x2 = faces2[0][0]
y2 = faces2[0][1]
w2 = faces2[0][2] + x2
h2 = faces2[0][3] + y2
crop_img2 = image2[y2:h2, x2:w2]
size_x2 = w2 - x2
size_y2 = h2 - y2

if size_x1 > size_x2:
	new_x = size_x2
else:
	new_x = size_x1

if size_y1 > size_y2:
	new_y = size_y2
else:
	new_y = size_y1

new1 = cv2.resize(crop_img1 , (new_x,new_y))
new2 = cv2.resize(crop_img2, (new_x,new_y))


#cv2.imshow("Faces found", new1)
cv2.imwrite('./public/resources/scripts/test/final1.png',new1)
#cv2.waitKey(0)
#cv2.imshow("Faces found", new2)
cv2.imwrite('./public/resources/scripts/test/final2.png',new2)
#cv2.waitKey(0)
exit(call(["python3","./public/resources/scripts/imgtest.py"]))
