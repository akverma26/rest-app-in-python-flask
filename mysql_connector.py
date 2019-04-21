#Importing Required Modules
import mysql.connector
import time
import datetime

#information about database to be connected
mydb = mysql.connector.connect(
	host="db-intern.ciupl0p5utwk.us-east-1.rds.amazonaws.com", #db-intern.ciupl0p5utwk.us-east-1.rds.amazonaws.com
	user="dummyUser",
	passwd="dummyUser01",
	database="db_intern"
)
cursor = mydb.cursor(buffered=True)

#method for inseerting the data
def insert(username,passwd,email,phone,found):
	ts = time.time()
	timestamp = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')

	#if the particular email id is already exist...
	if found:
		print(username+passwd+email+phone)
		#...Update that Data...
		formula = "UPDATE userData SET userName=%s, phoneNo=%s, password=%s, dateTime=%s WHERE emailId=%s"
		user =(username,phone,passwd,timestamp,email)
		cursor.execute(formula,user)
		mydb.commit()
	else:
		print('Nahi Mila')
		#...else insert new Data
		formula = "INSERT INTO userData (userName, emailId, phoneNo, password, dateTime) VALUES (%s, %s, %s, %s, %s)"
		user=(username,email,phone,passwd,timestamp)
		cursor.execute(formula,user)
		mydb.commit()
	
	return

#method for retrieving all data
def retrieve():
	cursor.execute('SELECT * FROM userData')
	return cursor