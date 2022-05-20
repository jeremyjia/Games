const tag = "[expressServer.js_v0.55]"; 
const l = require('./logger');
const path = require('path'); 
const express = require('express');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const { OpenApiValidator } = require('express-openapi-validator'); 
const config = require('./config');
 
const spider = require('./app/spider/index.js');
const _51voa = require('./app/spider/51voa/index.js');
const ScrapingAntClient = require('./app/spider/ScrapingAntClient/index.js');
const word = require('./app/word/index0.js');
const img = require('./app/image/index.js');

l.tag1(tag,"-----------------------expressServer.js------") 
  


class ExpressServer {
  constructor(port, openApiYaml) {
    this.openApiYaml = openApiYaml;
    this.port = port;
    this.app = express(); 
    this.setupMiddleware();
  } 
  setupMiddleware() {
    
    this.app.use(cors());
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.get('/', (req, res) => {      
      res.end('Hello index2.js.' + this.openApiYaml);
    });
    

    this.app.get('/spider', (req, res) => {      
      spider.spider(req,res); 
    });

    this.app.get('/spider/51voa', (req, res) => {      
      _51voa.index(req,res); 
    });

    this.app.get('/spider/ScrapingAntClient', (req, res) => {      
      ScrapingAntClient.scrape(req,res); 
    });

    this.app.post('/word', (req, res) => {    word.word(req,res);    });
    this.app.get('/downloadImage', (req, res) => {    img.download(req,res);    });
    
    this.app.get('/api/data', (req, res) => {
      const data = [100, 50, 300, 40, 350, 250]; // assuming this is coming from the database
      res.json(data);
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
