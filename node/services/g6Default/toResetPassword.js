const tag = "[g6Default/toResetPassword.js_v0.52]"; 

const db = require("../../sequelize/models");
const g6u = db.Group6Users;
 
const hash = require('../../utils/hash'); 
const l = require('../../logger'); 

 l.tag(tag);
 
exports.toResetPassword =   function(req,resolve,Service){  
    _sqlz_2_ResetPW(req,resolve,Service);
}

async function _sqlz_2_ResetPW(req,resolve,Service){    
    var code = req.code;    
    var npw = req.newPW; 

    var r = {};
    r.code = code; 

    var newData = { 
        "Password": hash.toHash(npw)
    };
    
    await g6u.update(newData, {
        where: { VerifyCode: code }
      })
    .then(num => {
          if (num == 1) {
              r.message = "Group6User was updated successfully.";
          } else {
            r.message = `num=${num} : Cannot update database with code=${code}`;
            r.codeInDB = "NO"; 
          }
    })
    .catch(err => {
            r.message = "Error updating database with code=" + code;
            r.codeInDB = "unknown"; 
            resolve(Service.successResponse(r)); 
    });

    resolve(Service.successResponse(r));	  
}
 