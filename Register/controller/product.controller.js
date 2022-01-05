const db = require("../models");
const Product = db.product;
const CompanyhasManyUser = db.companyhasManyUser


//add product
exports.addProduct = async (req, res) => {
    try {
        if (!req.body.productType && req.body.productName && req.body.price) {
            res.status(404).send({ message: 'body can not be blank!!' });
        }
        else {
            const companyhasManyUser = await CompanyhasManyUser.findOne({
                where: {
                    companyId: req.header('companyId')
                }
            })
            if (companyhasManyUser) {
                const product = await Product.create({
                    companyId: companyhasManyUser.companyId,
                    productType: req.body.productType,
                    productName: req.body.productName,
                    productQuantity: req.body.productQuantity,
                    productPrice: req.body.productPrice
                })
                res.send({ message: 'Product added successfully.' });
            }
        }
    }
    catch (err) {
        res.status(404).send({ message: err.message });
    }
}


//get product detail
exports.getProduct = async (req, res) => {
    try {
        if (!req.header('id') && req.header('companyId') && req.headers.authorization) {
            res.status(404).send({
                message: 'required id, companyId and token in header!!!'
            })
        }
        else {
            const product = await Product.findOne({
                where: {
                    companyId: req.header('companyId'),
                    id: req.header('id')
                }
            })
            if (product) {
                res.send({
                    product: {
                        id: product.id,
                        companyId: product.companyId,
                        productType: product.productType,
                        productName: product.productName,
                        productQuantity: product.productQuantity,
                        productPrice: product.productPrice
                    }
                })
                console.log(product);
            }
            else {
                res.send({ message: 'Invalid product id!' });
            }
        }
    }
    catch (err) {
        res.status(404).send({ message: err.message });
    }
}


//update product
exports.updateProduct = async (req, res) => {
    try {
        if (!req.header('companyId') && req.header('id') && req.body.productType && req.body.productName && req.body.price) {
            res.status(404).send({
                message: 'required id, companyId, token in header and also required body!!!'
            })
        }
        else {
            const prod = await Product.findOne({
                where: {
                    companyId: req.header('companyId'),
                    id: req.header('id')
                }
            })
            if (prod) {
                await Product.update({
                    productType: req.body.productType,
                    productName: req.body.productName,
                    productQuantity: req.body.productQuantity,
                    productPrice: req.body.productPrice
                },
                    {
                        where: {
                            id: req.header('id')
                        }
                    })
                res.send({ message: 'Product updated successfully.' });
            }
            else {
                res.send({ message: 'Invalid product id!' });
            }
        }
    }
    catch (err) {
        res.status(404).send({ message: err.message });
    }
}


//delete product
exports.deleteProduct = async (req, res) => {
    try {
        if (!req.header('companyId') && req.header('id') && req.headers.authorization) {
            res.status(404).send({
                message: 'companyId, id and token are required!!!'
            })
        }
        else {
            const prod = await Product.findOne({
                where: {
                    companyId: req.header('companyId'),
                    id: req.header('id')
                }
            })
            if (prod) {
                await Product.destroy({
                    where: {
                        id: req.header('id')
                    }
                })
                res.send({ message: 'Product deleted successfully.' });
            }
            else {
                res.send({ message: 'Invalid product id!' });
            }
        }
    }
    catch (err) {
        res.status(404).send({ message: err.message });
    }
}


exports.getAllProduct = async (req, res) => {
    try {
        if (!req.header('companyId') && req.headers.authorization) {
            res.status(404).send({
                message: 'companyId and token are required!!!'
            })
        }
        else {
            const product = await Product.findAll({
                limit: Product.companyId,
                where: {
                    companyId: req.header('companyId')
                }
            })
            if (product) {
                res.send({ product });
                console.log(product);
            }
            else {
                res.send({ message: 'Product Not Found!' });
            }
        }
    }
    catch (err) {
        res.status(404).send({ message: err.message });
    }
}