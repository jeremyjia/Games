const tag = "[g6Default/getFriends.js_v0.15]"; 
const db = require("../../sequelize/models");
const g6F = db.Friends;
const l = require('../../logger');

 l.tag(tag);
 
exports.getFriends = function(resolve,Service){ 
  _sqlzUtil (resolve,Service);
} 

function _sqlzUtil (resolve,Service){ 
  var r = {}; 
  
  var condition =  null;    
  g6F.findAll({ where: condition })
  .then(data => {
      r.code = 1;   
      r.str = data;
      r.message = "getFriends: OK.";
      resolve(Service.successResponse(r));  
  })
  .catch(err => {
      r.code = -1;
      r.message = err.message;
      resolve(Service.successResponse(r));  
  }); 
} 
 