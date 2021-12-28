module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        userId: {
            type: Sequelize.INTEGER
        },
        productType: {
            type: Sequelize.STRING
        },
        productName: {
            type: Sequelize.STRING
        },
        productQuantity: {
            type: Sequelize.INTEGER
        },
        productPrice: {
            type: Sequelize.INTEGER
        }
    });
    return Product;
}



