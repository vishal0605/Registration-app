const nodemailer = require('nodemailer');

let trans = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        user: 'rajpa4567890@gmail.com',
        pass: 'Raj@6500'
    }
});
const fromEmail = process.env.EMAIL;
module.exports = { trans, fromEmail }
