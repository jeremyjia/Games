"""A Python Flask REST API BoilerPlate (CRUD) Style"""

import argparse
import os
from urllib.request import HTTPHandler
from flask import Flask, jsonify, make_response, render_template
from flask_cors import CORS #解决Flask跨域问题
from flask_swagger_ui import get_swaggerui_blueprint
from routes import request_api
from datetime import datetime

APP = Flask(__name__)
CORS(APP, resources=r'/*') #解决Flask跨域问题
@APP.route('/')


def index():
    now = datetime.now()
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
    return "<html><body>\
        <h3>version 1.0 The Current Time: \
        <script>var myDate = new Date(); document.write(myDate.toLocaleString())</script></h3>\
        <div> <p>Please go to the index page: <a href=http://localhost:5000/swagger/>Swagger</a>\
        </p></div></body></html>"
    #return render_template('index.html') 
    #return "<body><div <h3>This is a header</h3> <p>This is a paragraph.</p> </div></body>"
    
# datetime object containing current date and time
    #now = datetime.now()
    #print("now =", now)
    # dd/mm/YY H:M:S
    #dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
    #print("date and time =", dt_string)
    
@APP.route('/test1')
def test1():
    now = datetime.now()
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
    return render_template('index.html')

@APP.route('/benny')
def benny():
    return render_template('/53/i.html')

@APP.route('/style.css')
def css():
    return render_template('/53/style.css')


@APP.route('/index.js')
def js():
    return render_template('/53/index.js')

### swagger specific ###
SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json'
SWAGGERUI_BLUEPRINT = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "Seans-Python-Flask-REST-Boilerplate"
    }
)
APP.register_blueprint(SWAGGERUI_BLUEPRINT, url_prefix=SWAGGER_URL)
### end swagger specific ###


APP.register_blueprint(request_api.get_blueprint())

@APP.errorhandler(400)
def handle_400_error(_error):
    """Return a http 400 error to client"""
    return make_response(jsonify({'error': 'Misunderstood'}), 400)


@APP.errorhandler(401)
def handle_401_error(_error):
    """Return a http 401 error to client"""
    return make_response(jsonify({'error': 'Unauthorised'}), 401)


@APP.errorhandler(404)
def handle_404_error(_error):
    """Return a http 404 error to client"""
    return make_response(jsonify({'error': 'Not found'}), 404)


@APP.errorhandler(500)
def handle_500_error(_error):
    """Return a http 500 error to client"""
    return make_response(jsonify({'error': 'Server error'}), 500)


if __name__ == '__main__':

    PARSER = argparse.ArgumentParser(
        description="Seans-Python-Flask-REST-Boilerplate")

    PARSER.add_argument('--debug', action='store_true',
                        help="Use flask debug/dev mode with file change reloading")
    ARGS = PARSER.parse_args()

    PORT = int(os.environ.get('PORT', 5000))

    if ARGS.debug:
        print("Running in debug mode")
        CORS = CORS(APP)
        APP.run(host='127.0.0.1', port=PORT, debug=True)
    else:
        APP.run(host='localhost', port=PORT, debug=False)
