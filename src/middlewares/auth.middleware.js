const jwt = require('jsonwebtoken');
const ApiError = require('../auxiliaries/errors/api.error');
const generalConfig = require('../configs/general.config');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return next(ApiError.unauthorized('User unauthorized'));
        }

        req.user = jwt.verify(token, generalConfig.jwt.secretKey);
        next();
    } catch (e) {
        return next(ApiError.unauthorized('User unauthorized'));
    }
};
