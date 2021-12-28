const db = require("../models");
const Product = db.product;
const Session = db.session;


//add product
exports.addProduct = async (req, res) => {
    try {
        await Product.create({
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
        res.send({ message: err.message });
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
        const session = await Session.findOne(
            {
                where: {
                    token: req.headers.authorization
                }
            }
        )
        if (product) {
            res.send({
                product: {
                    id: product.id,
                    userId: session.userId,
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
                    id: req.body.id
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