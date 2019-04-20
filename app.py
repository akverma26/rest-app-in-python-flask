from flask import Flask, render_template, request, flash
from flask_restful import Resource, Api
import hashlib

app = Flask(__name__)
app.secret_key='dont tell'


@app.route('/')
@app.route('/',methods=['POST'])
def index():

	import mysql_connector
	result=mysql_connector.retrieve()

	allUsers=[]

	for user in result:
		allUsers.append(user[1])

	if request.method == 'POST':

		if request.form['submit']=='Insert Data':

			username=request.form['username']
			password=request.form['password']
			email=request.form['email']
			phone=request.form['phone']
			encrypt=request.form.get('encrypt')

			found=False

			if encrypt:
				password=hashlib.md5(password.encode()).hexdigest()

			import mysql_connector
			result=mysql_connector.retrieve()

			for user in result:
				if user[1]==email:
					found=True
					break
				
			mysql_connector.insert(username,password,email,phone,found)

			flash('Data Has Been Inserted')
			
			return render_template('index.html', data=False, allUsers=allUsers)

		elif request.form['submit']=='Search Data':

			emailId=request.form['search']

			userData=[]

			import mysql_connector
			result=mysql_connector.retrieve()

			if emailId=='ALL':
				for user in result:
					if user[4] is not None:
						userData.append( [user[0],user[1],user[2],user[4].strftime('%Y-%m-%d %H:%M:%S'),user[3]] )
					else:
						userData.append( [user[0],user[1],user[2],user[4],user[3]] )
					
			else:
				for user in result:
					if user[1]==emailId:
						if user[4] is not None:
							userData.append( [user[0],user[1],user[2],user[4].strftime('%Y-%m-%d %H:%M:%S'),user[3]] )
						else:
							userData.append( [user[0],user[1],user[2],user[4],user[3]] )
						break

			return render_template('index.html',userDetails=userData, data=True, allUsers=allUsers)

	else:

		return render_template('index.html', data=False, allUsers=allUsers)


if __name__ == '__main__':
	app.run(debug=True)