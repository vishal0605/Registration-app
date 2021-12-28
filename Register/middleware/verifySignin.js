const db = require("../models");
const Session = db.session;

checkUserLoggedin = async (req, res, next) => {
    try {
        const session = await Session.findOne(
            {
                where: {
                    token: req.headers.authorization
                }
            }
        )
        if (!session) {
            res.status(400).send({
                message: "User is not logeed in , please check the email!!!"
            });
            return;
        }
        next();
    }
    catch (err) {
        res.send({ message: err.message });
    }

}
const verifySignin = {
    checkUserLoggedin: checkUserLoggedin
};


module.exports = verifySignin;