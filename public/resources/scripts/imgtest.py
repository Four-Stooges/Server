from skimage.measure import structural_similarity as ssim
#from skimage.measure import compare_ssim as ssim
import matplotlib.pyplot as plt
import numpy as np
import cv2
import sys

def mse(imageA, imageB):
	# the 'Mean Squared Error' between the two images is the
	# sum of the squared difference between the two images;
	# NOTE: the two images must have the same dimension
	err = np.sum((imageA.astype("float") - imageB.astype("float")) ** 2)
	err /= float(imageA.shape[0] * imageA.shape[1])
	
	# return the MSE, the lower the error, the more "similar"
	# the two images are
	return err
 
def compare_images(imageA, imageB, title):
	# compute the mean squared error and structural similarity
	# index for the images
	m = mse(imageA, imageB)
	s = ssim(imageA, imageB,multichannel=True)

	print("MSE: %.2f, SSIM: %.2f" % (m, s))
	if m<12000 and s>0.3:
		exit(0)
	exit(1)
	# setup the figure
	# fig = plt.figure(title)
	# plt.suptitle("MSE: %.2f, SSIM: %.2f" % (m, s))
 
	# # show first image
	# ax = fig.add_subplot(1, 2, 1)
	# plt.imshow(imageA, cmap = plt.cm.gray)
	# plt.axis("off")
 
	# # show the second image
	# ax = fig.add_subplot(1, 2, 2)
	# plt.imshow(imageB, cmap = plt.cm.gray)
	# plt.axis("off")
 
	# # show the images
	# plt.show()


original = cv2.imread("./public/resources/scripts/test/final1.png",1)
contrast = cv2.imread("./public/resources/scripts/test/final2.png",1)


# compare the images
compare_images(original, contrast, "Original vs. Contrast")