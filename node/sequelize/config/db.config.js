const config = require('../../config');  

module.exports = {
    HOST: config.oLocalDB.host,
    USER: config.oLocalDB.user,
    PASSWORD: config.oLocalDB.password,
    DB: config.oLocalDB.database,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };