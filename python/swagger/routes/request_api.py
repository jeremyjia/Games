"""The Endpoints to manage the BOOK_REQUESTS"""
import uuid
import json  
import pymysql  # need to install pymysql first -wayne W 
from datetime import datetime, timedelta
from flask import jsonify, abort, request, Blueprint

from validate_email import validate_email
REQUEST_API = Blueprint('request_api', __name__)


def get_blueprint():
    """Return the blueprint for the main app module"""
    return REQUEST_API

# define the database-link parameter. -wayne W
config = {
"host":"127.0.0.1", # 地址
"port":3306, # 端口
"user":"www", # 用户名
"password":"5566", # 密码
"database":"book", # 数据库名;如果通过Python操作MySQL,要指定需要操作的数据库
"charset":"utf8"
}

# get the data from local json file. -wayne W
# with open("./routes/data1.json", 'r', encoding='utf-8') as f:
# 打开数据库连接
db = pymysql.connect(**config)
# 使用cursor()方法获取操作游标
cursor = db.cursor()
# SQL 查询语句
sql = "SELECT * FROM book_info;"
try:
   # 执行SQL语句
   cursor.execute(sql)
   # 获取所有记录列表
   results = cursor.fetchall()

# json_data = json.load(f)
# print(json_data)
# BOOK_REQUESTS = json_data
   BOOK_REQUESTS = results
except:
   print ("Error: unable to fetch the data")
 
# 关闭数据库连接
finally:
#cursor.close()
#conn.close()
   db.close()

#{   
    # "8c36e86c-13b9-4102-a44f-646015dfd981": {
    #    'title': u'Good Book',
    #    'email': u'testuser1@test.com',
    #    'timestamp': (datetime.today() - timedelta(1)).timestamp()
    # },
    # "04cfc704-acb2-40af-a8d3-4611fab54ada": {
    #     'title': u'Cad Book',
    #     'email': u'testuser2@test.com',
    #     'timestamp': (datetime.today() - timedelta(2)).timestamp()
    # }

#}

@REQUEST_API.route('/request', methods=['GET'])
def get_records():
    """Return all book requests
    @return: 200: an array of all known BOOK_REQUESTS as a \
    flask/response object with application/json mimetype.
    """
    db = pymysql.connect(**config)
    cursor = db.cursor()
    sql = "SELECT * FROM book_info;"
    try:
       cursor.execute(sql)
       results = cursor.fetchall()
       
       BOOK_REQUESTS = results
       db.close()
    finally:
       return jsonify(BOOK_REQUESTS)


@REQUEST_API.route('/request/<string:_id>', methods=['GET'])
def get_record_by_id(_id):
    """Get book request details by it's id
    @param _id: the id
    @return: 200: a BOOK_REQUESTS as a flask/response object \
    with application/json mimetype.
    @raise 404: if book request not found
    """
    db = pymysql.connect(**config)
    cursor = db.cursor()
    sql = "SELECT * FROM book_info;"
    try:
       cursor.execute(sql)
       results = cursor.fetchall()
       
       BOOK_REQUESTS = results
       db.close()

    finally:
        if _id not in BOOK_REQUESTS:
            abort(404)
        return jsonify(BOOK_REQUESTS[_id])


@REQUEST_API.route('/request', methods=['POST'])
def create_record():
    """Create a book request record
    @param email: post : the requesters email address
    @param title: post : the title of the book requested
    @return: 201: a new_uuid as a flask/response object \
    with application/json mimetype.
    @raise 400: misunderstood request
    """
    if not request.get_json():
        abort(400)
    data = request.get_json(force=True)

    if not data.get('email'):
        abort(400)
    if not validate_email(data['email']):
        abort(400)
    if not data.get('title'):
        abort(400)

    new_uuid = str(uuid.uuid4())
    book_request = {
        'title': data['title'],
        'email': data['email'],
        'timestamp': datetime.now().timestamp()
    }
    BOOK_REQUESTS[new_uuid] = book_request
    # save the new book to jason file, further jobs: need to rewrite the file under the formatal style for read it easily. -wayne W
    fo = open("./routes/data1.json", "w")
    fo.write( str(json.dumps(json_data)) )
    fo.close()
    # HTTP 201 Created
    return jsonify({"id": new_uuid}), 201
    

@REQUEST_API.route('/request/<string:_id>', methods=['PUT'])
def edit_record(_id):
    """Edit a book request record
    @param email: post : the requesters email address
    @param title: post : the title of the book requested
    @return: 200: a booke_request as a flask/response object \
    with application/json mimetype.
    @raise 400: misunderstood request
    """
    if _id not in BOOK_REQUESTS:
        abort(404)

    if not request.get_json():
        abort(400)
    data = request.get_json(force=True)

    if not data.get('email'):
        abort(400)
    if not validate_email(data['email']):
        abort(400)
    if not data.get('title'):
        abort(400)

    book_request = {
        'title': data['title'],
        'email': data['email'],
        'timestamp': datetime.now().timestamp()
    }

    BOOK_REQUESTS[_id] = book_request
    # save the new book to jason file, further jobs: need to rewrite the file under the formatal style for read it easily. -wayne W
    fo = open("./routes/data1.json", "w")
    # json.dump(str(jason_data),fo)
    fo.write( str(json.dumps(json_data)) )
    fo.close()
    return jsonify(BOOK_REQUESTS[_id]), 200


@REQUEST_API.route('/request/<string:_id>', methods=['DELETE'])
def delete_record(_id):
    """Delete a book request record
    @param id: the id
    @return: 204: an empty payload.
    @raise 404: if book request not found
    """
    if _id not in BOOK_REQUESTS:
        abort(404)

    del BOOK_REQUESTS[_id]
    # save the new book to jason file, further jobs: need to rewrite the file under the formatal style for read it easily. -wayne W
    fo = open("./routes/data1.json", "w")
    # json.dump(str(jason_data),fo)
    fo.write( str(json.dumps(json_data)) )
    fo.close()
    return '', 204
