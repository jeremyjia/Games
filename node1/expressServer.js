const tag = "[expressServer.js_v0.41]"; 
const l = require('./logger');
const path = require('path'); 
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { OpenApiValidator } = require('express-openapi-validator'); 
const config = require('./config');
 
const spider = require('./app/spider/index.js');

l.tag1(tag,"-----------------------xd23------")
console.log(tag);     
  


class ExpressServer {
  constructor(port, openApiYaml) {
    this.openApiYaml = openApiYaml;
    this.port = port;
    this.app = express(); 
    this.setupMiddleware();
  } 
  setupMiddleware() {
    this.app.get('/', (req, res) => {      
      res.end('Hello index2.js.' + this.openApiYaml);
    });
    this.app.get('/spider', (req, res) => {      
      spider.spider(req,res);
      //res.end('spider.' + this.openApiYaml);
      /*
      res.status(200);
      var r = {};
      r.api = "spider";
      r.yaml = this.openApiYaml;
      r.query = req.query;
      res.json(r);
      */
    });
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
