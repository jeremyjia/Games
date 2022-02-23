
const tag = "[g6Default/listItems.js_v0.23]";   
const db = require("../../sequelize/models");
const g6ui = db.Group6UserItems;
 
const config = require('../../config'); 
const l = require('../../logger');  
 l.tag(tag);
 
exports.listItems = async function(oBody,resolve,Service){   
  await _sqlz_list_items(oBody,resolve,Service);
}
  
async function _sqlz_list_items (oBody,resolve,Service){ 
    var ls = [];
    const u1 = await g6ui.findOne({ where: { UserID: oBody.UserID } });
    if (u1 === null) {
          var s = oBody.UserID + " can't find in database.";
          l.tag1(tag, s); 
    } else {
        ls.push(u1);  
    }
    var r = _makeUserItemList(ls);
    resolve(Service.successResponse(r));    
}
   
  function _makeUserItemList (r){  
    var l = [];
    for(i in r){
      var u = {}; 
      u.Version = "0.0.13";
      u.UserID = r[i].UserID;
      u.ItemID = r[i].ItemID;
      u.ItemQuantity = r[i].ItemQuantity; 
      l.push(u);
    }
    return l;
  }
  
