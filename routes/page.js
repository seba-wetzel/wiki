const express = require('express');
const router = require('.');
const routerPage = express.Router();
const { Page } = require('../models')


routerPage.get('/add', function (req, res, next) {
    res.render('addpage');
});

routerPage.get('/:urlTitle', function (req, res, next) {
    console.log(req.params.urlTitle)
    Page.findOne({
        where: {
            urlTitle: req.params.urlTitle
        }
    })
        .then((page) => {
            res.render("wikipage", { page })
        })
        .catch(next);
});


routerPage.post('/', function (req, res, next) {
    console.log(req.body)
    const { title, content } = req.body
    Page.create({
        title,
        content
    }).then((page) => {
        console.log(page)
        res.render("wikipage", { page })
    })
        .catch(err => console.log(err))

});



module.exports = routerPage;