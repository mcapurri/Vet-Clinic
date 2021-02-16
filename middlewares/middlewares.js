const hbs = require('hbs');

const loginCheck = () => {
    return (req, res, next) => {
        // in node-basic-auth: req.session.user
        // req.isAuthenticated() -> this is a passport function
        if (req.isAuthenticated() && req.user.role == 'employee') {
            next();
        } else {
            res.redirect('/login');
        }
    };
};
// Helpers for conditional in hbs
hbs.registerHelper('ifEqual', function (v1, v2, options) {
    console.log('helper');
    if (v1 == v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});

hbs.registerHelper('xif', function (expression, options) {
    return hbs.helpers['x'].apply(this, [expression, options])
        ? options.fn(this)
        : options.inverse(this);
});

module.exports = { loginCheck };
