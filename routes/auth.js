const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

/// @desc     Sign up
// @route     GET /signup
// @access    Public
router.get('/signup', (req, res, next) => {
    let signUp = true;
    console.log('signUp', signUp);
    res.render('index', { signUp });
});

// @desc      Log in
// @route     GET /login
// @access    Public
router.get('/login', (req, res, next) => {
    res.render('index');
});

// @desc      Log in
// @route     POST /login
// @access    Public
router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        passReqToCallback: true,
    })
);

// @desc      Sign up
// @route     POST /signup
// @access    Public
router.post('/signup', (req, res, next) => {
    const {
        name,
        lastName,
        street,
        zip,
        city,
        state,
        email,
        password,
        confirm,
        phoneNumber,
    } = req.body;
    if (password.length < 3) {
        res.render('auth/signup', {
            message: 'Your password must be 8 characters minimum.',
        });
        return;
    }
    if (password !== confirm) {
        res.render('auth/login', {
            message: "Passwords don't match.",
        });
        return;
    }

    User.findOne({ email }).then((found) => {
        if (found) {
            res.render('auth/signup', {
                message: 'This username is already taken',
            });
        } else {
            // we can create a user with the username and password pair
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(password, salt);

            User.create({
                name,
                lastName,
                email,
                password: hash,
                address: { street, zip, city, state },
                phoneNumber,
            })
                .then((dbUser) => {
                    // login with passport
                    req.login(dbUser, (err) => {
                        if (err) {
                            next(err);
                        } else {
                            res.redirect('/');
                        }
                    });
                })
                .catch((err) => {
                    next(err);
                });
        }
    });
});

// @desc      Log out
// @route     GET /logout
// @access    Private
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});
module.exports = router;
