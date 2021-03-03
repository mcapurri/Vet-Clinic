const loginCheck = () => {
    return (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/login');
        }
    };
};

module.exports = { loginCheck };
