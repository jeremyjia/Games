const tag = "[t6_Item.test.js v0.13] ";
const config = require('../config'); 
const ExpressServer = require('../expressServer');
const ES = new ExpressServer(config.HOST_PORT, config.OPENAPI_YAML);
const request = require('supertest'); 
var assert = require('chai').assert; 
var testData = require('../auth/data/testData.js');
const { pw } = require('../config');
var ds = testData.getUserDatas(10);  
var iTest = 1;
var ts = tag;

describe(ts, function() { 
    var token = "";
    var n = 1; 
    it(tag+n+': login.', function() {     
          return request(ES.app)
            .post('/api/login')
            .send(ds[iTest])
            .set('accept', 'application/json')
            .set('Content-Type','application/json')
            .expect('Content-Type', /json/)
            .expect(200) 
            .then(response => {
                  console.log(tag + "****************** response.body=", response.body);
                  var s = "";
                  s += 'response.body.code = ' + response.body.code; 
                  token = response.body.token;
                  s += ' token = ' + token;
                  assert(response.body.code == 1, s );  
          }) 
    });  
  
  	it(tag +': lookupItem.', function() {//id=1 
      return request(ES.app)
       .get('/api/lookupItem?id='+1) 
       .set('accept', 'application/json')
       .set('Authorization','Bearer ' + token)
       .expect(200)
       .then(response => {      
            console.log(tag + "****************** response.body=", response.body);                 
            var o = response.body;  
            if(0==o.length){
              assert(0 == o.length,"l=" + o.length);  
            } 
            else{
              var id= o[0].ItemID;               
              assert(1 == id,"id=" + id);    
              var name= o[0].ItemName;               
              assert("item1" == name,"name=" + name);    
            }               
      })
    });	 
});
