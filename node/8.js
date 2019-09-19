var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: '163',
  auth: {
    user: 'littleflute@163.com',
    pass: 'xd178090'
  }
});

var mailOptions = {
  from: 'littleflute@163.com',
  to: 'yongling.huang@group6.io',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});