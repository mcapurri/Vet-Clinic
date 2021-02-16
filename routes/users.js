const router = require('express').Router();
const { loginCheck } = require('../middlewares/middlewares');
const User = require('../models/User');
const Pet = require('../models/Pet');

/// @desc     Get all users
// @route     GET /users
// @access    Private
router.get('/users', loginCheck(), (req, res, next) => {
    Pet.find()
        .populate('pets')
        .then((pets) => {
            User.find()
                .then((users) => {
                    res.render('users/index', { users, pets });
                })
                .catch((err) => {
                    console.log(err);
                    next(err);
                });
        });
});

/// @desc     Get all clients
// @route     GET /users/clients
// @access    Private
router.get('/users/clients', loginCheck(), (req, res, next) => {
    Pet.find()
        .populate('pets')
        .then((pets) => {
            User.find({ role: 'client' })
                .then((users) => {
                    res.render('users/index', { users, pets });
                })
                .catch((err) => {
                    console.log(err);
                    next(err);
                });
        });
});

// @desc      Get all employees
// @route     GET /users/employees
// @access    Private
router.get('/users/employees', loginCheck(), (req, res, next) => {
    User.find({ role: 'employee' })
        .then((users) => {
            res.render('users/index', { users });
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
});

// @desc      Show add user
// @route     GET /users/add
// @access    Private
router.get('/users/add', loginCheck(), (req, res) => {
    res.render('users/add');
});

// @desc      Show edit form
// @route     GET /users/:id/edit
// @access    Private
router.get('/users/:id/edit', loginCheck(), (req, res, next) => {
    User.findById(req.params.id)
        .then((user) => {
            console.log('user to edit', user);
            console.log('req.user', req.user);
            console.log('req.session', req.session);
            res.render('users/edit', { user });
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
});

// @desc      Get user details
// @route     GET /users/:id
// @access    Private
router.get('/users/:id', loginCheck(), (req, res, next) => {
    console.log('req.params', req.params.id);

    User.findById(req.params.id)
        .then((user) => {
            res.render('users/show', { user });
        })
        .catch((err) => {
            next(err);
        });
    // });
});

// @desc      Add user
// @route     POST /users/add
// @access    Private
router.post(
    '/users/add',
    loginCheck(),

    (req, res, next) => {
        const {
            name,
            lastName,
            street,
            city,
            zip,
            email,
            phoneNumber,
            position,
            role,
        } = req.body;

        User.create({
            name,
            lastName,
            address: {
                street,
                zip,
                city,
            },
            email,
            phoneNumber,
            position,
            role,
        })
            .then((user) => {
                console.log('user added', user);
                res.redirect('/users');
            })
            .catch((err) => {
                next(err);
            });
    }
);

// @desc      Edit user
// @route     POST /users/:id/edit
// @access    Private
router.post(
    '/users/:id/edit',
    loginCheck(),

    (req, res, next) => {
        // const query = { _id: req.params.id };

        // if user is not admin they have to be the owner
        // if (req.user.role !== 'employee') {
        //     query. = req.user._id;
        // }
        const {
            name,
            lastName,
            street,
            city,
            zip,
            state,
            email,
            phoneNumber,
            position,
        } = req.params;

        User.findByIdAndUpdate(req.params.id, {
            name,
            lastName,
            address: {
                street,
                zip,
                city,
                state,
            },
            email,
            phoneNumber,
            position,
        })
            .then((user) => {
                console.log('user was updated', user);
                res.redirect('/users');
            })
            .catch((err) => {
                next(err);
            });
    }
);

// @desc      Delete user
// @route     POST /users/:id/delete
// @access    Private
router.post('/users/:id/delete', loginCheck(), (req, res) => {
    console.log('req.params', req.params);
    const query = { _id: req.params.id };

    // if user is not admin they have to be the owner
    if (req.user.role !== 'employee') {
        query.owner = req.user._id;
    }
    console.log('query', query);
    User.findByIdAndDelete(query)
        .then((user) => {
            console.log('This user was removed', user);
            res.redirect('/users');
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;
