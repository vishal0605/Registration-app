module.exports = (sequelize, Sequelize) => {
    const Invitation = sequelize.define("invitations", {
        companyId: {
            type: Sequelize.INTEGER,
        },
        email: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.ENUM,
            values: ['Admin','User'],
            defaultValue: 'Admin'
        },
        invitationToken: {
            type: Sequelize.STRING,
        },
        expireAt: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM,
            values: ['pending','accepted','rejected', 'expire'],
            defaultValue: 'pending'
        }
    });

    return Invitation;
};
