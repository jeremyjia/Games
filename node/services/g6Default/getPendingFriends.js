const tag = "[g6Default/getPendingFriends.js_v0.31]"; 
const db = require("../../sequelize/models");
const g6PF = db.PendingFriends;
const l = require('../../logger');

 l.tag(tag);
 
exports.getPendingFriends = function(resolve,Service){ 
    var r = {};
    r.tag = tag; 
    var condition =  null;    

    g6PF.findAll({ where: condition })
    .then(data => {
        r.code = 1;   
        r.str = data;
        r.message = "getPendingFriends: OK.";
        resolve(Service.successResponse(r));  
    })
    .catch(err => {
        r.code = -1;
        r.message = err.message;
        resolve(Service.successResponse(r));  
    });

      
} 
