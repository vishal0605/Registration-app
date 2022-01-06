const nodemailer = require('nodemailer');

let trans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    //create a .env file and define the process.env variables 
    auth: {
        user: process.env.SMTP_TO_EMAIL,
        pass: process.env.SMTP_TO_PASSWORD,
    }
});
const fromEmail = process.env.EMAIL;
module.exports = { trans, fromEmail }
