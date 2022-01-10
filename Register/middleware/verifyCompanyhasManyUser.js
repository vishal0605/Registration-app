const db = require("../models");
const CompanyhasManyUser = db.companyhasManyUser;


checkCompanyandUser = async (req, res, next) => {
    try {
        console.log(next.auth.user);
        const companyhasManyuser = await CompanyhasManyUser.findOne({
            where: {
                userId: next.auth.user.userId,
                companyId: req.header('companyId')
            }
        })
        next.auth = {
            isValid: false,
            session: {},
            user: {},
            companyHasUsers: [companyhasManyuser],
        }
        if (!companyhasManyuser) {
            res.status(400).send({
                message: "Invalid Data!!!"
            });

            return;
        }

        next();
    }
    catch (err) {
        res.send({ message: err.message });
    }

}
const verifyCompanyhasManyUser = {
    checkCompanyandUser: checkCompanyandUser
};


module.exports = verifyCompanyhasManyUser;