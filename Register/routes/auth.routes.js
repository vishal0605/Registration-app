const verifySignUp = require("../middleware/verifySignUp");
const verifySignin = require("../middleware/verifySignin");
const invitation = require("../middleware/invitation");
const verifyCompanyhasManyUser = require("../middleware/verifyCompanyhasManyUser");
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
        "/api/post/signup",
        [
            verifySignUp.checkDuplicateEmail
        ],
        companyController.companySignup,
        controller.signup,
    );
    app.post(
        "/api/post/userRegister",
        [
            verifySignUp.checkDuplicateEmail
        ],
        controller.signup,
    );

    //user
    app.post("/api/post/signin", controller.signin);
    app.post("/api/post/logout", controller.logout);
    app.get("/api/get/getuser/", controller.getUser);
    app.get("/api/get/userSessionList", controller.userSessionList);
    app.post("/api/post/forgotPassword", controller.forgotPassword);
    app.post("/api/post/resetPassword", controller.resetPassword);


    //product
    app.post("/api/post/addProduct",
        [
            verifySignin.checkUserLoggedin
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
            verifySignin.checkUserLoggedin
        ],
        prodcontroller.updateProduct);
    app.post("/api/post/deleteProduct",
        [
            verifySignin.checkUserLoggedin
        ],
        prodcontroller.deleteProduct);

    //inviteUser
    app.post("/api/post/inviteUser",
        [  
            verifySignin.checkUserLoggedin,
            verifyCompanyhasManyUser.checkCompanyandUser
            
        ],
        inviteUserController.inviteUser);

    app.post(
        "/api/post/invitationStatus", 
        [
            invitation.checkInvitationExist,
            verifySignin.checkUserLoggedin
        ],
        inviteUserController.invitationReply);

};