const db = require("../models");
const Session = db.session;

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
    checkUserLoggedin: checkUserLoggedin
};


module.exports = verifySignin;