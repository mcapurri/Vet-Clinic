const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

// @desc      Check logged in user
// @route     GET /loggedin
// @access    Public
router.get('/loggedin', (req, res, next) => {
    console.log('req.user', req.user);
    // this is where passport stores the logged in user
    res.json(req.user);
});

// @desc      Log in
// @route     POST /login
// @access    Public
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) {
            return res
                .status(500)
                .json({ message: 'Error while attempting to login' });
        }
        if (!user) {
            return res.status(400).json({ message: 'Wrong credentials' });
        }
        req.login(user, (err) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: 'Error while attempting to login' });
            }
            return res.status(200).json(user);
        });
    });
});

// @desc      Sign up
// @route     POST /signup
// @access    Public
router.post('/signup', (req, res, next) => {
    console.log('signup route');
    let signUp = true;
    const {
        name,
        lastName,
        email,
        password,
        confirm,
        street,
        zipCode,
        city,
        state,
        phoneNumber,
    } = req.body;

    console.log('password', password);
    console.log('city', city);

    if (password.length < 3) {
        return res
            .status(400)
            .json({ message: 'Your password must be 8 chars minimum' });
    }
    if (password !== confirm) {
        return res.status(400).json({ message: "Passwords don't match" });
    }

    User.findOne({ email }).then((found) => {
        if (found) {
            return res.status(400).json({ message: 'This user already exist' });
        } else {
            // we can create a user with the username and password pair
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(password, salt);

            User.create({
                name,
                lastName,
                email,
                password: hash,
                address: { street, zipCode, city, state },
                phoneNumber,
            })
                .then((dbUser) => {
                    // login with passport:
                    req.login(dbUser, (err) => {
                        if (err) {
                            return res.status(500).json({
                                message: 'Error while attempting to login',
                            });
                        }
                        return res.status(200).json(dbUser);
                    });
                })
                .catch((err) => {
                    res.json(err);
                });
        }
    });
});

// @desc      Log out
// @route     DELETE /logout
// @access    Private
router.delete('/logout', (req, res) => {
    // passport method to log out
    req.logout();
    res.status(200).json({ message: 'Logout was successful' });
});

module.exports = router;
