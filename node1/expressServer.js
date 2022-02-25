const tag = "[expressServer.js_v0.41]"; 
const l = require('./logger');
const path = require('path'); 
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { OpenApiValidator } = require('express-openapi-validator'); 
const config = require('./config');
 

l.tag1(tag,"-----------------------xd23------")
console.log(tag);     
  


class ExpressServer {
  constructor(port, openApiYaml) {
    this.port = port;
    this.app = express(); 
  } 

  async launch() {
    return new Promise(
      async (resolve, reject) => {
        try { 
          this.server = await this.app.listen(this.port, () => {
            console.log(`server running on port ${this.port}`);
            resolve(this.server);
          });
        } catch (error) {
          reject(error);
        }
      },
    );
  }
}

module.exports = ExpressServer;
