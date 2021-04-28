const router = require('express').Router();
const { loginCheck } = require('../middlewares/loginCheck');
const User = require('../models/User');
const Pet = require('../models/Pet');

/// @desc     Get all users
// @route     GET /users
// @access    Private
router.get('/users', async (req, res, next) => {
    const users = await User.find().populate('pets');
    console.log('users', users);
    res.status(200).json(users);
});

/// @desc     Get all pet owners
// @route     GET /users/owners
// @access    Private
router.get('/users/owners', (req, res, next) => {
    User.find()
        .then((users) => {
            const owners = users.filter((user) => {
                return user.role === 'client' || user.pets.lenght > 0;
            });
            const options = owners.map((user) => {
                return {
                    value: user._id,
                    displayValue: `${user.lastName}, ${user.name}`,
                };
            });
            // .sort((a, b) => a.displayValue.lastName.localeCompare(b.displayValue.lastName));

            res.status(200).json(options);
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
});

// // @desc      Get user details
// // @route     GET /users/:id
// // @access    Private
router.get('/users/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then((user) => {
            Pet.find({ owner: user._id })
                .populate('pets')
                .then((pets) => {
                    console.log('userDb', user);

                    res.status(200).json({ user, pets });
                })
                .catch((err) => {
                    next(err);
                });
        })
        .catch((err) => {
            next(err);
        });
});

// @desc      Add user
// @route     POST /users/add
// @access    Private
router.post(
    '/users/add',

    (req, res, next) => {
        const {
            firstName,
            lastName,
            street,
            city,
            zipCode,
            email,
            phoneNumber,
            // position,
            role,
        } = req.body;

        console.log(
            'from users/add',
            firstName,
            lastName,
            street,
            city,
            zipCode,
            email,
            phoneNumber,
            // position,
            role
        );

        User.create({
            name: firstName,
            lastName,
            address: {
                street,
                zipCode,
                city,
            },
            email,
            phoneNumber,
            // position,
            role,
        })
            .then((user) => {
                console.log('user added', user);
                res.status(201).json(user);
            })
            .catch((err) => {
                next(err);
            });
    }
);

// @desc      Edit user
// @route     PUT /users/:id/edit
// @access    Private
router.put(
    '/users/:id',

    (req, res, next) => {
        const {
            firstName,
            lastName,
            street,
            city,
            zipCode,
            email,
            phoneNumber,
            // position,
        } = req.body;

        console.log(
            'datas to be put',
            firstName,
            lastName,
            street,
            city,
            zipCode,
            email,
            phoneNumber
            // position
        );

        User.findByIdAndUpdate(req.params.id, {
            name: firstName,
            lastName,
            address: {
                street,
                zipCode,
                city,
            },
            email,
            phoneNumber,
            // position,
        })
            .then((user) => {
                console.log('user was updated', user);
                res.status(200).json({
                    message: `User ${user.lastName}, ${user.name} was successfully updated`,
                });
            })
            .catch((err) => {
                next(err);
            });
    }
);

// @desc      Add pet to user
// @route     POST /users/:id/pet
// @access    Private
router.post('/users/:id/pet', (req, res, next) => {
    const { name, specie, breed, age, owner } = req.body;
    console.log('req.user.id', req.user.id);
    console.log('req.params.id', req.params.id);
    Pet.create({
        name,
        specie,
        breed,
        age,
        owner,
    })
        .then((pet) => {
            User.findByIdAndUpdate(owner, {
                $push: { pets: pet._id },
            }).then((user) => {
                console.log('user was updated', user);
                res.status(200).json({
                    message: 'Pet added. User was updated',
                });
            });
        })
        .catch((err) => {
            next(err);
        });
});

// @desc      Delete user
// @route     DELETE /users/:id/delete
// @access    Private
router.delete('/users/:id', (req, res) => {
    console.log('req.params', req.params);

    // if user is not admin they have to be the owner
    // if (req.user.role !== 'employee') {
    //     query.owner = req.user._id;
    // }
    User.findByIdAndDelete(req.params.id)
        .then((user) => {
            user.pets.map((pet) => {
                return Pet.findByIdAndDelete(pet._id).then((pet) =>
                    res.status(200).json({
                        message: `Pet ${pet.name}  was successfully removed`,
                    })
                );
            });
            console.log(`User was removed`, user);
            res.status(200).json({
                message: `User ${user.name}  ${user.lastName}  was successfully removed`,
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;
