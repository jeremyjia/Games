'use strict';

var utils = require('../utils/writer.js');
var Admins = require('../service/AdminsService');

module.exports.addInventory = function addInventory (req, res, next) {
  var inventoryItem = req.swagger.params['inventoryItem'].value;
  Admins.addInventory(inventoryItem)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
