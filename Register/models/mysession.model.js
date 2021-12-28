module.exports = (sequelize, Sequelize) => {
    const Session = sequelize.define("session", {
        userId: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.ENUM,
            values: ['active', 'Expierd'],
            defaultValue: 'active'
        },
        token: {
            type: Sequelize.STRING
        },
    });
    return Session;
};

