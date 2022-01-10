const nodemailer = require('nodemailer');

let trans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    //create a .env file and define the process.env variables 
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
});
const fromEmail = process.env.EMAIL;
module.exports = { trans, fromEmail }
