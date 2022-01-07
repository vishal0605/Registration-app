const db = require("../models");
const User = db.user;
const CompanyhasManyUser = db.companyhasManyUser;


checkCompanyandUser = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            res.status(404).send({
                message: 'token not found in header!!!'
            })
        }
        else {
            const session = next.session;
            const user = await User.findOne({
                where: {
                    userId: session.userId
                }
            })
            const companyhasManyuser = await CompanyhasManyUser.findOne({
                where: {
                    userId: user.userId,
                    companyId: req.header('companyId')
                }
            })
            if (!companyhasManyuser) {
                res.status(400).send({
                    message: "Invalid Data!!!"
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
const verifyCompanyhasManyUser = {
    checkCompanyandUser: checkCompanyandUser
};


module.exports = verifyCompanyhasManyUser;