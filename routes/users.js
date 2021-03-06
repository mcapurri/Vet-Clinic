const router = require('express').Router();
const { loginCheck } = require('../middlewares/middlewares');
const User = require('../models/User');
const Pet = require('../models/Pet');

/// @desc     Get all users
// @route     GET /users
// @access    Private
router.get('/users', loginCheck(), (req, res, next) => {
    User.find().then((users) => {
        Pet.find()
            .populate('pets')
            .then((pets) => {
                // res.render('users/index', { users, pets });
                res.status(200).json(users);
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
                    // res.render('users/index', { users, pets });
                    res.status(200).json(users);
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
    Pet.find()
        .populate('pets')
        .then((pets) => {
            User.find({ role: 'employee' })
                .then((users) => {
                    // res.render('users/index', { users });
                    res.status(200).json(users);
                })
                .catch((err) => {
                    console.log(err);
                    next(err);
                });
        });
});

// // @desc      Show add user
// // @route     GET /users/add
// // @access    Private
// router.get('/users/add', loginCheck(), (req, res) => {
//     let isEmployee = false;
//     if (req.user.role == 'employee') {
//         isEmployee = true;
//     }
//     // res.render('users/add', { isEmployee });
//     res.status(200).json(isEmployee);
// });

// // // @desc      Show edit form
// // // @route     GET /users/:id/edit
// // // @access    Private
// router.get('/users/:id/edit', loginCheck(), (req, res, next) => {
//     User.findById(req.params.id)
//         .then((user) => {
//             let isEmployee = false;
//             let userDbIsEmployee = false;
//             if (req.user.role == 'employee') {
//                 isEmployee = true;
//             }
//             if (user.role == 'employee') {
//                 userDbIsEmployee = true;
//             }
//             console.log('user to edit', user);
//             console.log('req.user', req.user);
//             // res.render('users/edit', { user, isEmployee, userDbIsEmployee });
//             res.status(200).json(user, isEmployee, userDbIsEmployee);
//         })
//         .catch((err) => {
//             console.log(err);
//             next(err);
//         });
// });

// // @desc      Get user details
// // @route     GET /users/:id
// // @access    Private
router.get('/users/:id', loginCheck(), (req, res, next) => {
    console.log('req.params', req.params.id);

    User.findById(req.params.id)
        .populate('pets')
        .then((user) => {
            console.log('userDb', user);
            let isEmployee = false;
            let userDbIsEmployee = false;
            if (req.user.role == 'employee') {
                isEmployee = true;
            }
            if (user.role == 'employee') {
                userDbIsEmployee = true;
            }
            // res.render('users/show', {
            //     user,
            //     isEmployee,
            //     userDbIsEmployee,
            // });
            res.status(200).json(user, isEmployee, userDbIsEmployee);
        })
        .catch((err) => {
            next(err);
        });
    // })
    // .catch((err) => {
    //     next(err);
    // });
});

// @desc      Show add pet
// @route     GET /users/:id/pet
// @access    Private
router.get('/users/:id/pet', (req, res, next) => {
    User.find({ _id: req.params.id })
        .populate('owner')
        .then((owner) => {
            console.log('owner Addpet', owner);
            // res.render('pets/addByClient', { owner: owner[0] });
            res.status(200).json({ owner: owner[0] });
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
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

        console.log(
            'from users/add',
            name,
            lastName,
            street,
            city,
            zip,
            email,
            phoneNumber,
            position,
            role
        );

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
                res.status(201).json(user).redirect('/users');
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
        if (req.user.role !== 'employee') {
            query.owner = req.user._id;
        }

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
        } = req.body;

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

// @desc      Add pet to user
// @route     POST /users/:id/pet
// @access    Private
router.post('/users/:id/pet', (req, res) => {
    const { name, specie, breed, age } = req.body;
    console.log('req.user.id', req.user.id);
    Pet.create({
        name,
        specie,
        breed,
        age,

        owner: req.user._id,
    })
        .then((pet) => {
            User.findByIdAndUpdate(req.user.id, {
                $push: { pets: pet._id },
            }).then(() => {
                res.redirect(`/users/${req.params.id}`);
            });
        })
        .catch((err) => {
            next(err);
        });
    // User.findOneAndUpdate(
    //     { _id: req.params.id },
    //     {
    //         $push: { pets: { name, specie, age, diagnosis, treatment, owner } },
    //     }
    // )
    //     .then(() => {
    //         res.redirect(`/users/${_id}`);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
});
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
