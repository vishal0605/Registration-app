const { company } = require("../models");
const db = require("../models");
const Product = db.product;
const User = db.user;
const Session = db.session;
const CompanyhasManyUser = db.companyhasManyUser


//add product
exports.addProduct = async (req, res) => {
    try {
        const companyhasManyUser = await CompanyhasManyUser.findOne({
            where: {
                companyId: req.query.companyId
            }
        })
        const product = await Product.create({
            companyId: companyhasManyUser.companyId,
            productType: req.body.productType,
            productName: req.body.productName,
            productQuantity: req.body.productQuantity,
            productPrice: req.body.productPrice
        })
        if (!req.body.productType && req.body.productName && req.body.price) {
            res.status(500).send({ message: 'Please Enter the all product field' });
        }
        else {
            res.send({ message: 'Product added successfully.' });
        }
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}


//get product detail
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                id: req.query.id
            }
        })
        if (product) {
            res.send({
                product: {
                    id: product.id,
                    companyId: product.companyId,
                    productType: product.productType,
                    productName: product.productName,
                    productQuantity: req.body.productQuantity,
                    productPrice: req.body.productPrice
                }
            })
            console.log(product);
        }
        else {
            res.send({ message: 'Invalid product id!' });
        }
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}


//update product
exports.updateProduct = async (req, res) => {
    try {
        await Product.update({
            productType: req.body.productType,
            productName: req.body.productName,
            productQuantity: req.body.productQuantity,
            productPrice: req.body.productPrice
        },
            {
                where: {
                    companyId: req.body.companyId
                }
            })
        res.send({ message: 'Product updated successfully.' });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}


//delete product
exports.deleteProduct = async (req, res) => {
    try {
        await Product.destroy({
            where: {
                id: req.query.id
            }
        })
        res.send({ message: 'Product deleted successfully.' });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}


exports.getAllProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                companyId: req.header('companyId')
            }
        })
        if (product) {
            res.send([{
                product: {
                    companyId: product.companyId,
                    productType: product.productType,
                    productName: product.productName,
                    productQuantity: product.productQuantity,
                    productPrice: product.productPrice
                }
            }])
            console.log(product);
        }
        else {
            res.send({ message: 'Product Not Found!' });
        }
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}