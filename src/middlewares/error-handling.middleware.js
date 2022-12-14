const { StatusCodes } = require('http-status-codes');
const ApiError = require('../auxiliaries/errors/api.error');

module.exports = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Unexpected error' });
    return res.status(err.statusCode).json({ message: err.message });
};
