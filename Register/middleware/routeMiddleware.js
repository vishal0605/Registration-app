const verifySignUp = require("./verifySignUp");
const verifySignin = require("./verifySignin");
const invitation = require("./invitation");
const verifyCompanyhasManyUser = require("./verifyCompanyhasManyUser");

module.exports = {
    checkDuplicateEmail: [
        verifySignUp.checkDuplicateEmail,
    ],
    checkUserLoggedin: [
        verifySignin.checkUserLoggedin
    ],
    checkCompanyhasManyUser : [
        verifySignin.checkUserLoggedin,
        verifyCompanyhasManyUser.checkCompanyandUser
    ],
    checkInvitationExist : [
        verifySignin.checkUserLoggedin,
        invitation.checkInvitationExist
    ]
}