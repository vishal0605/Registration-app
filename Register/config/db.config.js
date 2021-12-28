module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "root",
    DB: "newdb",
    dialect: "postgres",
    pool: {
        max: 10,
        min: 0,
        acquire: 300000,
        idle: 100000
    }
};