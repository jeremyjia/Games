const config = require('./config');
const logger = require('./logger');
const ExpressServer = require('./expressServer');
const sql = require('./sql/SQL.js'); 

const db = require("./sequelize/models");


const launchServer = async () => {
  try {
    sql.initMySQL();
    db.sequelize.sync({alter:true});
    
    this.expressServer = new ExpressServer(config.HOST_PORT, config.OPENAPI_YAML);
    await this.expressServer.launch(); 
      
    logger.tag1("::",'process.env.DB_NAME = ' + process.env.DB_NAME + ', SENDGRID_API_KEY = ' + process.env.SENDGRID_API_KEY);
 

    const wsSvr = require("./old/js49/ws/index.js");
    wsSvr.wsRun(config.WEB_SOCKET_PORT);

  } catch (error) {
    logger.error(error);
    await this.close();
  }
};

launchServer().catch(e => logger.error(e));
