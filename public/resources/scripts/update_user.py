import sys

from pymongo import MongoClient

# Connecting to the mongo client
client = MongoClient('localhost',27017)
# Connecting to the database
db = client['rescueHomeless']
# Connecting to the required collection
collection = db['userDB']

userEmail = sys.argv[1]
imgID  	  =  sys.argv[2]

# Updating the record in the database
result = collection.update({'email':userEmail},{'$push': {"personIDs":imgID}})
if result:
	exit(0)
exit(1)