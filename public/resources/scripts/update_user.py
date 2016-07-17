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

# Fetching the record to be updated
record = collection.find({'email':userEmail})
# Fetching the field to be updated
pids = record['personIDs']
# Changing the list of persons
pids.append(imgID)
# Updating the record in the database
result = collection.update_one({'email':userEmail},{"$set": {"personIDs":pids}})
if result:
	exit(0)
exit(1)