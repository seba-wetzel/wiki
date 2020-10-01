const { Model, DataTypes } = require('sequelize')
const db = require('./db')

class User extends Model { }

User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, { sequelize: db, modelName: 'user' })

module.exports = User;