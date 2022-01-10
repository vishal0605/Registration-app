const db = require("../models");
const Session = db.session;
const User = db.user;


checkUserLoggedin = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            res.status(404).send({
                message: 'token not found in header!!!'
            })
        }
        else {
            const session = await Session.findOne(
                {
                    where: {
                        token: req.headers.authorization
                    }
                }
            )
            const user = await User.findOne({
                where: {
                    userId: session.userId
                }
            })
            next.auth = {
                isValid: false,
                session: session,
                user: user ,
                companyHasUsers: []
            }
            if (!session) {
                res.status(400).send({
                    message: "unauthorized!!!"
                });
                return;
            }
            next();
        }
    }
    catch (err) {
        res.send({ message: err.message });
    }

}
const verifySignin = {
    checkUserLoggedin: checkUserLoggedin,

};


module.exports = verifySignin;