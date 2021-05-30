const path = require('path');

const config = {
  ROOT_DIR: __dirname,

  VERIFY_REDIRECT_URL: process.env.VERIFY_REDIRECT_URL ? process.env.VERIFY_REDIRECT_URL : "http://localhost:3000/",
  RESET_PASSWORD_PAGE_URL: process.env.RESET_PASSWORD_PAGE_URL ? process.env.RESET_PASSWORD_PAGE_URL : "http://localhost:3000/reset_password",
  
  HOST_PORT: process.env.HOST_PORT ? process.env.HOST_PORT : 3000,
  PUBLIC_URL: process.env.PUBLIC_URL ? process.env.PUBLIC_URL : 'http://localhost:8080',
  WEB_SOCKET_PORT: 9090,
  BASE_VERSION: 'v2',
  CONTROLLER_DIRECTORY: path.join(__dirname, 'controllers'),

  PRODUCTION: process.env.PRODUCTION,
 

  oLocalDB:{
    host: process.env.DB_HOST ? process.env.DB_HOST : "localhost",
    user: process.env.DB_USER ? process.env.DB_USER : "root",
    password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "group6db",
    database: process.env.DB_NAME ? process.env.DB_NAME : "g6DB"
  },

  redis_host: process.env.REDIS_HOST ? process.env.REDIS_HOST : "127.0.0.1",
  redis_port: process.env.REDIS_PORT ? process.env.REDIS_PORT : "6379",

  jwt_secret: process.env.JWT_SECRET ? process.env.JWT_SECRET : "0000000000000000",
};

config.OPENAPI_YAML = path.join(config.ROOT_DIR, 'api', 'openapi.yaml');
config.FULL_PATH = `${config.PUBLIC_URL}/${config.BASE_VERSION}`;
module.exports = config;
