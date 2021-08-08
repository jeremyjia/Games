"""The Endpoints to manage the BOOK_REQUESTS"""
# READ ME: before run app.py, kindly ensure that your client has already installed the MySQL database (like mysql-installer-web-community editoin) properly, and you have done with the initialization process.\ 
# Also, you may help yourself adjust some codes in this file, including lines 22, 23, 32 and 33 line as the detailed instruction below. -wayneW
# Some problem: after you run the app.py successfully, you may annotate lines 19 to 60 as you have already created the database, or the app.py cannot run correctly. -wayneW
import os
import uuid
import json  
import pymysql  # need to install pymysql first -wayne W
import mysql.connector 
from datetime import datetime, timedelta
from flask import jsonify, abort, request, Blueprint

from validate_email import validate_email
REQUEST_API = Blueprint('request_api', __name__)


def get_blueprint():
    """Return the blueprint for the main app module"""
    return REQUEST_API

# initializaed local database via creation a new database

# DB_NAME = "abc"
DB_NAME = str(os.getenv('dbname1'))
if DB_NAME == "None":
    DB_NAME = "mydb1"

mydb = mysql.connector.connect(
  host="127.0.0.1",
  user="www",  # please adjust the user name as same as the local MySQL's user name  -wayneW
  password="5566"  # change the password as you defined in your MySQL database  -wayneW
)

mycursor = mydb.cursor()
# 可以加一条判断 如果数据库已经存在 则跳过此步骤
mycursor.execute("CREATE DATABASE " + DB_NAME)  # mydb is created to record the bookinfo. -wayneW

mydb = mysql.connector.connect(
  host="127.0.0.1",
  user="www",   # please adjust the user name as same as local database user name  -wayneW
  password="5566",  # change the password as you defined in your local database  -wayneW
  database=DB_NAME  
)

mycursor = mydb.cursor()

mycursor.execute("CREATE TABLE `book_info` (\
  `uuid` varchar(45) NOT NULL,\
  `title` varchar(45) NOT NULL,\
  `email` varchar(40) NOT NULL,\
  `timestamp` varchar(30) NOT NULL,\
  PRIMARY KEY (`uuid`),\
  UNIQUE KEY `uuid_UNIQUE` (`uuid`)\
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COMMENT='for Swagger'")

sql = "INSERT INTO `book_info` (`uuid`, `title`, `email`, `timestamp`)\
 VALUES ('8c36e86c-13b9-4102-a44f-646015d4d981', 'Proceedings of Artworks', 'wayneW@196.com', '1626859035.678335');"
#  INSERT INTO `book`.`book_info` (`uuid`, `title`, `email`, `timestamp`)\
#  VALUES ('95cfcu04-acb2-99af-d8d2-7612fab56335', 'Sound of Music', 'foxtel@siinga.com', '1526866035.977766');"

mycursor.execute(sql)
mydb.commit()
print(mycursor.rowcount, "record inserted.")

mydb.close() 


# define the database-link parameter. -wayne W
config = {
"host":"127.0.0.1", # 地址
"port":3306, # 端口
"user":"www", # 用户名
"password":"5566", # 密码
"database":"mydb", # 数据库名;如果通过Python操作MySQL,要指定需要操作的数据库
"charset":"utf8"
}

# # get the data from local json file. -wayne W
# # with open("./routes/data1.json", 'r', encoding='utf-8') as f:
# # 打开数据库连接
# db = pymysql.connect(**config)
# # 使用cursor()方法获取操作游标
# cursor = db.cursor()
# # SQL 查询语句
# sql = "SELECT * FROM book_info;"
# try:
#    # 执行SQL语句
#    cursor.execute(sql)
#    # 获取所有记录列表
#    results = cursor.fetchall()

# # json_data = json.load(f)
# # print(json_data)
# # BOOK_REQUESTS = json_data
#    BOOK_REQUESTS = results
# except:
#    print ("Error: unable to fetch the data")
 
# # 关闭数据库连接
# finally:
# #cursor.close()
# #conn.close()
#    db.close()

@REQUEST_API.route('/request', methods=['GET'])
def get_records():
    """Return all book requests
    @return: 200: an array of all known BOOK_REQUESTS as a \
    flask/response object with application/json mimetype.
    """
    print ("begin")
    
    a = os.getenv('ENV_WINDIR')
    b = os.environ.get('WINDIR')
    # c = os.environ('ENV_PORT')
    d = os.getenv('windir')
    print (a)
    print (b)
    # print (c)
    print (d)
    print ("end")
    db = pymysql.connect(**config)
    cursor = db.cursor()
    sql = "SELECT * FROM book_info;"
    try:
       cursor.execute(sql)
       results = cursor.fetchall()
       BOOK_REQUESTS = results
       
    finally:
       return jsonify(BOOK_REQUESTS)
       db.close()


@REQUEST_API.route('/request/<string:_id>', methods=['GET'])
def get_record_by_id(_id):
    """Get book request details by it's id
    @param _id: the id
    @return: 200: a BOOK_REQUESTS as a flask/response object \
    with application/json mimetype.
    @raise 404: if book request not found
    """
    # _id = '{id}'
    # if not data.get('_id'):
    #     abort(400)
    
    if _id == '{id}':
        abort(400)   # caution 如果第一次访问什么id都没输入，则程序应返回400,但是没有成功
        
    db = pymysql.connect(**config)
    cursor = db.cursor()
    sql = "SELECT * FROM book_info WHERE uuid = '" + _id + "';"

    try:
       cursor.execute(sql)
       results = cursor.fetchall()
       BOOK_REQUESTS = results
      

    except:
       print ("Error: unable to fetch the data")

    finally:
       if _id == '{id}' or _id == '': #如果之前有过输入，则即使没有输入id，程序可返回400错误，因为系统默认输入了如下字符：{id}
           abort(400)
       elif BOOK_REQUESTS == '[]': #caution 如果查询的返回结果为空，即没有符合要求的书，程序应返回404，但是没有成功
           abort(404)
       return jsonify(BOOK_REQUESTS)
       db.close()
       


@REQUEST_API.route('/request', methods=['POST'])
def create_record():
    """Create a book request record
    @param email: post : the requesters email address
    @param title: post : the title of the book requested
    @return: 201: a new_uuid as a flask/response object \
    with application/json mimetype.
    @raise 400: misunderstood request
    """
    # INSERT INTO `book_info` (`uuid`, `title`, `email`, `timestamp`) VALUES ('95cfcu04-acb2-99af-d8d2-7612fab56336', 'Sound of Music', 'wayne@186.com', '1624575516.67565');
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
    title = str(data['title'])
    email = str(data['email'])
    timestamp = str(datetime.now().timestamp())

    # book_request = {
    #     'title': data['title'],
    #     'email': data['email'],
    #     'timestamp': datetime.now().timestamp()
    # }
    # BOOK_REQUESTS[new_uuid] = book_request

    db = pymysql.connect(**config)
    cursor = db.cursor()
    sql = "INSERT INTO book_info (`uuid`, `title`, `email`, `timestamp`) VALUES ('" + new_uuid + "', '" + title + "', '" + email + "', '" + timestamp + "');"
    try:
      cursor.execute(sql)
      db.commit()  #caution 这句非常重要，如果不写，就不会执行插入或更新操作。
      return jsonify({"id": new_uuid}), 201

    except:
       print ("Error: unable to create the data")

    finally:
       db.close()       
       
    # save the new book to jason file, further jobs: need to rewrite the file under the formatal style for read it easily. -wayne W
    # fo = open("./routes/data1.json", "w")
    # fo.write( str(json.dumps(json_data)) )
    # fo.close()
    #HTTP 201 Created    
    

@REQUEST_API.route('/request/<string:_id>', methods=['PUT'])
def edit_record(_id):
    """Edit a book request record
    @param email: post : the requesters email address
    @param title: post : the title of the book requested
    @return: 200: a booke_request as a flask/response object \
    with application/json mimetype.
    @raise 400: misunderstood request
    """   
    # if _id not in BOOK_REQUESTS:
    #     abort(404)

    if not request.get_json():
        abort(400)
    data = request.get_json(force=True)

    if not data.get('email'):
        abort(400)
    if not validate_email(data['email']):
        abort(400)
    if not data.get('title'):
        abort(400)


    title = str(data['title'])
    email = str(data['email'])
    timestamp = str(datetime.now().timestamp())

    # book_request = {
    #     'title': data['title'],
    #     'email': data['email'],
    #     'timestamp': datetime.now().timestamp()
    # }
    #  UPDATE `book`.`book_info` SET `title` = 'Pursue the Art', `email` = 'abdy@116.com', `timestamp` = '1524678397.05234' WHERE (`uuid` = '8c36e86c-13b9-4102-a44f-646015dfd982');
    # BOOK_REQUESTS[_id] = book_request

    db = pymysql.connect(**config)
    cursor = db.cursor()
    sql = "UPDATE book_info SET `title` = '" + title + "', `email` = '" + email + "', `timestamp` = '" + timestamp + "' WHERE uuid = '" + _id + "';"

    try:
      cursor.execute(sql)
      db.commit()  #caution 这句非常重要，如果不写，就不会执行插入或更新操作。
      return 'UPDATED', 200

    except:
       print ("Error: unable to edit the data")

    finally:
       db.close()    

    # save the new book to jason file, further jobs: need to rewrite the file under the formatal style for read it easily. -wayne W
    # fo = open("./routes/data1.json", "w")
    # # json.dump(str(jason_data),fo)
    # fo.write( str(json.dumps(json_data)) )
    # fo.close()
    # return jsonify(BOOK_REQUESTS[_id]), 200


@REQUEST_API.route('/request/<string:_id>', methods=['DELETE'])
def delete_record(_id):
    """Delete a book request record
    @param id: the id
    @return: 204: an empty payload.
    @raise 404: if book request not found
    """
    # if _id not in BOOK_REQUESTS:
    #     abort(404)
    # del BOOK_REQUESTS[_id]
    
    if _id == "{id}":  # caution 如果第一次访问什么id都没输入，则程序应返回400,但是没有成功
        abort(400)

    db = pymysql.connect(**config)
    cursor = db.cursor()
    sql = "DELETE FROM book_info WHERE uuid = '" + _id + "';"
    try:
      cursor.execute(sql)
      db.commit()
      # if not commit: abort(404)  #如果没有成功执行删除操作，证明没有这本书，应该返回404，现在没有实现 
      return jsonify({"DELETED ID": _id}), 204  # 删除成功后，希望显示被删除的书号，没有成功，感觉是204这个信息的格式问题。
      
    except:
       print ("Error: the data is not exist")
       abort(404)

    finally:
       db.close()
       
    # save the new book to jason file, further jobs: need to rewrite the file under the formatal style for read it easily. -wayne W
    # fo = open("./routes/data1.json", "w")
    # fo.write( str(json.dumps(json_data)) )
    # fo.close()

