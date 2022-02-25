const tag = "[services/g6Admin/removeItem.js_v0.14]";  
const db = require("../../sequelize/models");
const g6i = db.Group6Items;
const l = require('../../logger');
l.tag(tag);   

exports.removeItem = async function(id,resolve,Service)
{         
    await _sequelize_remove_item(id,resolve,Service);    
}
 
function _sequelize_remove_item(id,resolve,Service){
    g6i.destroy({
        where: { ItemID: id }
      })
        .then(num => {
          if (num == 1) { 
            var r = {};
            r.message = "Group6Item was deleted successfully!";
            resolve(Service.successResponse(r));
          } else {
            var r = {};
            r.message = `Cannot delete Group6Item with id=${id}. Maybe Group6Item was not found!`;
            resolve(Service.successResponse(r));
          }
        })
        .catch(err => {
          var r = {};
          r.message = "Could not delete Group6Item with id=" + id;
          resolve(Service.successResponse(r));
        });
}