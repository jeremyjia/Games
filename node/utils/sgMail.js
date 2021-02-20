const tag = "[utils/sgMail.js_v0.22]";
const l = require('../logger');
l.tag(tag);

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');

const e = {};

e.sendMail = function(toEmail,userName,code){  
    sgMail.setApiKey(process.env.SENDGRID_API_KEY); 
    const msg = {
      "from":{
         "email":"no-reply@group6.io"
      },
      "personalizations":[
         {
            "to":[
               {
                  "email": toEmail
               }
            ],
            "dynamic_template_data":{ 
               "yourLink":"http://localhost:8080/api/verify?code="+code,
               "userName": userName
            }
         }
            
      ],
      "template_id":"d-bb803af1df4d403397da76e3d52311ff"
   };

    //ES6
    sgMail
      .send(msg)
      .then(() => {}, error => {
        console.error(error);
    
        if (error.response) {
          console.error(error.response.body)
        }
      });
} 

module.exports = e;


