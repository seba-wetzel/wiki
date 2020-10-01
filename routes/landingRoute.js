const express = require('express');
const router = require('.');
const landingRoute = express.Router();
const { Page } = require('../models')

landingRoute.get("/", (req, res, next) => {
    Page.findAll().then((results) => {
        res.render('index', { pages: results })
    })
        .catch((err) => ext(err))

})


module.exports = landingRoute;


