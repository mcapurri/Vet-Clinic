const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.json('Happy coding!');
});

// const auth = require('./auth');
// router.use('/auth', auth);

// const pets = require('./pets');
// router.use('/pets', pets);

// const users = require('./users');
// router.use('/users', users);

// const messages = require('./messages');
// router.use('/messages', messages);

module.exports = router;
