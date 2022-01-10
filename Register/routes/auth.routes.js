const middleware = require("../middleware/routeMiddleware");
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

    app.post("/api/post/signup", middleware.checkDuplicateEmail, companyController.companySignup, controller.signup);
    app.post("/api/post/userRegister", middleware.checkDuplicateEmail, controller.signup);

    //user
    app.post("/api/post/signin",middleware.checkUserSession, controller.signin);
    app.post("/api/post/logout",middleware.checkUserLoggedin, controller.logout);
    app.get("/api/get/getuser",middleware.checkUserLoggedin, controller.getUser);
    app.get("/api/get/userSessionList", middleware.checkUserId, middleware.checkUserLoggedin, controller.userSessionList);
    app.post("/api/post/forgotPassword",middleware.checkEmail, controller.forgotPassword);
    app.post("/api/post/resetPassword",middleware.checkNewPassword, controller.resetPassword);


    //product
    app.post("/api/post/addProduct",middleware.checkProduct,  middleware.checkCompanyhasManyUser,prodcontroller.addProduct);
    app.get("/api/get/getProduct",middleware.checkProductInCompany, middleware.checkCompanyhasManyUser,prodcontroller.getProduct);
    app.get("/api/get/getAllProduct",middleware.checkAllProduct ,middleware.checkCompanyhasManyUser, prodcontroller.getAllProduct);
    app.put("/api/put/updateProduct",middleware.checkProductInCompany, middleware.checkCompanyhasManyUser, prodcontroller.updateProduct);
    app.post("/api/post/deleteProduct",middleware.checkProductInCompany, middleware.checkCompanyhasManyUser, prodcontroller.deleteProduct);

    //inviteUser
    app.post("/api/post/inviteUser",middleware.checkInvitationToken, middleware.checkCompanyhasManyUser, inviteUserController.inviteUser);

    app.post(
        "/api/post/invitationStatus", middleware.checkInvitationExist, inviteUserController.invitationReply);

};