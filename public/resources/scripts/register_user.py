import sys

from pymongo import MongoClient

# Connecting to the mongo client
client = MongoClient('localhost',27017)
# Connecting to the database
db = client['rescueHomeless']
# Connecting to the required collection
collection = db['userDB']

userEmail = sys.argv[1]
pwd   = sys.argv[2]
userName = sys.argv[3]
contact = sys.argv[4]

result = collection.insert_one({"email":userEmail, "password":pwd,"name":userName,"contact":contact})
if result:
	exit(0)
exit(1)