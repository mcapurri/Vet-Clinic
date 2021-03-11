const loginCheck = () => {
    return (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.status(400).json('/');
        }
    };
};

module.exports = { loginCheck };
