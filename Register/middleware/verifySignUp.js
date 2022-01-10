const db = require("../models");
const User = db.user;
checkDuplicateEmail = async (req, res, next) => {
    try {
        const email = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        if (email) {
            res.status(400).send({
                message: "User is already registered, please check the email!!!"
            });
            return;
        }
        next();
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
};
const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail
};
module.exports = verifySignUp;