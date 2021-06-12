const tag = "[g6Default/checkUserName.js_v0.25]";    
const db = require("../../sequelize/models");
const g6u = db.Group6Users;

const l = require('../../logger'); 

 l.tag(tag);
 
exports.check = async  function(UserName,resolve,Service){   
    await _checkUserName(UserName,resolve,Service);
}
 
async function _checkUserName(_userName,resolve,Service) {    
    var r = {};
    const u1 = await g6u.findOne({ where: { UserName: _userName } });
    if (u1 === null) {
        r.code = 0;
        r.info = _userName + " can be used to register.";     
    } else {
        r.code = 1;
        r.info = "duplicated name.";        
    }
    
    resolve(Service.successResponse(r));         
}