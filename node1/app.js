
const sq = require('./sequelize')

module.exports = function(){
  var s = sq.f1();
  return 'test1:' + s;
}