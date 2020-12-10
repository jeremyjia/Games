const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({ format: winston.format.simple() }));
}
logger.tag = function(tag){  var o = {};  o.tag = tag;  console.log(o);}
logger.tag1 = function(tag,inf){  var o = {};  o.tag = tag; o.inf=inf; console.log(o);}

module.exports = logger;
