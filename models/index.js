const db = require('./db')
const User = require("./user")
const Page = require('./page')

Page.belongsTo(User, { as: 'author' })

module.exports = { User, Page, db }
