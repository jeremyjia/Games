const tag = "[g6Default/checkEmailAddress.js_v0.24]";  
const db = require("../../sequelize/models");
const g6u = db.Group6Users;

const l = require('../../logger'); 

 l.tag(tag);
 
exports.check = async  function(EmailAddress,resolve,Service){   
    await _checkEmailAddress(EmailAddress,resolve,Service); 
}

async function _checkEmailAddress(_EmailAddress,resolve,Service) {    
    var r = {};
    const u1 = await g6u.findOne({ where: { EmailAddress: _EmailAddress } });
    if (u1 === null) {
        r.code = 0;
        r.info = _EmailAddress + " can be used to register.";     
    } else {
        r.code = 1;
        r.info = "duplicated email.";        
    }
    
    resolve(Service.successResponse(r));      
}