const tag = "[expressServer.js_v0.34]";
// const { Middleware } = require('swagger-express-middleware');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { OpenApiValidator } = require('express-openapi-validator');
const openapiRouter = require('./utils/openapiRouter');
const logger = require('./logger');
const jwt = require('jsonwebtoken');
const config = require('./config');

const blOld = require('./old/index');

console.log(tag);     
 
const token = require('./auth/token');

class ExpressServer {
  constructor(port, openApiYaml) {
    this.port = port;
    this.app = express();
    this.openApiPath = openApiYaml;
    this.schema = yamljs.load(openApiYaml);
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

	// verify authentitcation for all api endpoints
    this.app.use('/api', token.verify);


	// OpenAPI Router for api.yaml file
    this.app.use(openapiRouter());


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
        //res.end('Hello Group6.');
      });
      this.app.get('/blPlx.js', (req, res) => { 
        res.sendFile('blPlx.js' , { root : __dirname});       
        //res.end('Hello Group6.');
      });
      this.app.get('/plx/p1.js', (req, res) => { 
        res.sendFile('/plx/p1.js' , { root : __dirname});       
        //res.end('Hello Group6.');
      });
      this.app.use('/old',blOld.fOld);
      this.app.use('/spec', express.static(path.join(__dirname, 'api')));
      this.app.get('/hello', (req, res) => res.send('Hello World. path: '+this.openApiPath));
      this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(this.schema));
      this.app.post('/login', (req, res) => {
      	const _v_login = "v0.13";
      	console.log("login " + _v_login);
      	// Mock user
      	const user = {
      		v: _v_login,
      		id: 1,
      		username: 'yongling',
      		emial: 'yongling.huang@group6.io'
      	}
      	token.sign({user: user},(err, token) => {
      		res.json({
      			token
      		});
      	});
      });
	}

  }

  addErrorHandler() {
    this.app.use('*', (req, res) => {
      res.status(404);
      res.send(JSON.stringify({ error: `path ${req.baseUrl} doesn't exist` }));
    });
    /**
     * suppressed eslint rule: The next variable is required here, even though it's not used.
     *
     ** */
    // eslint-disable-next-line no-unused-vars
    this.app.use((error, req, res, next) => {
      const errorResponse = error.error || error.errors || error.message || 'Unknown error';
      res.status(error.status || 500);
      res.type('json');
      res.json({ error: errorResponse });
    });
  }

  async launch() {
    return new Promise(
      async (resolve, reject) => {
        try {
          this.addErrorHandler();
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

  async close() {
    if (this.server !== undefined) {
      await this.server.close();
      console.log(`Server on port ${this.port} shut down`);
    }
  }
}

module.exports = ExpressServer;
