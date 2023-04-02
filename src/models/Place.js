const { Sequelize } = require("sequelize");
const connection = require("../database");

// Modelo da tabela Places no banco
const Place = connection.define('places', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING
    },
    opening_hours: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    latitude: {
        type: Sequelize.DECIMAL
    },
    longitude: {
        type: Sequelize.DECIMAL
    },
})

module.exports = Place