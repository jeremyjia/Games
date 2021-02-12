const config = require('../config');
const logger = require('../logger');
const ExpressServer = require('../expressServer');
const ES = new ExpressServer(config.URL_PORT, config.OPENAPI_YAML);

const request = require('supertest'); 
const u1 = {  
              UserName: 'u1',
              Password: 'u1'
            };

describe('auto test 2: NewPlayer and check duplicate player', function() {
  
    it('Test 2.1: register a new user.', function() {      
      request(ES.app)
        .post('/api/NewPlayer')
        .send(u1)
        .set('accept', '*/*')
        .expect('Content-Type', /json/)
        .expect(200) 
    });

    it('Test 2.2: register the user again.', function() {
        request(ES.app)
          .post('/api/NewPlayer')
          .send(u1)
          .set('accept', '*/*')
          .expect('Content-Type', /json/)
          .expect(200)   
    }); 
});