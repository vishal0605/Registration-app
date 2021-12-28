const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    }
}
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.company = require("../models/company.model.js")(sequelize, Sequelize);
db.session = require("../models/mysession.model.js")(sequelize, Sequelize);
db.companyhasManyUser = require("../models/companyhasManyUser.model.js")(sequelize, Sequelize);
db.product = require("../models/product.model.js")(sequelize, Sequelize);

//company and user relation
db.company.hasMany(db.user, {as : 'company', foreignKey : 'id'});
db.user.belongsTo(db.company, {foreignKey : 'id'});



module.exports = db;