const tag = "[old/js49/ws/msgBox.js_v0.43] ";
const rSQL = require('../../../sql/SQL.js'); 
var mysql = require('mysql');
var SqlString = require('sqlstring');
const config = require('../../../config'); 
const l = require('../../../logger');
l.tag(tag); 
const eo = {};  
module.exports = eo;
 

eo.storeMsg = function(payLoad){ 
    _saveMsg2DB(payLoad); 
    
}
eo.checkMsg = function(id,clientList){    
    _getAllMsgFromDB(_makeMsgList,id,clientList);    
}

var _sendMsg = function(id,clientList,ml){ 
    for(j in ml){
        const payLoad = ml[j];
        
        var b = false;
        var cl = clientList;
        for(i in cl){
            if(!cl[i].isClosed )
            {
                if(i!="undefined")
                {
                   if( i==id 
                    && ml[j].toClientId==id
                    ){ 
                        cl[i].connection.send(JSON.stringify(payLoad)); 
                        b = true;
                   }     
                } 
            }
        }
    }
}
var _saveMsg2DB = function(payLoad){
    l.tag1(tag,payLoad);
    var _sql = "SELECT * FROM MessageBox";
    //"CREATE TABLE if not exists MessageBox(MessageID varchar(255),fromID varchar(255),toID varchar(255), time varchar(255),Message varchar(255),PRIMARY KEY (MessageID))"
    const ULID = require('ulid');
    var msgID = ULID.ulid();
    var fromID = payLoad.fromClientId;
    var toID = payLoad.toClientId;
    var time = Date();
    var msg = payLoad.msg;
    var s = "INSERT INTO MessageBox(MessageID,fromID,toID,time,  Message)VALUES (";
    s += SqlString.escape(msgID)+ ","+SqlString.escape(fromID)+ ","+SqlString.escape(toID);
    s += ","+SqlString.escape(time)+ ","+SqlString.escape(msg);
    s += ")";
    var _sql = s;
    //*
    var con = mysql.createConnection({ host: config.h, user: config.u, password: config.pw,  database: config.db});
    con.connect(function(err) {      
      if (err) throw err;    

      con.query(_sql, function (err, result, fields) {
          if (err)   {
            console.log(err);  
            console.log(err.sqlMessage);  
            sR = err.sqlMessage;  
          } 
          else{ 
              sR = result;  
              l.tag1(tag,result);
          }         
      }); 
    });     
    //*/
}


var _getAllMsgFromDB = function(cb,_id,clientList){ 
    var _sql1 = "SELECT * FROM MessageBox";
    var _f = function(_r){ 
        cb(_r,_id,clientList);
    }
    rSQL._2RunSQL1(_sql1,_f);  

    
    var _sql2 = "DELETE FROM MessageBox WHERE toID='"+_id+"';";     rSQL._2RunSQL1(_sql2);  
}

function _makeMsgList (r,id,clientList){   
    var _ml = [];
    for(i in r){
        l.tag1("_makeMsgList",r[i].Message);
        var m = {
            method      : 'mChat2All',
            fromClientId: r[i].fromID,
            toClientId  : r[i].toID,
            msg         : r[i].Message
          }
          _ml.push(m);
    } 
    _sendMsg(id,clientList,_ml); 
  }

   