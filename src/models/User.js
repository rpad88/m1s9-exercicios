// M1S10 Ex 1
const { Sequelize } = require('sequelize')
const bcript = require('bcrypt')
const connection = require('../database')

// Model da tabela user
const User = connection.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

User.beforeSave(async (user) => {
    if(user.changed('password')){
        const hashedPassword = await bcript.hash(user.password, 10)
        user.password = hashedPassword
    }
})

module.exports = User