const { Sequelize } = require("sequelize");

const connection = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: process.env.POSTGRES_PASSWORD,
    database: 'm1s9',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    },
})

module.exports = connection