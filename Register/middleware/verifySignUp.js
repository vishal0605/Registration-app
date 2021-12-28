const db = require("../models");
const User = db.user;
//const Company = db.company;

//checkCompanyExist = async(req, res, next) => {
//    const company_email = await Company.findOne({
//        where: {
//           company_email: req.body.company_email
//        }
//    })
//    if(company_email){
//        res.status(400).send({
//            message: "Company is already exist!!!"
//        });
//        return;
//    }
//    next();
//}

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
    //checkCompanyExist: checkCompanyExist,
    checkDuplicateEmail: checkDuplicateEmail
};
module.exports = verifySignUp;