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
  to: 'yongling.huang@group6.io,littleflute@163.com',
  subject: 'test2: Sending Email using Node.js',
   html: '<h1>Welcome</h1><p>That was easy! <a href="https://github.com/littleflute/blog/issues/844">link</a></p>'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});