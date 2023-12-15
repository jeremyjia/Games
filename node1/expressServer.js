const tag = "[expressServer.js_bv0.133]"; 
const l = require('./logger');
const path = require('path'); 
const express = require('express');
const cors = require('cors'); 
const bodyParser = require('body-parser');
 
const jsdom = require('jsdom'); 
const { JSDOM } = jsdom;
const d3 = import('d3');

const { OpenApiValidator } = require('express-openapi-validator'); 
const config = require('./config');
 
const songs = require('./app/songs/index.js');
const spider = require('./app/spider/index.js');
const _51voa = require('./app/spider/51voa/index.js');
const ScrapingAntClient = require('./app/spider/ScrapingAntClient/index.js');
const word = require('./app/word/index.js');
const abc2db = require('./app/abc2db/index.js');
const midi2abc = require('./app/midi2abc/index.js');
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
    

    this.app.get('/songs', (req, res) => {      
      songs.songs(req,res); 
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
    this.app.post('/abc2db', (req, res) => {    abc2db.abc2db(req,res);    });
    
    this.app.post('/midi2abc', (req, res) => {    midi2abc.midi2abc(req,res);    });

    this.app.get('/downloadImage', (req, res) => {    img.download(req,res);    });
    
    this.app.get('/api/data', (req, res) => {
      const data = [100, 50, 300, 40, 350, 250];  
      res.json(data);
    });
    this.app.get('/api/svg', (req, res) => { 
        mkSVG(res); 
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


async function mkSVG(res) {
  const fakeDom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
 

  let body = (await d3).select(fakeDom.window.document).select('body');

  // Make an SVG Container
  let svg = body.append('div').attr('class', 'container')
    .append("svg")
      .attr("width", 1280)
      .attr("height", 1024);

  // Draw a line
  let circle = svg.append("line")
    .attr("x1", 5)
    .attr("y1", 5)
    .attr("x2", 500)
    .attr("y2", 500)
    .attr("stroke-width", 2)
    .attr("stroke", "red");

  // Set Dimensions
const xSize = 500; 
const ySize = 500;
const margin = 40;
const xMax = xSize - margin*2;
const yMax = ySize - margin*2;

// Create Random Points
const numPoints = 100;
const data = [];
for (let i = 0; i < numPoints; i++) {
  data.push([Math.random() * xMax, Math.random() * yMax]);
}
 
  svg.append("g")
  .attr("transform","translate(" + margin + "," + margin + ")");
 
 
 

// Dots
svg.append('g')
  .selectAll("dot")
  .data(data).enter()
  .append("circle")
  .attr("cx", function (d) { return d[0] } )
  .attr("cy", function (d) { return d[1] } )
  .attr("r", 3)
  .style("fill", "Red");

  // Output the result to file
  
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(body.select('.container').html());
  res.end();
}

module.exports = ExpressServer;
