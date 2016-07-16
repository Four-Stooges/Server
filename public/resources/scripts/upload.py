import sys

from pymongo import MongoClient

# Connecting to the mongo client
client = MongoClient('localhost',27017)
# Connecting to the database
db = client['rescueHomeless']
# Connecting to the required collection
collection = db['personDB']

image = sys.argv[1]
lat   = sys.argv[2]
lng = sys.argv[3]

result = collection.insert_one({"image":image, "latitude":lat,"longitude":lng,"status":"profiling"})
if result:
	exit(0)
exit(1)