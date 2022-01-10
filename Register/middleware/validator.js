const { header, check, validationResult } = require('express-validator');

exports.validateUser = [
    check('companyName')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('companyName can not be empty!')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Minimum 3 characters required!')
        .bail(),
    check('firstName')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('FirstName can not be empty!')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Minimum 3 characters required!')
        .bail(),
    check('email')
        .isEmail()
        .trim()
        .normalizeEmail()
        .not()
        .isEmpty()
        .withMessage('Invalid email address!')
        .bail(),
    check('password')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('password can not be empty!')
        .bail()
        .isLength({ min: 8 })
        .withMessage('Minimum 8 characters required!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];
exports.validateUserSignin = [
    check('email')
        .isEmail()
        .trim()
        .normalizeEmail()
        .not()
        .isEmpty()
        .withMessage('Invalid email address!')
        .bail(),
    check('password')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('password can not be empty!')
        .bail()
        .isLength({ min: 8 })
        .withMessage('Minimum 8 characters required!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];

exports.tokenValidate = [
    header('Authorization')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Token is not found!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];

exports.validateUserId = [
    header('userId')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('UserId is not found!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];

exports.validateCompanyId = [
    header('companyId')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('companyId is not found!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];

exports.validateEmail = [
    check('email')
        .isEmail()
        .trim()
        .normalizeEmail()
        .not()
        .isEmpty()
        .withMessage('Invalid email address!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];

exports.validateNewPassword = [
    check('newPassword')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('newPassword can not be empty!')
        .bail()
        .isLength({ min: 8 })
        .withMessage('Minimum 8 characters required!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];

exports.validateProduct = [
    check('productName')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('productName can not be empty!')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Minimum 3 characters required!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];

exports.validateProductIdWithCompanyId = [
    header('id')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('productId is not found!')
        .bail(),
    header('companyId')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('companyId is not found!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];

