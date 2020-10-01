const { Model, DataTypes, Op } = require('sequelize')
const db = require('./db')

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
    },
    tags: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        //page.tags = 'programming,coding,javascript'
        set: function (value) {
            let arrayOfTags;
            if (typeof value === 'string') {
                arrayOfTags = value.split(',').map(function (s) {
                    return s.trim();
                });
                this.setDataValue('tags', arrayOfTags);
            } else {
                this.setDataValue('tags', value);
            }
        }
    }
}, { sequelize: db, modelName: 'page' })


//Metodos de clase
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

Page.findByTag = function (tag) {
    return Page.findAll({
        where: {
            tags: {
                [Op.overlap]: [tag]
            }
        }
    })
};



//Metod de instancia
Page.prototype.route = function () {
    return `/wiki/${this.urlTitle}`
}

Page.prototype.findSimilar = function () {
    return Page.findAll({
        where: {
            tags: {
                [Op.overlap]: [this.tags]
            },
            id: {
                [Op.ne]: [this.id]
            }
        }
    });
}


module.exports = Page;