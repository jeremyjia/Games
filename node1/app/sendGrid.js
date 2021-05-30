
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

// set pbzEmailKey=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
  
const sgMail = require('@sendgrid/mail')

var e = {};

module.exports = e;

e.sendEmail  = function(){
    sgMail.setApiKey(process.env.pbzEmailKey)
    const msg = {
    to: 'yongling.huang@group6.io', // Change to your recipient
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

    return "test to send email";
}

