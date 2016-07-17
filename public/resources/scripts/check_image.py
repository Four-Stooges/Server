import glob
from subprocess import call
import sys

test_file = sys.argv[1]
pics = glob.glob('../images/*.*')
for pic in pics:	
	if call(['python3','face_detect.py',test_file,pic]) == 0:
		exit(0)
exit(1)