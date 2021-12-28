module.exports = (sequelize, Sequelize) => {
    const company = sequelize.define("company", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        companyName: {
            type: Sequelize.STRING
        }
    });
 
    return company;
}



