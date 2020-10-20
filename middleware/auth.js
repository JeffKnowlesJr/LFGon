const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied'});
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        // Take the request object
        // set user in the request
        // object to the user in the
        // decoded payload, user - password
        req.user = decoded.user;
        next();
    } catch(err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}
