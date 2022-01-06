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
    app.post("/api/post/signin", controller.signin);
    app.post("/api/post/logout", middleware.checkUserLoggedin, controller.logout);
    app.get("/api/get/getuser/", middleware.checkUserLoggedin, controller.getUser);
    app.get("/api/get/userSessionList", middleware.checkUserLoggedin, controller.userSessionList);
    app.post("/api/post/forgotPassword", controller.forgotPassword);
    app.post("/api/post/resetPassword", controller.resetPassword);


    //product
    app.post("/api/post/addProduct", middleware.checkCompanyhasManyUser,prodcontroller.addProduct);
    app.get("/api/get/getProduct/", middleware.checkCompanyhasManyUser,prodcontroller.getProduct);
    app.get("/api/get/getAllProduct/", middleware.checkCompanyhasManyUser, prodcontroller.getAllProduct);
    app.put("/api/put/updateProduct", middleware.checkCompanyhasManyUser, prodcontroller.updateProduct);
    app.post("/api/post/deleteProduct", middleware.checkCompanyhasManyUser, prodcontroller.deleteProduct);

    //inviteUser
    app.post("/api/post/inviteUser", middleware.checkCompanyhasManyUser, inviteUserController.inviteUser);

    app.post(
        "/api/post/invitationStatus", middleware.checkInvitationExist, inviteUserController.invitationReply);

};