const verifySignUp = require("../middleware/verifySignUp");
const verifySignin = require("../middleware/verifySignin");
const invitation = require("../middleware/invitation");
const verifyCompany = require("../middleware/verifyCompany");
const controller = require("../controller/user.controller");
const prodcontroller = require("../controller/product.controller");
const inviteUserController = require("../controller/inviteUser.controller");
const companyController = require("../controller/company.controller");


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-control-Allow-Headers",
            "token, Origin, content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateEmail
        ],
        companyController.companySignup,
        controller.signup,
    );
    app.post(
        "/api/auth/userSignup",
        [
            verifySignUp.checkDuplicateEmail
        ],
        controller.signup,
    );

    //user
    app.post("/api/auth/signin", controller.signin);
    app.post("/api/auth/logout", controller.logout);
    app.get("/api/auth/getuser/", controller.getUser);
    app.get("/api/auth/userSessionList", controller.userSessionList);
    app.post("/api/auth/forgotPassword", controller.forgotPassword);
    app.post("/api/auth/resetPassword", controller.resetPassword);


    //product
    app.post("/api/post/addProduct",
        [
            verifyCompany.checkCompanyExist
        ],
        prodcontroller.addProduct
    );
    app.get("/api/get/getProduct/",
        prodcontroller.getProduct
    ); app.get("/api/get/getAllProduct/",
        prodcontroller.getAllProduct
    );
    app.put("/api/put/updateProduct",
        [
            verifyCompany.checkCompanyExist
        ],
        prodcontroller.updateProduct);
    app.post("/api/post/deleteProduct",
        [
            verifyCompany.checkCompanyExist
        ],
        prodcontroller.deleteProduct);

    //inviteUser
    app.post("/api/auth/inviteUser",
        [
            verifyCompany.checkCompanyExist
        ],
        inviteUserController.inviteUser);

    app.post(
        "/api/auth/invitationStatus", 
        [
            invitation.checkInvitationExist,
            verifyCompany.checkCompanyExist
        ],
        inviteUserController.invitationReply);

};