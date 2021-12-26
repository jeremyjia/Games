"""The Endpoints to manage the BOOK_REQUESTS"""
# READ ME: before run app.py, kindly ensure that your client has already installed the MySQL database (like mysql-installer-web-community editoin) properly,\
# and you have done with the initialization setting, such as host, port, user(root), and keywords, etc. And in Ubuntu, need to reset password of admin user ('root'), in order to build new databases. - wayneW
# start the mysql service when your database is mysql. To CMD and run 'net start mysql80' or 'sudo service mysql start' in Ubuntu.
# Set temp env viaralbes in CMD by 'set dbtype=mysql(or json)'or in bash by 'export dbtype=mysql' and 'set dbname=bl_book'. check values of these viarables via 'set dbtype' or 'echo $dbtype' in bash, in order to easy-doing software test. 
# Also you can twinst these setting in /.routes/env_conf.json. Ensure these are fit for your local setting. Please set a database name and datatpye,such as mysql (default) or json.
# I notice that mysql database are not sensitive to case, so I set dbname = BL_book, but in fact the data name was set to bl_book. -wayneW
# Memo: after coding revise，启动浏览器localhost:5000, 发现修改并没有被即时体现。可能是浏览器缓存刷新，so reset the setting of edge，即还原所有设置，issue solved。第二天在没有进行任何设置还原的前提下，\
# chrome浏览器能成功体现前一天的代码修改内容。 -wayneW
import os
import uuid
import json  
import pymysql  # need to install pymysql first by commit 'pip3 install pymysql'-wayne W
import mysql.connector   # need to 'pip3 install mysql_connector_python' in Ubuntu
from datetime import datetime, timedelta
from flask import jsonify, abort, request, Blueprint
from validate_email import validate_email

REQUEST_API = Blueprint('request_api', __name__)


def get_blueprint():
    """Return the blueprint for the main app module"""
    return REQUEST_API

# get the Env viarables first, to set DB_TYPE via env viriables
# DB_TYPE = str(os.getenv('dbtype')) 
# DB_NAME = str(os.getenv('dbname')) 

# Decide to use json or MySQL database - wayneW.
with open("./routes/env_conf.json", 'r', encoding='utf-8') as ec:
    json_data = json.load(ec)
  # print(json_data)
DB_TYPE = os.getenv('dbtype')   
if DB_TYPE == None:
   DB_TYPE = json_data['DB_TYPE']

DB_NAME = os.getenv('dbname')
    
if DB_NAME == None:
   DB_NAME = json_data['DB_NAME']
else:
   fo = open("./routes/env_conf.json", "w")
   json_data['DB_NAME'] = DB_NAME
   fo.write(str(json.dumps(json_data)))
   fo.close()
     
print('dbtype: ', DB_TYPE)
print('dbname: ', DB_NAME)

# # BOOK_REQUESTS = json_data
#    BOOK_REQUESTS = results
# except:
#    print ("Error: unable to fetch the data")

# initializaed local database via creation a new database
# DB_NAME = "abc"
# DB_NAME = str(os.getenv('dbname'))   
# if DB_NAME == "None":
#     DB_NAME = "text_db"

# mydb = mysql.connector.connect(
#   host="127.0.0.1",
#   user="www",  # please adjust the user name as same as the local MySQL's user name  -wayneW
#   password="5566"  # change the password as you defined in your MySQL database  -wayneW
# )

if DB_TYPE == 'mysql':
  mydb = mysql.connector.connect(
  host = json_data['host'],
  port = str(json_data['port']),
  user = str(json_data['user']), 
  password = str(json_data['password']),
  charset = str(json_data['charset'])
  )

  mycursor = mydb.cursor()
  sql = "show databases;"  # get the mysql database list.
  mycursor.execute(sql)
  results = mycursor.fetchall()
  db_exist = 'no'    # set a variable to save the status of whether the pre-build database exist.
  num = len(results)
  tmp = json.dumps(results)
  tmp = json.loads(tmp)   # format the batabase lists.
  # print (tmp[0], DB_NAME) note that print result is ['bl_book'] bl_book. But when add[] around DB_NAME, will see the result is ['bl_book'] ['bl_book'], so tmp[i] == [DB_NAME] go right.

  # while statement to check whether the pre-build database name exist in the mysql database lists.  
  i = 0
  while i < num:
    # if tmp[i] == "[" + "'" + DB_NAME + "'" + "]":
    if tmp[i] == [DB_NAME]:  # 启示 字符串数据自带引号[DB_NAME]
      db_exist = 'yes'
      break
    i = i + 1
    # print (db_exist)
  if db_exist == 'yes':  
    print(mycursor.rowcount, "databases exist in total. # Kindly note that the database named" + " '" + DB_NAME + "' " + "exists already.") # Ensure the exist of databases. -wayneW
    
  else:
    mycursor.execute("CREATE DATABASE " + DB_NAME)  # Database named DB_NAME is created to record the bookinfo. -wayneW

    mydb = mysql.connector.connect(
    host = str(json_data['host']),
    port = json_data['port'],
    user = str(json_data['user']), 
    password = str(json_data['password']),
    charset = str(json_data['charset']),
    database = DB_NAME
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
# config = {
# "host":"127.0.0.1", # 地址
# "port":3306, # 端口
# "user":"www", # 用户名
# "password":"5566", # 密码
# # "database":"mydb", # 如果通过Python操作MySQL,要指定需要操作的数据库
# "database":DB_NAME,
# "charset":"utf8"
# }

else:
  # # get the data from local json file. -wayne W
  with open("./data/j_data.json", 'r', encoding='utf-8') as f:
    json_data = json.load(f)
    # print(json_data)
    BOOK_REQUESTS = json_data
    f.close
  #except:
  if json_data == '':
    print ("Error: unable to fetch the data")

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
# # 关闭数据库连接
# finally:
# #cursor.close()
# #conn.close()
#    db.close()



@REQUEST_API.route('/api1', methods=['GET'])
def api1_get_records():
    """Return all book requests
    @return: 200: an array of all known BOOK_REQUESTS as a \
    flask/response object with application/json mimetype.
    """
    # print ("begin")  # How to debug in a smart way.
    # a = os.getenv('ENV_WINDIR')
    # b = os.environ.get('WINDIR')
    # c = os.environ('ENV_PORT')
    # d = os.getenv('windir')
    # print (a)
    # print (b)
    # print (c)
    # print (d)
    # print ("end")
    with open("./routes/env_conf.json", 'r', encoding='utf-8') as ec:
      json_data = json.load(ec)

    if DB_TYPE == 'mysql':
        config = {
        "host":str(json_data['host']), 
        "port":json_data['port'], 
        "user":str(json_data['user']), 
        "password":str(json_data['password']), 
        "database":str(json_data['DB_NAME']),
        "charset":str(json_data['charset'])
        }
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
    
    else:
        with open("./data/j_data.json", 'r', encoding='utf-8') as f:
          json_data = json.load(f)
        # print(json_data)
          BOOK_REQUESTS = json_data
          return jsonify(BOOK_REQUESTS)
          f.close


@REQUEST_API.route('/request', methods=['GET'])
def get_records():
    """Return all book requests
    @return: 200: an array of all known BOOK_REQUESTS as a \
    flask/response object with application/json mimetype.
    """
    # print ("begin")  # How to debug in a smart way.
    # a = os.getenv('ENV_WINDIR')
    # b = os.environ.get('WINDIR')
    # c = os.environ('ENV_PORT')
    # d = os.getenv('windir')
    # print (a)
    # print (b)
    # print (c)
    # print (d)
    # print ("end")
    with open("./routes/env_conf.json", 'r', encoding='utf-8') as ec:
      json_data = json.load(ec)

    if DB_TYPE == 'mysql':
        config = {
        "host":str(json_data['host']), 
        "port":json_data['port'], 
        "user":str(json_data['user']), 
        "password":str(json_data['password']), 
        "database":str(json_data['DB_NAME']),
        "charset":str(json_data['charset'])
        }
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
    
    else:
        with open("./data/j_data.json", 'r', encoding='utf-8') as f:
          json_data = json.load(f)
        # print(json_data)
          BOOK_REQUESTS = json_data
          return jsonify(BOOK_REQUESTS)
          f.close


@REQUEST_API.route('/request/<string:_id>', methods=['GET'])
def get_record_by_id(_id):
    """Get book request details by it's id
    @param _id: the id
    @return: 200: a BOOK_REQUESTS as a flask/response object \
    with application/json mimetype.
    @raise 404: if book request not found
    """
    # if not data.get('_id'):
    #     abort(400)
    
    if _id == '{id}':
        abort(400)   # caution 如果第一次访问什么id都没输入，则程序应返回400,但是没有成功

    with open("./routes/env_conf.json", 'r', encoding='utf-8') as ec:
      json_data = json.load(ec)

    if DB_TYPE == 'mysql':
        config = {
        "host":str(json_data['host']), 
        "port":json_data['port'], 
        "user":str(json_data['user']), 
        "password":str(json_data['password']), 
        "database":str(json_data['DB_NAME']),
        "charset":str(json_data['charset'])
        }
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
            return 'THE BOOK INFO AS BELOW:\n' + str(BOOK_REQUESTS), 200
            db.close()
    else:
        with open("./data/j_data.json", 'r', encoding='utf-8') as f:
          json_data = json.load(f)
          BOOK_REQUESTS = json_data
          f.close
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


    with open("./routes/env_conf.json", 'r', encoding='utf-8') as ec:
      json_data = json.load(ec)

    if DB_TYPE == 'mysql':
        config = {
        "host":str(json_data['host']), 
        "port":json_data['port'], 
        "user":str(json_data['user']), 
        "password":str(json_data['password']), 
        "database":str(json_data['DB_NAME']),
        "charset":str(json_data['charset'])
        }
                
        new_uuid = str(uuid.uuid4())
        title = str(data['title'])
        email = str(data['email'])
        timestamp = str(datetime.now().timestamp())

        db = pymysql.connect(**config)
        cursor = db.cursor()
        sql = "INSERT INTO book_info (`uuid`, `title`, `email`, `timestamp`) VALUES ('" + new_uuid + "', '" + title + "', '" + email + "', '" + timestamp + "');"
        try:
          cursor.execute(sql)
          db.commit()  #caution 这句非常重要，如果不写，就不会执行插入或更新操作。
          # return jsonify({"NEW BOOK INSERTED, ITS ID": new_uuid}), 201
          return 'NEW BOOK INSERTED, ITS ID: ' + new_uuid, 201

        except:
          print ("Error: unable to create the data")

        finally:
          db.close()       

    else:
         new_uuid = str(uuid.uuid4())

         book_request = {
        'title': data['title'],
        'email': data['email'],
        'timestamp': datetime.now().timestamp()
    }
         BOOK_REQUESTS[new_uuid] = book_request   
         # save the new book to jason file, further jobs: need to rewrite the file under the formatal style for read it easily. -wayne W
         fo = open("./data/j_data.json", "w")
         fo.write( str(json.dumps(BOOK_REQUESTS)) )
         fo.close()
         # HTTP 201 Created
         return jsonify({"NEW BOOK INSERTED, ITS ID": new_uuid}), 201
            

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

    with open("./routes/env_conf.json", 'r', encoding='utf-8') as ec:
      json_data = json.load(ec)

    if DB_TYPE == 'mysql':
        config = {
        "host":str(json_data['host']), 
        "port":json_data['port'], 
        "user":str(json_data['user']), 
        "password":str(json_data['password']), 
        "database":str(json_data['DB_NAME']),
        "charset":str(json_data['charset'])
        }
              
        title = str(data['title'])
        email = str(data['email'])
        timestamp = str(datetime.now().timestamp())

        db = pymysql.connect(**config)
        cursor = db.cursor()
        sql = "UPDATE book_info SET `title` = '" + title + "', `email` = '" + email + "', `timestamp` = '" + timestamp + "' WHERE uuid = '" + _id + "';"

        try:
          cursor.execute(sql)
          db.commit()  #caution 这句非常重要，如果不写，就不会执行插入或更新操作。
          sql = "SELECT * FROM book_info WHERE uuid = '" + _id + "';"
          cursor.execute(sql)
          # return 'BOOK INFO UPDATED', 200
          BOOK_REQUESTS = cursor.fetchall()
          return 'BOOK INFO UPDATED BY: ' + str(BOOK_REQUESTS) + '\nNOTICE: IF SHOWN AS (), MEANS PROVIDED A FAKE ID', 200
          # return 'UPDATED A BOOK INFO, ITS ID: ' + _id, 200

        except:
          print ("Error: unable to edit the data")

        finally:
          db.close()    

    else:
        book_request = {
        'title': data['title'],
        'email': data['email'],
        'timestamp': datetime.now().timestamp()
        }
        with open("./data/j_data.json", 'r', encoding='utf-8') as f: # updated on 20210917
          json_data = json.load(f)       # updated on 20210917
          BOOK_REQUESTS = json_data      # updated on 20210917
          BOOK_REQUESTS[_id] = book_request
    
    # save the new book to jason file, further jobs: need to rewrite the file under the formatal style for read it easily. 'BOOK INFO UPDATED BY:'-wayne W
        fo = open("./data/j_data.json", "w")
        fo.write( str(json.dumps(BOOK_REQUESTS)) )
        fo.close()
        return jsonify({'BOOK INFO UPDATED BY':BOOK_REQUESTS[_id]}), 200


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

    with open("./routes/env_conf.json", 'r', encoding='utf-8') as ec:
      json_data = json.load(ec)

    if DB_TYPE == 'mysql':
        config = {
        "host":str(json_data['host']), 
        "port":json_data['port'], 
        "user":str(json_data['user']), 
        "password":str(json_data['password']), 
        "database":str(json_data['DB_NAME']),
        "charset":str(json_data['charset'])
        }

        db = pymysql.connect(**config)
        cursor = db.cursor()
        sql = "DELETE FROM book_info WHERE uuid = '" + _id + "';"
        try:
          cursor.execute(sql)
          db.commit()
          # if not commit: abort(404)  #如果没有成功执行删除操作，证明没有这本书，应该返回404，现在没有实现 
          # jsonify({"NEW BOOK ID": new_uuid}), 204 #原本是204  在swagger.json 文件的 line 171,原本是204，我改成200.
          return 'ID OF THE DELETED BOOK: ' + _id, 200  # 'THIS BOOK INFO UPDATED, ITS ID: ' + _id, 删除成功后，希望显示被删除的书号，没有成功，感觉是204 在网页上没有respond body这个展示框
          
        except:
          print ("Error: the data is not exist")
          abort(404)

        finally:
          db.close()
    else:
        del BOOK_REQUESTS[_id]
        fo = open("./data/j_data.json", "w")
        fo.write( str(json.dumps(BOOK_REQUESTS)) )
        fo.close()
        # return jsonify({"DELETED ID: ": _id}), 201
        return'ID OF THE DELETED BOOK: ' + _id, 200

@REQUEST_API.route('/request/<string:_id>', methods=['IMAGE'])
def edit_image(_id):
    """Edit a image, add several effects
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

    with open("./routes/env_conf.json", 'r', encoding='utf-8') as ec:
      json_data = json.load(ec)

    if DB_TYPE == 'mysql':
        config = {
        "host":str(json_data['host']), 
        "port":json_data['port'], 
        "user":str(json_data['user']), 
        "password":str(json_data['password']), 
        "database":str(json_data['DB_NAME']),
        "charset":str(json_data['charset'])
        }
              
        title = str(data['title'])
        email = str(data['email'])
        timestamp = str(datetime.now().timestamp())

        db = pymysql.connect(**config)
        cursor = db.cursor()
        sql = "UPDATE book_info SET `title` = '" + title + "', `email` = '" + email + "', `timestamp` = '" + timestamp + "' WHERE uuid = '" + _id + "';"

        try:
          cursor.execute(sql)
          db.commit()  #caution 这句非常重要，如果不写，就不会执行插入或更新操作。
          sql = "SELECT * FROM book_info WHERE uuid = '" + _id + "';"
          cursor.execute(sql)
          # return 'BOOK INFO UPDATED', 200
          BOOK_REQUESTS = cursor.fetchall()
          return 'BOOK INFO UPDATED BY: ' + str(BOOK_REQUESTS) + '\nNOTICE: IF SHOWN AS (), MEANS PROVIDED A FAKE ID', 200
          # return 'UPDATED A BOOK INFO, ITS ID: ' + _id, 200

        except:
          print ("Error: unable to edit the data")

        finally:
          db.close()    

    else:
        book_request = {
        'title': data['title'],
        'email': data['email'],
        'timestamp': datetime.now().timestamp()
        }
        with open("./data/j_data.json", 'r', encoding='utf-8') as f: # updated on 20210917
          json_data = json.load(f)       # updated on 20210917
          BOOK_REQUESTS = json_data      # updated on 20210917
          BOOK_REQUESTS[_id] = book_request
    
    # save the new book to jason file, further jobs: need to rewrite the file under the formatal style for read it easily. 'BOOK INFO UPDATED BY:'-wayne W
        fo = open("./data/j_data.json", "w")
        fo.write( str(json.dumps(BOOK_REQUESTS)) )
        fo.close()
        return jsonify({'BOOK INFO UPDATED BY':BOOK_REQUESTS[_id]}), 200