
const sq = require('./sequelize')

module.exports = function(){
  var s = sq.f1();
  return 'to test plugin.js: to do...!';
}