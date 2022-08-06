const tag = "[g6Default/ReponseToMakeFriend.js_v0.23]"; 
const db = require("../../sequelize/models");
const g6F = db.Friends;
const l = require('../../logger'); 

 l.tag(tag);
 
exports.ReponseToMakeFriend = async function(oBody,resolve,Service){ 
    l.tag1(tag,JSON.stringify(oBody));
    var r = {}; 
    r.ReqID = oBody.ReqID;
    r.FromID = oBody.FromID;
    r.ToID = oBody.ToID;
    

    var newData = { 
      "RequestID": oBody.ReqID,
      "FromID": oBody.FromID,
      "ToID": oBody.ToID,
      "status": "Yes"
  };
  
  await g6F.create(newData)
  .then(data => { 
      r.code = 1; 
      r.data = data;
      resolve(Service.successResponse(r)); 
  })
  .catch(err => {
    r.code = -1; 
    r.data = err;
    resolve(Service.successResponse(r)); 
  });
     
}
