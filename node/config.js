const path = require('path');

const config = {
  ROOT_DIR: __dirname,

  URL_PORT: process.env.URL_PORT ? process.env.URL_PORT : 8080,
  URL_PATH: process.env.URL_PATH ? process.env.URL_PATH : 'http://localhost',
  WEB_SOCKET_PORT: 9090,
  BASE_VERSION: 'v2',
  CONTROLLER_DIRECTORY: path.join(__dirname, 'controllers'),

  PRODUCTION: process.env.PRODUCTION,

  h: process.env.DB_HOST ? process.env.DB_HOST : "localhost",
  u: process.env.DB_USER ? process.env.DB_USER : "root",
  pw: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "group6db",
  db: "g6DB",

  oLocalDB:{
    host: process.env.DB_HOST ? process.env.DB_HOST : "localhost",
    user: process.env.DB_USER ? process.env.DB_USER : "root",
    password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "group6db",
    database: "g6DB"
  },

  redis_host: process.env.REDIS_HOST ? process.env.REDIS_HOST : "127.0.0.1",
  redis_port: process.env.REDIS_PORT ? process.env.REDIS_PORT : "6379",

  jwt_secret: process.env.JWT_SECRET ? process.env.JWT_SECRET : "0000000000000000",
};

config.OPENAPI_YAML = path.join(config.ROOT_DIR, 'api', 'openapi.yaml');
config.FULL_PATH = `${config.URL_PATH}:${config.URL_PORT}/${config.BASE_VERSION}`;
module.exports = config;
