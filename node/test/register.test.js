const config = require('../config');
const logger = require('../logger');
const ExpressServer = require('../expressServer');
const ES = new ExpressServer(config.URL_PORT, config.OPENAPI_YAML);

const token = require('../auth/token');
const request = require('supertest'); 

const authHeader = `Bearer: ${token.getTestToken()}`;
const ac  = '*/*';
const u1 ={ UserID: 'd290f1ee-6c54-4b01-90e6-d701748f085b',
            UserName: 'u1',
            Password: '123abc',
            FirstName: 'Nes',
            LastName: 'Cohen',
            EmailAddress: '123abc@group6.com',
            Location: 'wids132 at 3ewed',
			PhoneNumber: '214567896' };

const lu1 ={ UserName:'u1',
			 Password:'123abc'};


describe('Test: NewPlayer', function() { 
/*
  it('Test 1.1: register a new user', function() {
      request(ES.app)
        .post('/api/NewPlayer')
        .send(u1)
		    .set('Authorization', authHeader)
        .set('accept', ac)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(201)  
  });
  */
});