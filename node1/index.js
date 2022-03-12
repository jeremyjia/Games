const tagIndex = "index2.js_v0.11";
const config = require('./config');
const l = require('./logger');
const ExpressServer = require('./expressServer'); 
 

l.tag1(tagIndex,"xd1-------");

const launchServer = async () => {
  try {  
    l.tag1(tagIndex,"xd2-------");
    
    this.expressServer = new ExpressServer(config.HOST_PORT, config.OPENAPI_YAML);
    await this.expressServer.launch(); 

    l.tag1(tagIndex,"xd3-------");   
 

  } catch (error) {
    l.error(error);
    await this.close();
  }
};

launchServer().catch(e => l.error(e));
