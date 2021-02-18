const router = require('express').Router();
const { loginCheck } = require('../middlewares/middlewares');
const User = require('../models/User');
const Pet = require('../models/Pet');

// @desc      Get all pets
// @route     GET /pets
// @access    Private
router.get('/pets', (req, res, next) => {
    User.find()
        .then((owners) => {
            Pet.find()
                .populate('owner')
                .then((pets) => {
                    console.log('pets from index', pets);
                    // pets.forEach((pet) => {
                    console.log('pet owner', owners);
                    res.render('pets/index', { pets, owners: owners[0] });
                })
                .catch((err) => {
                    console.log(err);
                    next(err);
                });
            // });
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
});

// @desc      Show add pet
// @route     GET /users/add
// @access    Private
router.get('/pets/add', (req, res, next) => {
    User.find()
        .populate('owner')
        .then((owners) => {
            let isEmployee = false;
            if (req.user.role == 'employee') {
                isEmployee = true;
            }
            res.render('pets/add', { owners, isEmployee });
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
});

// @desc      Get pet details
// @route     GET /pets/:id
// @access    Private
router.get('/pets/:id', (req, res, next) => {
    Pet.findById(req.params.id).then((pet) => {
        console.log('pet', pet);
        User.find(pet.owner)
            .populate('owner')
            .then((owner) => {
                console.log('owner of the pet', owner[0]);
                res.render('pets/show', { pet, owner: owner[0] });
            })
            .catch((err) => {
                next(err);
            });
    });
});

// @desc      Show edit form
// @route     GET /pets/:id/edit
// @access    Private
router.get('/pets/:id/edit', loginCheck(), (req, res, next) => {
    Pet.findById(req.params.id)
        .then((pet) => {
            console.log(' editing pet', pet);
            User.find(pet.owner)
                .populate('owner')
                .then((owner) => {
                    console.log('owner pet', owner);
                    let options = '';
                    let isEmployee = false;
                    if (req.user.role == 'employee') {
                        isEmployee = true;
                    }
                    console.log('pet to edit', pet);
                    console.log('req.user', req.user);
                    res.render('pets/edit', { pet, isEmployee, owner });
                })
                .catch((err) => {
                    console.log(err);
                    next(err);
                });
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
});
// @desc      Add pet
// @route     POST /pets/add
// @access    Private
router.post(
    '/pets/add',
    // loginCheck,

    (req, res, next) => {
        let { name, specie, age, diagnosis, treatment, owner } = req.body;

        if (req.user.role == 'client') {
            owner = req.user.id;
        }

        Pet.create({
            name,
            specie,
            age,
            diagnosis,
            treatment,
            owner,
        })
            .then((pet) => {
                console.log('pet added', pet);
                res.redirect('/pets');
            })
            .catch((err) => {
                next(err);
            });
    }
);

// @desc      Edit pet
// @route     POST /pets/:id/edit
// @access    Private
router.post(
    '/pets/:id/edit',
    loginCheck(),

    (req, res, next) => {
        const { name, specie, age, diagnosis, treatment } = req.body;

        User.findByIdAndUpdate(req.params.id, {
            name,
            specie,
            age,
            diagnosis,
            treatment,
        })
            .then((user) => {
                console.log('user was updated', user);
                res.redirect(`/pets/${user.id}`);
            })
            .catch((err) => {
                next(err);
            });
    }
);
// @desc      Delete pet
// @route     POST /pets/:id/delete
// @access    Private
router.post('/pets/:id/delete', loginCheck(), (req, res) => {
    console.log('req.params', req.params);
    const query = { _id: req.params.id };

    // if user is not admin they have to be the owner
    if (req.user.role !== 'employee') {
        query.owner = req.user._id;
    }
    console.log('query', query);
    Pet.findByIdAndDelete(req.params.id)
        .then((pet) => {
            console.log('This pet was removed', pet);
            res.redirect('/pets');
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;
