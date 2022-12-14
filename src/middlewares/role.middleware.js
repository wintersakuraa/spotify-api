const jwt = require('jsonwebtoken');
const ApiError = require('../auxiliaries/errors/api.error');
const generalConfig = require('../configs/general.config');

module.exports = (roles) => {
    return (req, res, next) => {
        if (req.method === 'OPTIONS') {
            return next();
        }

        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return next(ApiError.unauthorized('User unauthorized'));
            }

            const { roles: userRoles } = jwt.verify(token, generalConfig.jwt.secretKey);
            let hasRole = false;
            userRoles.forEach((role) => {
                if (roles.includes(role)) {
                    hasRole = true;
                }
            });

            if (!hasRole) {
                return next(ApiError.forbidden('Permission denied'));
            }
            next();
        } catch (e) {
            return next(ApiError.unauthorized('User unauthorized'));
        }
    };
};
