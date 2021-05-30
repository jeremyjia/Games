const tag = "[utils/sgMail.js_v0.31]"; 
const config = require('../config'); 
const l = require('../logger');
l.tag(tag);

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');

const e = {};

e.sendMail_4_verify_code = function(toEmail,userName,code){  
    sgMail.setApiKey(process.env.SENDGRID_API_KEY); 
    var myLink = config.PUBLIC_URL;
    myLink += "/api/verify?code=" + code;

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
               "yourLink": myLink,
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

e.sendMail_4_reset_password = function(toEmail,userName,code){  
   l.tag1(tag,toEmail);
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
              "yourLink": config.RESET_PASSWORD_PAGE_URL + "?code=" + code,
              "userName": userName + ": code = " + code
           }
        }
           
     ],
     "template_id":"d-35041a421f854326910ffedfc21100ce"
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


