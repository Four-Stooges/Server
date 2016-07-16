import sys
try:
	from pymongo import MongoClient

	# Connecting to the mongo client
	client = MongoClient('localhost',27017)
	# Connecting to the database
	db = client['rescueHomeless']
	# Connecting to the required collection
	collection = db['userDB']

	uName = sys.argv[1]
	pwd   = sys.argv[2]

	check = collection.find({"email":uName , "password":pwd})
	if check:
		# Exit code when valid login credentials
		exit(0)
 	# Exit code interpreted as invalid credentials
	exit(1)
except Exception:
	exit(2)
