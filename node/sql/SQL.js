const tag = "[SQL.js_v0.142]";
const util = require( 'util' ); 
var mysql = require('mysql');
const config = require('../config'); 

const l = require('../logger');
l.tag(tag); 


async function queryList(myList) { 
      const db = makeDb( config.oLocalDB);  
      try {
        l.tag1(tag,'xdTest111111111111------------------------------------------------------ ' ); 
        for(i in myList){
          l.tag1(tag, i + ' _ls: ' + myList[i]); 
          const someRows = await db.query( myList[i] );
          l.tag1(tag,'xdTest_someRows: ' + JSON.stringify(someRows)); 
        }
        l.tag1(tag,'========================================================= ' ); 
      } catch ( err ) {
        // handle the error
        console.log(tag + " error: "+Date());
      } finally {
        await db.close();
      } 
}

function start() {  
  var myList = [
	'CREATE TABLE if not exists Group6Users(UserID varchar(255), UserName varchar(255), Password varchar(255), Coin int, Gem int, FirstName varchar(255),LastName varchar(255),EmailAddress varchar(255),Location varchar(255), PhoneNumber int, create_date TIMESTAMP, MMR int, is_Active boolean, is_Delete boolean, PRIMARY KEY (UserID), UNIQUE (UserName))',
	'CREATE TABLE if not exists PendingFriends(RequestID varchar(255),fromID varchar(255),toID varchar(255),status varchar(255), request_time varchar(255),PRIMARY KEY (RequestID))',
    'CREATE TABLE if not exists Friends(RequestID varchar(255),fromID varchar(255),toID varchar(255), response_time varchar(255),PRIMARY KEY (RequestID))'
  ];
  return queryList(myList);
}

// Call start
(async() => { 
        l.tag1(tag,"before   ---------------------------------------");
        await start();
        l.tag1(tag,"after    ========================================");        
})();



function makeDb( config ) {    
  l.tag1(tag,'makeDb: ' + JSON.stringify(config));
  const connection = mysql.createConnection( config );
  return {
    query( sql, args ) {
      return util.promisify( connection.query )
        .call( connection, sql, args );
    },
    close() {
      return util.promisify( connection.end ).call( connection );
    }
  };
}
exports._2RunSQLList = async function(sqlList){
  l.tag1(tag,"exports._2RunSQLList: "+Date()); 
  for(i in sqlList){
    l.tag1(tag,sqlList[i]);

  }
  await queryList(sqlList);
};

 exports._2RunSQL = function(sql){
   l.tag1(tag,"exports._2RunSQL: "+Date());
   _runSQL(sql);
 };

exports.init = function(){ 
    //check table1  db    Group6Users    t1
    var sql1 = "CREATE TABLE if not exists Group6Users(UserID varchar(255), UserName varchar(255), Password varchar(255), Coin int, Gem int, FirstName varchar(255),LastName varchar(255),EmailAddress varchar(255),Location varchar(255), PhoneNumber int, create_date TIMESTAMP, MMR int, is_Active boolean, is_Delete boolean, PRIMARY KEY (UserID), UNIQUE (UserName));";
    //check table2  db
    var sql2 = "CREATE TABLE if not exists Group6Game(GameID varchar(255), competitor_1 int, competitor_2 int, start_time varchar(255), end_time varchar(255), winner varchar(255), PRIMARY KEY (GameID));";
    var sql3 = "CREATE TABLE if not exists PendingFriends(RequestID varchar(255),fromID varchar(255),toID varchar(255), request_time varchar(255),PRIMARY KEY (RequestID));";
   
    _runSQL(sql1);
    _runSQL(sql2);   
    _runSQL(sql3);   
}

exports.getUserInfo = function(id,resolve,Service){ 
    var sR = tag+ " [getUserInfo] v0.21 : --------- UserID =" + id ;
    console.log(sR);
 
    var _sql = "SELECT * FROM Group6Users where UserID ='"+id+ "'";

    var con = mysql.createConnection({
      host: config.h,
      user: config.u,
      password: config.pw,
      database: config.db
    });
    con.connect();
    con.query(_sql, function (err, result, fields) {
        if (err)   {
          console.log(err);  
          console.log(err.sqlMessage);  
          sR = err.sqlMessage;
          resolve(Service.successResponse(sR));    
        } 
        else{
            console.log(result);  
            var r = JSON.stringify(result);
            console.log("xdtest:" + r);
            sR = r;
            resolve(Service.successResponse(sR));    
        }         
    }); 
	con.end();
    return sR;
}

function _runSQL(sql){ 
  console.log("_runSQL: sql="+sql);  
  var con = mysql.createConnection({
    host: config.h,
    user: config.u,
    password: config.pw,
    database: config.db
  });

  con.connect();
  con.query(sql, function (err, result, fields) {
      if (err)   {
        console.log(err);  
        console.log(err.sqlMessage);  
      } 
      else{ 
        var r = JSON.stringify(result);  
        console.log(r);  
    }    
  });
  con.end();
}

