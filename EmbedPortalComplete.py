#             ▄▄             
#       ▄▄  ▄▄██▄▄  ▄▄       
#       ██  ▀▀██▀▀  ██       
#    ████████ ▀▀ ████████    
#       ██    ██    ██       ████████╗ █████╗ ██████╗ ██╗     ███████╗ █████╗ ██╗   ██╗
#    ██ ▀▀    ██    ▀▀ ██    ╚══██╔══╝██╔══██╗██╔══██╗██║     ██╔════╝██╔══██╗██║   ██║
#  ██████ ██████████ ██████     ██║   ███████║██████╔╝██║     █████╗  ███████║██║   ██║
#    ██ ▄▄    ██    ▄▄ ██       ██║   ██╔══██║██╔══██╗██║     ██╔══╝  ██╔══██║██║   ██║
#       ██    ██    ██          ██║   ██║  ██║██████╔╝███████╗███████╗██║  ██║╚██████╔╝
#    ████████ ▄▄ ████████       ╚═╝   ╚═╝  ╚═╝╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ 
#       ██  ▄▄██▄▄  ██                  HANDS ON TRAINING INITALIZATION...
#       ▀▀  ▀▀██▀▀  ▀▀       
#             ▀▀              
			 
#INITALIZE THIS VARIABLE
hotUser = 'byohotembed'


# import Flask library (class) that has needed functionality to build Web Server
# import render_template - this is library that works with Flask Jinja (HTML) templates
# import request - to access incoming request data, you can use the global request object.
# Flask parses incoming request data for you and gives you access to it through that global object.
# import flask_wtf and wtfforms are libraries that will help us with the form data

# initializing global variables
username = ''
tabServer = 'https://eu-west-1a.online.tableau.com'
tabSite = 'embeddedhot'
tabWorkbook = 'workbook_' + hotUser
tabRedirect = 'redirect_' + hotUser


from flask import Flask, render_template, request
from flask_cors import CORS, cross_origin
from flask_wtf import FlaskForm
from wtforms import StringField, validators

import requests
import datetime
import json
import uuid
import jwt



app = Flask(__name__)
CORS(app)
cors = CORS(app, resources={
    r"/*":{
        "origins": "*"
    }
})
app.debug = True
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate, public, max-age=0"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response




# this secret key is here a string just so we have forms working - if you want to know more google it ;-)
app.config['SECRET_KEY'] = 'somesecretkey'

# instance the form class - inheritance is from the FlaskForm.
# You can name the calss as you like - we named it "UserForm"
class UserForm(FlaskForm):
    # Below are the form fields we want to be able to capture and send (in our case just the username) to Tableau server.
    # These are used as form attributes in .html file
    # in the quotes is the text user will see when using the form
    username = StringField("Username:", validators=[validators.DataRequired()])

##########Rendering the login page##########
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login2')
def login2():
    return render_template('login2.html')
@app.route('/login3')
def login3():
    return render_template('login3.html')
@app.route('/login4')
def login4():
    return render_template('login4.html')
@app.route('/login9')
def login9():
    return render_template('login9.html')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.route('/loadingCA', methods=['GET','POST'])
@cross_origin()
def getJWT():
    global username
    if request.method == 'POST':
        username = request.form['username']
        uaf = ["Central","East","West","South"]
        if username == 'd.wong@sunniefoods.com' : uaf = ["Central"]
        print(username)
        CA_SSO_token = jwt.encode(
            {
                # Lesson 2
                # https://help.tableau.com/current/online/en-us/connected_apps.htm#step-3-configure-the-jwt
                # Set iss (Issuer) to Connected App Client ID
                "iss": '8269fe5a-cfc0-47b6-a609-d6a44f4548b0',
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=10),
                "jti": str(uuid.uuid4()),
                "aud": "tableau",
                "sub": username,
                #//-- Lesson 4, do not change this code until we reach this part of the course
                "myuaf": uaf,
                #-- End of Lesson 4--//
                "scp": ["tableau:views:embed", "tableau:metrics:embed"]
            },
            # Set this value to the Connected App Secret Key 
            'MQHdc+K1hBPM7tEQSicy6JNG2sc4OAxUqGeB3symnkE=',
            algorithm="HS256",
            headers={
                # Set kid (Key ID) to Connected App Secret ID
                'kid': '9c126702-63c6-47dc-ab0c-9063147b8a3b',
                # Set iss (Issuer) to Connected App Client ID
                'iss': '8269fe5a-cfc0-47b6-a609-d6a44f4548b0'
            }
        )

        headers = {
            'Access-Control-Allow-Origin': '*',
            'content-type': 'application/json'
        }

        print("Here's your JWT!: \n" + CA_SSO_token)
        if request.form['route'] =='2':
            return render_template('loader2.html', CA_SSO_token=CA_SSO_token,tabServer = tabServer, username=username, tabSite = tabSite, tabRedirect = tabRedirect)
        if request.form['route'] =='3':
            return render_template('loader3.html', CA_SSO_token=CA_SSO_token,tabServer = tabServer, username=username, tabSite = tabSite, tabRedirect = tabRedirect)
        if request.form['route'] =='4':
            return render_template('loader4.html', CA_SSO_token=CA_SSO_token,tabServer = tabServer, username=username, tabSite = tabSite, tabRedirect = tabRedirect)
        if request.form['route'] =='9':
            return render_template('complete.html', CA_SSO_token=CA_SSO_token,tabServer = tabServer, username=username, tabSite = tabSite, tabRedirect = tabRedirect, tabWorkbook = tabWorkbook)

@app.route('/lesson1')
def loadLesson1():
    return render_template('lesson1.html', username = username, tabServer = tabServer, tabSite = tabSite, tabWorkbook = tabWorkbook)
@app.route('/lesson2')
def loadLesson2():
    return render_template('lesson2.html', username = username, tabServer = tabServer, tabSite = tabSite, tabWorkbook = tabWorkbook)
@app.route('/lesson3_1')
def loadLesson3_1():
    return render_template('lesson3_1.html', username = username, tabServer = tabServer, tabSite = tabSite, tabWorkbook = tabWorkbook)
@app.route('/lesson3_2_1')
def loadLesson3_2_1():
    return render_template('lesson3_2_1.html', username = username, tabServer = tabServer, tabSite = tabSite, tabWorkbook = tabWorkbook)
@app.route('/lesson3_2_2')
def loadLesson3_2_2():
    return render_template('lesson3_2_2.html', username = username, tabServer = tabServer, tabSite = tabSite, tabWorkbook = tabWorkbook)
@app.route('/lesson3_3')
def loadLesson3_3():
    return render_template('lesson3_3.html', username = username, tabServer = tabServer, tabSite = tabSite, tabWorkbook = tabWorkbook)
@app.route('/lesson3_4')
def loadLesson3_4():
    return render_template('lesson3_4.html', username = username, tabServer = tabServer, tabSite = tabSite, tabWorkbook = tabWorkbook)
@app.route('/lesson4')
def loadLesson4():
    return render_template('lesson4.html', username = username, tabServer = tabServer, tabSite = tabSite, tabWorkbook = tabWorkbook)

@app.route('/complete')
def loadcomplete():
    return render_template('complete.html', username = username, tabServer = tabServer, tabSite = tabSite, tabWorkbook = tabWorkbook)





if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
