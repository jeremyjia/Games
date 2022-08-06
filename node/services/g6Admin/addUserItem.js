const tag = "[services/g6Admin/addUserItem.js_v0.15]";  
const db = require("../../sequelize/models");
const g6ui = db.Group6UserItems;
const l = require('../../logger');
l.tag(tag);   

exports.addUserItem = async function(reqInf,resolve,Service)
{          
    await _sequelize_create_user_item(reqInf,resolve,Service); 
}


function  _sequelize_create_user_item(_ui,resolve,Service) {
    const u = { 
        UserID: _ui.User_ID, 
        ItemID: _ui.Item_ID,
        ItemQuantity: _ui.Item_Quantity 
    };
    
    l.tag1(tag,u);
   
    g6ui.create(u)
      .then(data => {
          l.tag1(tag,u);
          var r = {};
          r.info = "successfully created user_item";
          r.item = u;
          resolve(Service.successResponse(r));
      })
      .catch(err => {
          l.tag1(tag,u);
          l.tag1(tag,u);
          var r = {};
          r.info = "error!"; 
          resolve(Service.successResponse(r));
      });
}