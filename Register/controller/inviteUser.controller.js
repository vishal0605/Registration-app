const db = require("../models");
const CompanyhasManyUser = db.companyhasManyUser;
const Invitation = db.invitation;
let jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const nodemailer = require('nodemailer');

exports.inviteUser = async (req, res) => {
    try {
        const companyhasManyUser = await CompanyhasManyUser.findOne({
            where: {
                companyId: req.query.companyId
            }
        })
        if (!companyhasManyUser) {
            res.send({ message: 'company Not Found!' });
        }
        const { email } = req.body;
        let token = jwt.sign({ id: companyhasManyUser.companyId }, config.secret, {
            expiresIn: '2h'
        });
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'rajpa4567890@gmail.com',
                pass: 'Raj@6500'
            }
        });
        const mailOptions = {
            from: 'rajpa4567890@gmail.com',
            to: email,
            subject: 'Invitation Link',
            html: `
                <h2>Please Click On this link for register in ${req.query.companyName}.</h2>
                <div>link : http://127.0.0.1:8080/api/auth/userSignup/${token}</div>
            `
        };
        await transporter.sendMail(mailOptions);
        await Invitation.create({
            companyId: req.query.companyId,
            email: email,
            invitationToken: token,
            expireAt: '2h'
        })
        return res.send({ message: 'Sent email to entered email address.' });
    }
    catch (err) {
        res.send({ message: err.message });
    }
}

exports.invitationReply = async (req, res) => {
    try {
        //const accept = { accept: req.body.accept }
        const { email, status } = req.body
        const userEmail = await Invitation.findOne({
            where: { email }
        })
        if (userEmail) {
            if (status === 'accept') {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'rajpa4567890@gmail.com',
                        pass: 'Raj@6500'
                    }
                });
                const mailOptions = {
                    from: 'rajpa4567890@gmail.com',
                    to: email,
                    subject: 'Invitation status',
                    html: `
                    <h2>You are invited by ${req.query.companyName}.</h2>
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
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'rajpa4567890@gmail.com',
                        pass: 'Raj@6500'
                    }
                });
                const mailOptions = {
                    from: 'rajpa4567890@gmail.com',
                    to: email,
                    subject: 'Invitation status',
                    html: `
                    <h2>You are rejected by ${req.query.companyName}.</h2>
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
        res.send({ message: err.message });
    }
}