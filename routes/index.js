const router = require('express').Router();

// @desc      Home page
// @route     GET /
// @access    Public
// router.get('/', (req, res, next) => {
//     let isEmployee = false;
//     if (req.user && req.user.role == 'employee') {
//         isEmployee = true;
//     }
//     console.log('user', req.user);
//     // res.render('index', { user: req.user, isEmployee });
//     res.status(200).json();
// });

module.exports = router;
