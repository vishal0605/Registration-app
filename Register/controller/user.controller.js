const db = require("../models");
const config = require("../config/auth.config.js");
const User = db.user;
const Company = db.company;
const Session = db.session;
const CompanyhasManyUser = db.companyhasManyUser;
const emailConfig = require("../config/email.config.js");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");





//signup
exports.signup = async (req, res, next) => {
    try {
        const company = await Company.findOne({
            where: {
                companyName: req.body.companyName
            }
        })
        const user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        })
        await CompanyhasManyUser.create({
            companyId: company.companyId,
            userId: user.userId
        })
        if (user) {
            res.send({ message: "User Was registerd succesfully!" });
        }
    }
    catch (err) {
        res.status(404).send({ message: err.message });
    }
}


//user signin
exports.signin = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        const companyhasManyUser = await CompanyhasManyUser.findOne({
            where: {
                userId: user.userId
            }
        })
        const company = await Company.findOne({
            where: {
                companyId: companyhasManyUser.companyId
            }
        })
        if (!user) {
            return res.status(404).send({ message: "User Not Found." });
        }
        let token = 'Bearer ' + jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400
        });
        await Session.create({
            userId: user.userId,
            token: token,
            status: Session.status
        })
        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({
                Token: null,
                message: "Invalid password!"
            });
        }
        let users = await User.findOne({
            where: {
                userId: user.userId
            }
        })
        res.status(200).send(
            {
                users,
                company,
                session: {
                    userId: user.userId,
                    token: token,
                    status: Session.status
                }
            });
    }
    catch (err) {
        res.status(404).send({ message: err.message });
    }
}



//logout user
exports.logout = async (req, res) => {
    try {
        const session = await Session.findOne({
            where: {
                token: req.headers.authorization
            }
        })
        if (req.headers.authorization === session.token && session.status === 'active') {
            Session.update({
                status: 'Expierd'
            },
                {
                    where: {
                        token: req.headers.authorization
                    },
                })
            res.send({ message: "User logged out sucessfully!" });
        } else {
            res.send({ message: 'token unauthorized!' });
        }
    }
    catch (err) {
        res.status(404).send({ message: err.message });

    }
}


//get user
exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                userId: req.header('userId')
            }
        })

        if (user) {
            res.send({
                user: {
                    userId: user.userId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    status: user.status
                }
            })
        }
        else {
            res.send({ message: 'Invalid email!' });
        }
    }
    catch (err) {
        res.status(404).send({ message: err.message });
    }
}


//get userSession list
exports.userSessionList = async (req, res) => {
    try {
        const session = await Session.findAll({
            limit: Session.userId,
            where: {
                userId: req.header('userId'),
            }
        });

        if (session) {
            res.send({ user: session });
        } else {
            res.send({ message: 'User sessions not found!' });
        }
    }
    catch (err) {
        res.status(404).send({ message: err.message });
    }
}



//forgot password
exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(400).json({ error: "User with this email does not exist." });
        }
        let token = 'Bearer ' + jwt.sign({ id: user.userId }, config.secret, { expiresIn: 86400 });
        const transporter = await emailConfig.trans;
        const mailOptions = {
            from: emailConfig.fromEmail,
            to: email,
            subject: 'Invitation Link',
            html: `<h2>Please Use Below Token To Reset Your Password.</h2>
                <div>${token}</div>
            `
        };
        await transporter.sendMail(mailOptions);
        user.update({ emailToken: token });
        return res.send({ message: 'Please check the email and follow the instruction' });
    }
    catch (err) {
        console.log(process.env.EMAIL);
        res.status(404).send({ message: err.message });
    }
}


//reset password
exports.resetPassword = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                emailToken: req.headers.authorization
            }
        })
        if (user) {
            console.log(user, "bgadkgkgsknnfldn");
            if (req.body.newPassword) {
                await User.update({
                    password: bcrypt.hashSync(req.body.newPassword),
                    emailToken: req.headers.authorization
                }, {
                    where: { emailToken: req.headers.authorization }
                })
                res.json({ message: 'Password reset succesfully.' });
            }
            else {
                res.send({ message: 'New Password Required!' });
            }
        }
        else {
            res.json({ message: 'emailToken is invalid!' });
        }
    }
    catch (err) {
        res.status(404).send({ message: err.message });
    }
}


