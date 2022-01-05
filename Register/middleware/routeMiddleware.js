const verifySignUp = require("./verifySignUp");
const verifySignin = require("./verifySignin");
const invitation = require("./invitation");
const verifyCompanyhasManyUser = require("./verifyCompanyhasManyUser");
const controller = require("../controller/user.controller");
const prodcontroller = require("../controller/product.controller");
const inviteUserController = require("../controller/inviteUser.controller");
const companyController = require("../controller/company.controller");
module.exports = {
    email: [
        verifySignUp.checkDuplicateEmail,
    ],
    userLoggedin: [
        verifySignin.checkUserLoggedin
    ],
    companyhasManyUser : [
        verifyCompanyhasManyUser.checkCompanyandUser
    ],
    invitation : [
        invitation.checkInvitationExist
    ],
    //user
    signupController: controller.signup,
    logoutController: controller.logout,
    signinController: controller.signin,
    getUserController: controller.getUser,
    userSessionController: controller.userSessionList,
    forgotPasswordController:controller.forgotPassword,
    resetPasswordController: controller.resetPassword,
    companyController: companyController.companySignup,
    
    //product
    addProdController : prodcontroller.addProduct,
    getProdController : prodcontroller.getProduct,
    getAllProductController: prodcontroller.getAllProduct,
    updateProductController: prodcontroller.updateProduct,
    deleteProductController: prodcontroller.deleteProduct,

    //invitation
    invitationController: inviteUserController.inviteUser,
    invitationReplyController: inviteUserController.invitationReply
}