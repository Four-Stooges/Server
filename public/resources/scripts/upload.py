import sys
from subprocess import call
from pymongo import MongoClient
import glob

# Connecting to the mongo client
client = MongoClient('localhost',27017)
# Connecting to the database
db = client['rescueHomeless']
# Connecting to the required collection
collection = db['personDB']
newcollection = db['ngoDB']

image = './public/resources/images/' + sys.argv[1]
lat   = sys.argv[2]
lng = sys.argv[3]

flag = 0
pics = glob.glob('./public/resources/scripts/images/*.*')
for pic in pics:
	if call(['python3','./public/resources/scripts/face_detect.py',image,pic]) == 0:
		flag = 1
		break

call(["cp","./public/resources/images/"+sys.argv[1],"./public/resources/scripts/images/"])
if flag==1:
	imgname = pic.split('/').pop()
	record = list(collection.find({"image":imgname}))[0]
	record['status'] = "profiled"
	newcollection.insert(record)

# if image not found
PID = collection.find().count()
location = [{"latitude":lat,"longitude":lng,"count":1}]
result = collection.insert_one({"PID":PID,"image":image, "location":location,"status":"profiling"})