const { StatusCodes } = require('http-status-codes');

class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }

    static badRequest(message) {
        return new ApiError(StatusCodes.BAD_REQUEST, message);
    }

    static notFound(message) {
        return new ApiError(StatusCodes.NOT_FOUND, message);
    }

    static unauthorized(message) {
        return new ApiError(StatusCodes.UNAUTHORIZED, message);
    }

    static forbidden(message) {
        return new ApiError(StatusCodes.FORBIDDEN, message);
    }

    static internalServerError(message) {
        return new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, message);
    }
}

module.exports = ApiError;
