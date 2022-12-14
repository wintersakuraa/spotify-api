const jwt = require('jsonwebtoken');
const generalConfig = require('../../configs/general.config');

module.exports = (id, email, roles) => {
    return jwt.sign({ id: id, email: email, roles: roles }, generalConfig.jwt.secretKey, {
        expiresIn: '24h',
    });
};
