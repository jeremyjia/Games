const tagIndex = "index.js_v0.13";
const config = require('./config');
const l = require('./logger');
const ExpressServer = require('./expressServer'); 
 

l.tag1(tagIndex,"---index.js-------");

const launchServer = async () => {
  try {  
    l.tag1(tagIndex,"--launchServer-------");
    
    this.expressServer = new ExpressServer(config.HOST_PORT, config.OPENAPI_YAML);
    await this.expressServer.launch(); 

    l.tag1(tagIndex,"--launchServer done-------");   
    
  } catch (error) {
    l.error(error);
    await this.close();
  }
};

launchServer().catch(e => l.error(e));
