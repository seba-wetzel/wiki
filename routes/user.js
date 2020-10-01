const express = require('express');
const routerUsers = express.Router();
const { User } = require('../models')


routerUsers.get('/', (req, res, next) => {
    User.findAll()
        .then(results => res.json(results))
        .catch(err => next(err))

})


routerUsers.get('/:id', (req, res, next) => {
    const id = req.params.id
    User.findByPk(id)
        .then(user => res.json(user))
        .catch(err => next(err))

})


routerUsers.post('/', (req, res) => {

})


routerUsers.put('/:id', (req, res) => {

})


routerUsers.delete('/:id', (req, res) => {

})




module.exports = routerUsers;