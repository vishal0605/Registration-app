const db = require("../models");
const Company = db.company;

checkCompanyExist = async (req, res, next) => {
    try {
        const company = await Company.findOne({
            where: {
                companyName: req.query.companyName
            }
        })
        if (!company) {
            res.status(400).send({ message: 'Company Not Found!' });
            return;
        }
        next();
    }
    catch (err) {
        res.send({ message: err.message });
    }
}

const verifyCompany = {
    checkCompanyExist: checkCompanyExist
};


module.exports = verifyCompany;