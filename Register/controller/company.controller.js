const db = require("../models");
const Company = db.company;

exports.companySignup = async (req, res, next) => {
    try {
        if (!req.body.companyName) {
            res.status(404).send({
                message: 'companyName can not be blank'
            })
        }
        else {
            await Company.create({
                companyName: req.body.companyName
            })
            next();
        }
    }
    catch (err) {
        res.status(404).send({ message: err.message });
    }
}

