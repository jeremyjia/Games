const config = require('./config');
const logger = require('./logger');
const ExpressServer = require('./expressServer'); 
 

const launchServer = async () => {
  try {  
    
    this.expressServer = new ExpressServer(config.HOST_PORT, config.OPENAPI_YAML);
    await this.expressServer.launch(); 
      
    logger.tag1("::",'process.env.DB_NAME = ' + process.env.DB_NAME + ', SENDGRID_API_KEY = ' + process.env.SENDGRID_API_KEY);
 
 

  } catch (error) {
    logger.error(error);
    await this.close();
  }
};

launchServer().catch(e => logger.error(e));
