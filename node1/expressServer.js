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
    
    this.setupMiddleware();
  }

  setupMiddleware() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    new OpenApiValidator({
      apiSpecPath: this.openApiPath,
    }).install(this.app);
 
 


	 if (!config.PRODUCTION) { // development paths, disable for production
      this.app.get('/login-redirect', (req, res) => {
        res.status(200);
        res.json(req.query);
      });
      this.app.get('/oauth2-redirect.html', (req, res) => {
        res.status(200);
        res.json(req.query);
      });
      this.app.get('/', (req, res) => { 
        res.sendFile('index.html' , { root : __dirname});        
      }); 
      this.app.use('/old',blOld.fOld);
      this.app.use('/spec', express.static(path.join(__dirname, 'api'))); 
       
	  }
  }
 
  async launch() {
    l.tag1(tag,"xd21------")
    return new Promise(
      async (resolve, reject) => {
        try { 
          this.server = await this.app.listen(this.port, () => {
            console.log(`server running on port ${this.port}`);
            resolve(this.server);
          });
        } catch (error) {
          console.log("xddbg...");     
          reject(error);
        }
      },
    );
  }

  async close() {
    if (this.server !== undefined) {
      await this.server.close();
      console.log(`Server on port ${this.port} shut down`);
    }
  }
}

module.exports = ExpressServer;
