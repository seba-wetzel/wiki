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


class Page extends Model { }

Page.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    urlTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('open', 'closed')
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, { sequelize: db, modelName: 'page' })

Page.addHook('beforeValidate', (page, options) => {
    page.urlTitle = function (title) {
        if (title) {
            // Remueve todos los caracteres no-alfanuméricos 
            // y hace a los espacios guiones bajos. 
            return title.replace(/\s+/g, '_').replace(/\W/g, '');
        } else {
            // Generá de forma aleatoria un string de 5 caracteres
            return Math.random().toString(36).substring(2, 7);
        }
    }(page.title);
})
Page.prototype.route = function () {
    return `/wiki/${this.urlTitle}`
}

module.exports = { User, Page, db }
