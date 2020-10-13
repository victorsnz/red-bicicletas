const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

let mailConfig;
if(process.env.NODE_ENV === 'production'){
  const options = {
    auth: {
      api_key: process.env.SENDGRID_API_SECRET
    }
  }
  mailConfig = sgTransport(options);
}else{
  if(process.env.NODE_ENV === 'staging'){
    console.log('XXXXXXXXXXX');
    const options = {
      auth: {
        api_key: process.env.SENDGRID_API_SECRET
      }
    }
    mailConfig = sgTransport(options);

  } else {
      mailConfig = {
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: process.env.ehtereal_user,
          pass: process.env.ethereal_pwd
        },
      };
  }
}

// const mailConfig = {
//   host: "smtp.ethereal.email",
//   port: 587,
//   auth: {
//     user: "vada4@ethereal.email",
//     pass: "TFx9HQn8U7vvvxet1B",
//   },
// };

module.exports = nodemailer.createTransport(mailConfig);