#Importing Required Modules
from flask import Flask, render_template, request, flash
from flask_restful import Resource, Api
import hashlib

app = Flask(__name__)
#Secret is required to secure the session for more info http://flask.pocoo.org/docs/0.12/quickstart/#sessions
app.secret_key='dont tell'


@app.route('/') #Only Route of the Website that is Homepage when first time page is loaded OR
@app.route('/',methods=['POST']) #when user submit the any of the form
def index():

	import mysql_connector
	result=mysql_connector.retrieve()

	allUsers=[]

	for user in result:
		allUsers.append(user[1])

	#Check for if the page is loaded after submitting the form
	if request.method == 'POST':

		#Check for if the submission form is for inserting the data
		if request.form['submit']=='Insert Data':

			#importing mysql module
			import mysql_connector
			result=mysql_connector.retrieve()

			#data from html form
			username=request.form['username']
			password=request.form['password']
			email=request.form['email']
			phone=request.form['phone']
			encrypt=request.form.get('encrypt')

			found=False

			#if user want to encrypt his password
			if encrypt:
				password=hashlib.md5(password.encode()).hexdigest()

			import mysql_connector
			result=mysql_connector.retrieve()

			#check for if entered email id is already exist or not
			for user in result:
				if user[1]==email:
					found=True
					break
				
			#insert or update the data, it will be done mysql module
			mysql_connector.insert(username,password,email,phone,found)

			#after successful submission this message will be flashed...
			flash('Data Has Been Inserted')
			
			#... on the same html page
			return render_template('index.html', data=False, allUsers=allUsers)

		#check for if the submission form for search the data
		elif request.form['submit']=='Search Data':

			#access the email id entered by the user
			emailId=request.form['search']

			userData=[]

			import mysql_connector
			result=mysql_connector.retrieve()

			#if user want all the data by entering 'ALL'...
			if emailId=='ALL':
				for user in result:
					if user[4] is not None:
						userData.append( [user[0],user[1],user[2],user[4].strftime('%Y-%m-%d %H:%M:%S'),user[3]] )
					else:
						userData.append( [user[0],user[1],user[2],user[4],user[3]] )
			#...else a particular email id		
			else:
				for user in result:
					if user[1]==emailId:
						if user[4] is not None:
							userData.append( [user[0],user[1],user[2],user[4].strftime('%Y-%m-%d %H:%M:%S'),user[3]] )
						else:
							userData.append( [user[0],user[1],user[2],user[4],user[3]] )
						break

			return render_template('index.html',userDetails=userData, data=True, allUsers=allUsers)

	#when the page is loaded first time without any submission
	else:

		return render_template('index.html', data=False, allUsers=allUsers)


if __name__ == '__main__':
	app.run(debug=True)