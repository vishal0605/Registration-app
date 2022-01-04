const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Invitation = db.invitation
//const Register = db.register;

verifyToken = (req, res, next) => {
    let token = req.params.token;
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            const timeObject = new Date();
            const datetime = new Date(timeObject.getTime() + 1000 * 3600);
            async (req, res) => {
                await Invitation.update({
                    expireAt: datetime,
                    status: 'expire'
                }, {
                    where: {
                        invitationToken: token
                    }
                })
            }
            return res.status(401).send({
                message: "Unauthorized!"

            });
        }
        req.id = decoded.id;
        next();
    });
};
const authJwt = {
    verifyToken: verifyToken
};
module.exports = authJwt;