const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.Group6Users = require("./Group6User.model.js")(sequelize, Sequelize);
db.PendingFriends = require("./PendingFriends.model.js")(sequelize, Sequelize);
db.Friends = require("./Friends.model.js")(sequelize, Sequelize);
db.Group6Items = require("./Group6Item.model.js")(sequelize, Sequelize);
db.Group6UserItems = require("./Group6UserItem.model.js")(sequelize, Sequelize);

module.exports = db;