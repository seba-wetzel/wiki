const express = require('express');
const router = express.Router();
const routerPages = require('./page')
const routerUser = require('./user')
const landingRoute = require('./landingRoute')

router.use("/wiki", routerPages);
router.use('/user/', routerUser)
router.use("/", landingRoute)


module.exports = router;

