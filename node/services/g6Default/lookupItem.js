const tag = "[g6Default/lookupItem.js_v0.32]";   
const db = require("../../sequelize/models");
const g6i = db.Group6Items;
 
const config = require('../../config'); 
const l = require('../../logger');  
 l.tag(tag);
 
exports.getItem = async function(id,resolve,Service){   
  await _sqlzGetItemById(id,resolve,Service);
}
  
async function _sqlzGetItemById (_itemID,resolve,Service){   
    var ls = [];
    const u1 = await g6i.findOne({ where: { ItemID: _itemID } });
    if (u1 === null) {
          var s = _itemID + " can't find in database.";
          l.tag1(tag, s); 
    } else {
        ls.push(u1);  
    }
    var r = _makeItemList(ls);
    resolve(Service.successResponse(r));    
       
  }
  
  function _makeItemList (r){  
      var l = [];
      for(i in r){
        var u = {}; 
        u.Version = "0.0.13";
        u.ItemName = r[i].ItemName;
        u.ItemID = r[i].ItemID;
        u.ItemDescription = r[i].ItemDescription;
        u.ItemThumbnailID = r[i].ItemThumbnailID;
        u.ItemMetadata = r[i].ItemMetadata; 

        l.push(u);
      }
      return l;
    }
    
  