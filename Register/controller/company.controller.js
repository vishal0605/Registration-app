const db = require("../models");
const Company = db.company;

exports.companySignup = async (req, res, next) => {
    try {
        
        await Company.create({
            companyName: req.body.companyName
        })
        next();
    }
    catch (err) {
        res.send({ message: err.message });
    }
}

