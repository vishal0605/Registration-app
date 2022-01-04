const db = require("../models");
const Company = db.company;
const Invitation = db.invitation;
let jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const emailConfig = require("../config/email.config.js");
exports.inviteUser = async (req, res) => {
    try {
        const company = await Company.findOne({
            where: {
                companyId: req.header('companyId')
            }
        })
        if (!company) {
            res.send({ message: 'company Not Found!' });
        }
        const { email } = req.body;
        let token = jwt.sign({ id: company.companyId }, config.secret, {
            expiresIn: '1h'
        });
        const transporter = await emailConfig.trans;
        const mailOptions = {
            from: process.env,
            to: email,
            subject: 'Invitation Link',
            html: `
          <h2>Please Click On this link for register in company.</h2>
          <div>link : http://127.0.0.1:8080/api/auth/userSignup/${token}</div>
      `}
        await transporter.sendMail(mailOptions);
        await Invitation.create({
            companyId: company.companyId,
            email: email,
            invitationToken: token
        })
        return res.send({ message: 'Sent email to entered email address.' });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.invitationReply = async (req, res) => {
    try {
        const { email, status } = req.body
        const userEmail = await Invitation.findOne({
            where: { email }
        })
        if (userEmail) {
            if (status === 'accept') {
                const transporter = await emailConfig.trans;
                const mailOptions = {
                    from: process.env.FROM,
                    to: email,
                    subject: 'Invitation status',
                    html: `
                    <h2>You are invited by company.</h2>
                    <h3>You can signin using below link:</h3>
                    <div>http://127.0.0.1:8080/api/auth/signin</div>
                `
                };
                await transporter.sendMail(mailOptions);
                await userEmail.update({
                    status: 'accepted'
                })
                return res.send({ message: 'Sent Invitation email to User.' });
            }
            else {
                const transporter = await emailConfig.trans;
                const mailOptions = {
                    from: process.env.FROM,
                    to: email,
                    subject: 'Invitation status',
                    html: `
                    <h2>You are rejected by company.</h2>
                `
                };
                await transporter.sendMail(mailOptions);
                await userEmail.update({
                    status: 'rejected'
                })
                return res.send({ message: 'Sent Invitation email to User.' });

            }
        }
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}