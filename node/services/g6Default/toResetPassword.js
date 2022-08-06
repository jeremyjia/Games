const tag = "[g6Default/toResetPassword.js_v0.122]"; 

const db = require("../../sequelize/models");
const g6u = db.Group6Users;
const ULID = require('ulid');
const hash = require('../../utils/hash'); 
const l = require('../../logger'); 

 l.tag(tag);
 
exports.toResetPassword =   function(req,resolve,Service){  
    _sqlz_2_ResetPW(req,resolve,Service);
}

async function _sqlz_2_ResetPW(req,resolve,Service){    
    var code = _getCode(req.code); 
    var time1 = _getTime1(req.code);   
    var npw = req.newPW; 
 
    var r = {};
    r.code = code; 
    r.status = 0; 

    if("xxxx"==npw){     
        if(_timeOut(time1)){
            var r = {};
            r.timeout = "TRUE"; 
            r.status = 0;
            resolve(Service.successResponse(r));	
        }   
        else{
            const u1 = await g6u.findOne({ where: {  VerifyCode: code } });
            if (u1 === null) {
                r.status = 0;   
            } else {
                r.status = 1;   
            }
            resolve(Service.successResponse(r));  
        }        
    }
    else{
        if(_timeOut(time1)){
            var r = {};
            r.timeout = "TRUE"; 
            r.status = 0;
            resolve(Service.successResponse(r));	
        }  
        else{
            var newData = { 
                "Password": hash.toHash(npw),
                "VerifyCode": ULID.ulid()
            };
            
            await g6u.update(newData, {
                where: { VerifyCode: code }
              })
            .then(num => {
                  if (num == 1) {
                      r.message = "reseted password successfully.";
                      r.status = 1; 
                      resolve(Service.successResponse(r));	
                  } else {
                    r.message = `num=${num} : Cannot update database with code=${code}`;
                    r.codeInDB = "NO"; 
                    resolve(Service.successResponse(r));	
                  }
            })
            .catch(err => {
                    r.message = "Error updating database with code=" + code;
                    r.codeInDB = "unknown"; 
                    resolve(Service.successResponse(r));  
            });
        }
    } 
}
 
function _getCode (c){
    var a = c.split("_"); 
    return a[0];
}
function _getTime1 (c){
    var a = c.split("_"); 
    return a[1];
}
function _timeOut(t1){
    var now = new Date();
    var t2 = now.getTime();
    var dt = t2-t1; 
    var ms_TIME_OUT =  60*1000*60*24;
    if(dt>ms_TIME_OUT){
        return true;
    }
    else{
        return false;
    }
}