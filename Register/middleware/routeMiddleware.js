const verifySignUp = require("./verifySignUp");
const verifySignin = require("./verifySignin");
const invitation = require("./invitation");
const verifyCompanyhasManyUser = require("./verifyCompanyhasManyUser");
const validator = require("./validator");

module.exports = {
    checkDuplicateEmail: [
        validator.validateUser,
        verifySignUp.checkDuplicateEmail
    ],
    checkUserLoggedin: [
        validator.tokenValidate,
        verifySignin.checkUserLoggedin
    ],
    checkUserSession: [
        validator.validateUserSignin
    ],
    checkCompanyhasManyUser : [
        verifySignin.checkUserLoggedin,
        verifyCompanyhasManyUser.checkCompanyandUser
    ],
    checkInvitationExist : [
        validator.tokenValidate,
        validator.validateEmail,
        verifySignin.checkUserLoggedin,
        invitation.checkInvitationExist
    ],
    checkUserId : [
        validator.validateUserId
    ],
    checkEmail : [
        validator.validateEmail
    ],
    checkNewPassword : [
        validator.tokenValidate,
        validator.validateNewPassword
    ],
    checkProduct : [
        validator.tokenValidate,
        validator.validateProduct
    ],
    checkProductInCompany : [
        validator.tokenValidate,
        validator.validateProductIdWithCompanyId
    ],
    checkAllProduct : [
        validator.tokenValidate,
        validator.validateCompanyId
    ],
    checkInvitationToken : [
        validator.tokenValidate,
        validator.validateCompanyId,
        validator.validateEmail
    ]
}