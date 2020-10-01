const express = require('express');
const router = require('.');
const routerPage = express.Router();
const { Page } = require('../models')



routerPage.get('/add', function (req, res, next) {
    res.render('addpage');
});

routerPage.get('/:urlTitle', function (req, res, next) {
    Page.findOne({
        where: {
            urlTitle: req.params.urlTitle
        }
    })
        .then((page) => {
            if (!page) return res.sendStatus(404)
            res.render("wikipage", { page })
        })
        .catch((err) => next(err));
});



routerPage.get('/:urlTitle/similar', function (req, res, next) {
    Page.findOne({
        where: {
            urlTitle: req.params.urlTitle
        }
    })
        .then((page) => {
            if (!page) return res.sendStatus(404)
            page.findSimilar()
                .then(
                    (results) => {
                        if (results.length < 1) return res.sendStatus(404)
                        res.render("wikipage", { results })
                    }
                )
                .catch(err => res.sendStatus(404))
        })
        .catch((err) => next(err));
});


routerPage.get("/search/:tag", (req, res, next) => {
    const tag = req.params.tag
    Page.findByTag(tag)
        .then(results => {
            if (results.length < 1) return res.sendStatus(404)
            res.render("wikipage", { results })
        })
        .catch(err => res.sendStatus(404))
})

routerPage.get('/', (req, res) => res.sendStatus(200))

routerPage.post('/', function (req, res, next) {

    const { title, content } = req.body
    Page.create({
        title,
        content
    }).then((page) => {
        //res.render("wikipage", { page })
        res.redirect('/')
    })
        .catch(err => next(err))

});



module.exports = routerPage;