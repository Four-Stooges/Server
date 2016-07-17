import sys

from pymongo import MongoClient

# Connecting to the mongo client
client = MongoClient('localhost',27017)
# Connecting to the database
db = client['rescueHomeless']
# Connecting to the required collection
collection = db['userDB']

userEmail = sys.argv[1]
result = collection.find({'email':userEmail})
pIDs = result['personIDs']
if len(pIDs)==0:
	exit(1)
print(pIDs.pop())
exit(0)