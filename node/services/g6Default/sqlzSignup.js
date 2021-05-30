const tag = "[g6Default/sqlzSignup.js_v0.34]"; 
const hash = require('../../utils/hash');
const ULID = require('ulid');
const db = require("../../sequelize/models");
const g6u = db.Group6Users;

const sgMail = require('../../utils/sgMail');

const l = require('../../logger');

 l.tag(tag);
  
exports.signup = async function(u,resolve,Service){ 
    var r = {};    
    r.hash = hash.toHash(u.Password);
   // us.add(u,r); 
    const u1 = await g6u.findOne({ where: { UserName: u.UserName } });
    if (u1 === null) {
        const u2 = await g6u.findOne({ where: { EmailAddress: u.EmailAddress } });
        if(u2 === null){
            await _sequelize_create(u);
            r.code = 1;
            r.info = "created a new user.";
            r.tag = tag;
            r.SENDGRID_API_KEY = process.env.SENDGRID_API_KEY?process.env.SENDGRID_API_KEY:"no sendgrid api key";
            sgMail.sendMail_4_verify_code(u.EmailAddress,u.UserName ,"test code.");
        }
        else{
            r.code = -2;
            r.info = "duplicated email.";
        }
    } else {
        r.code = -1;
        r.info = "duplicated name.";        
    }

    resolve(Service.successResponse(r));    
} 

function  _sequelize_create(user) {
    const u = {
      UserID: ULID.ulid(),
      UserName: user.UserName,
      Password: hash.toHash(user.Password),
      FirstName: user.FirstName,
      LastName: user.LastName,
      EmailAddress: user.EmailAddress,
      Location: user.Location,
      PhoneNumber: user.PhoneNumber,
      VerifyCode: ULID.ulid(),
      DateOfBirth: user.DateOfBirth,
      AgreeTerms: user.AgreeTerms
    };
    
    l.tag1(tag,u);
   
    g6u.create(u)
      .then(data => {
          l.tag1(tag,u);
      })
      .catch(err => {
          l.tag1(tag,u);
      });
}