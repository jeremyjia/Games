const tag = "[services/g6Admin/addItem.js_v0.14]";  
const db = require("../../sequelize/models");
const g6i = db.Group6Items;
const l = require('../../logger');
l.tag(tag);   

exports.addItem = async function(reqInf,resolve,Service)
{          
    await _sequelize_create_item(reqInf,resolve,Service);    
}


function  _sequelize_create_item(_item,resolve,Service) {
    const u = { 
        ItemID: _item.Item_ID, 
        ItemName: _item.Item_Name,
        ItemDescription: _item.Item_Description,
        ItemThumbnailID: _item.Item_Thumbnail_ID,
        ItemMetadata: _item.Item_Metadata 
    };
    
    l.tag1(tag,u);
   
    g6i.create(u)
      .then(data => {
          l.tag1(tag,u);
          var r = {};
          r.info = "successfully created item";
          r.item = u;
          resolve(Service.successResponse(r));
      })
      .catch(err => {
          l.tag1(tag,u);
          var r = {};
          r.info = "error!"; 
          resolve(Service.successResponse(r));
      });
}