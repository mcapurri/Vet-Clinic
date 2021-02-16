const hbs = require('hbs');

const loginCheck = () => {
    return (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/login');
        }
    };
};
// Helper for comparing values in hbs
hbs.registerHelper('ifEqual', function (a, b, options) {
    if (a == b) {
        return options.fn(this);
    }
    return options.inverse(this);
});

module.exports = { loginCheck };
