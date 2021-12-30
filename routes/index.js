const express = require('express');

const personRouters = require('./person');
const authRouters = require('./auth');
const orderRouters = require('./order');
const menuRouters = require('./menu');

const router = express.Router();

router.use('/person', personRouters);

router.use('/auth', authRouters);

router.use('/order', orderRouters);

router.use('/menuItem', menuRouters);

module.exports = router;
