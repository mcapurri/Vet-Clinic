const router = require('express').Router();

const auth = require('./auth');
router.use('/auth', auth);

const pets = require('./pets');
router.use('/pets', pets);

const users = require('./users');
router.use('/users', users);

const requests = require('./requests');
router.use('/requests', requests);

module.exports = router;
