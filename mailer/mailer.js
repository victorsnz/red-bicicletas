const nodemailer = require('nodemailer');

const mailConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "vada4@ethereal.email",
    pass: "TFx9HQn8U7vvvxet1B",
  },
};

module.exports = nodemailer.createTransport(mailConfig);