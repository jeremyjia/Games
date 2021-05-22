
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs


  
const sgMail = require('@sendgrid/mail')

var e = {};

module.exports = e;

e.sendMail = function(){

    return "test to send email";
}

sgMail.setApiKey(process.env.pbzEmailKey)
const msg = {
  to: 'yongling@group6.io', // Change to your recipient
  from: '13699175164@sina.cn', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })