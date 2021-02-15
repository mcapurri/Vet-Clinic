const router = require('express').Router();
const { loginCheck } = require('../middlewares/middlewares');
const User = require('../models/User');
const Pet = require('../models/Pet');

/// @desc     Get all users
// @route     GET /users
// @access    Private
router.get('/users', loginCheck, (req, res, next) => {
    Pet.find()
        .populate('pets')
        .then((pets) => {
            User.find()
                .then((users) => {
                    console.log('users', users);
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
router.get('/users/clients', loginCheck, (req, res, next) => {
    Pet.find()
        .populate('pets')
        .then((pets) => {
            User.find({ role: 'client' })
                .then((users) => {
                    console.log('users', users);
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
router.get('/users/employees', loginCheck, (req, res, next) => {
    User.find({ role: 'employee' })
        .then((users) => {
            console.log('users', users);
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
router.get('/users/add', (req, res) => {
    res.render('users/add');
});

// @desc      Add client
// @route     POST /user/add
// @access    Private
router.post(
    '/users/add',
    loginCheck,

    (req, res, next) => {
        const {
            name,
            lastName,
            street,
            city,
            zip,
            email,
            phoneNumber,
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

// @desc      Get user details
// @route     GET /users/:id
// @access    Private
router.get('/users/:id', loginCheck, (req, res, next) => {
    console.log('req.params', req.params.id);
    Pet.find()
        .populate('pets')
        .then((pets) => {
            User.findById(req.params.id)
                .then((user) => {
                    res.render(`users/${user.role}/show`, { user, pets });

                    // if (user.role == 'client') {
                    //     res.render('users/clients/show', { user, pets });
                    // } else {
                    //     res.render('users/employees/show', { user });
                    // }
                })
                .catch((err) => {
                    next(err);
                });
        });
});

// @desc      Delete user
// @route     POST /users/:id/delete
// @access    Private
router.post('/users/:id/delete', (req, res) => {
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
