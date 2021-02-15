const router = require('express').Router();

// @desc      Home page
// @route     GET /
// @access    Public
router.get('/', (req, res, next) => {
    console.log('user', req.user);
    res.render('index', { user: req.user });
});

module.exports = router;
