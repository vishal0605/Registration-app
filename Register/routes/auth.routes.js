const middleware = require("../middleware/routeMiddleware");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-control-Allow-Headers",
            "token, Origin, content-Type, Accept"
        );
        next();
    });

    app.post("/api/post/signup", middleware.email, middleware.companyController, middleware.signupController);
    app.post("/api/post/userRegister", middleware.email, middleware.signupController);

    //user
    app.post("/api/post/signin", middleware.signinController);
    app.post("/api/post/logout", middleware.userLoggedin, middleware.logoutController);
    app.get("/api/get/getuser/", middleware.userLoggedin, middleware.getUserController);
    app.get("/api/get/userSessionList", middleware.userLoggedin, middleware.userSessionController);
    app.post("/api/post/forgotPassword", middleware.forgotPasswordController);
    app.post("/api/post/resetPassword", middleware.resetPasswordController);


    //product
    app.post("/api/post/addProduct", middleware.userLoggedin, middleware.companyhasManyUser, middleware.addProdController);
    app.get("/api/get/getProduct/", middleware.userLoggedin, middleware.companyhasManyUser, middleware.getProdController);
    app.get("/api/get/getAllProduct/", middleware.userLoggedin, middleware.companyhasManyUser, middleware.getAllProductController);
    app.put("/api/put/updateProduct", middleware.userLoggedin, middleware.companyhasManyUser, middleware.updateProductController);
    app.post("/api/post/deleteProduct", middleware.userLoggedin, middleware.companyhasManyUser, middleware.deleteProductController);

    //inviteUser
    app.post("/api/post/inviteUser", middleware.userLoggedin, middleware.companyhasManyUser, middleware.invitationController);

    app.post(
        "/api/post/invitationStatus", middleware.userLoggedin, middleware.invitation, middleware.invitationReplyController);

};