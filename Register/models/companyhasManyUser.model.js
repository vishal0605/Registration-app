module.exports = (sequelize, Sequelize) => {
    const companyhasManyUser = sequelize.define("companyhasManyUser", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        companyId: {
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.INTEGER
        },
        role: {
            type: Sequelize.ENUM,
            values: ['Admin', 'User'],
            defaultValue: 'Admin'
        },
        Owner: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    });
    return companyhasManyUser;
};
