const tag = "[SQL.js_v0.155]";
const util = require( 'util' ); 
var mysql = require('mysql');
const mysql2 = require('mysql2/promise');
const config = require('../config');  
var myData = require('../auth/data/testData.js');
const l = require('../logger');
l.tag(tag); 

 
async function queryList(myList) { 
  const db = makeDb( config.oLocalDB);  
  try {
    l.tag1(tag,'------------------------------------------------------ ' ); 
    for(i in myList){
      l.tag1(tag,'ls: ' + myList[i]); 
      const someRows = await db.query( myList[i] );
      l.tag1(tag,'someRows: ' + JSON.stringify(someRows)); 
    }
    l.tag1(tag,'========================================================= ' ); 
  } catch ( err ) {
    // handle the error
    console.log(tag + " error: "+Date());
  } finally {
    await db.close();
  } 
}

async function _g6Query(_sql,_cbFun) { 
  const db = makeDb( config.oLocalDB);  
  try {  
      const someRows = await db.query( _sql); 
      if(_cbFun) _cbFun(someRows); 
  } catch ( err ) { 
    console.log(tag + " error: " + err);
  } finally {
    l.tag1(tag," close: " + Date());
    await db.close();
  } 
} 
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

 exports._2RunSQL1 = function(_sql,_cbFun){  
   _g6Query(_sql,_cbFun);
 };
  
exports.initMySQL = async function(){
  l.tag1(tag,"initMySQL..."); 
  await exports.create_db_if_not_exists();
  await exports._2RunSQLList (myData.tables_4_init);
  l.tag1(tag,"initMySQL... finished.============"); 
} 
exports.create_db_if_not_exists = async function(){ 
    // create db if it doesn't already exist     
    const { host, port, user, password, database } = config.oLocalDB;
    const connection = await mysql2.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
}
 

function _runSQL(sql){ 
  console.log("_runSQL: sql="+sql);  
  var con = mysql.createConnection(config.oLocalDB);

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

