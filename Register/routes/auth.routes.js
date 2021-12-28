const verifySignUp = require("../middleware/verifySignUp");
const verifySignin = require("../middleware/verifySignin");
const controller = require("../controller/user.controller");
const prodcontroller = require("../controller/product.controller");

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
    app.post("/api/auth/addProduct",
    [
        verifySignin.checkUserLoggedin
    ],
    prodcontroller.addProduct
    );
    app.get("/api/auth/getProduct/",
    [
        verifySignin.checkUserLoggedin
    ],
    prodcontroller.getProduct
    );
    app.put("/api/auth/updateProduct",
    [
        verifySignin.checkUserLoggedin
    ],
    prodcontroller.updateProduct);
    app.post("/api/auth/deleteProduct",
    [
        verifySignin.checkUserLoggedin
    ],
    prodcontroller.deleteProduct);
};