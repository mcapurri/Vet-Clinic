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

module.exports = { loginCheck };
