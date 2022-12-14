const ApiError = require('../auxiliaries/errors/api.error');
const authService = require('../services/auth.service');
const { StatusCodes } = require('http-status-codes');
const {
    authRegisterValidation,
    authLoginValidation,
} = require('../auxiliaries/validations/auth.validation');

class AuthController {
    async register(req, res, next) {
        const { error } = authRegisterValidation(req.body);
        if (error) {
            const errorMessages = error.details.map((e) => e.message).join(', ');
            return next(ApiError.badRequest(errorMessages));
        }

        const result = await authService.register(req.body);
        if (result.err) {
            return next(result.err);
        }

        return res.status(StatusCodes.CREATED).json({ token: result.token });
    }

    async login(req, res, next) {
        const { error } = authLoginValidation(req.body);
        if (error) {
            const errorMessages = error.details.map((e) => e.message).join(', ');
            return next(ApiError.badRequest(errorMessages));
        }

        const result = await authService.login(req.body);
        if (result.err) {
            return next(result.err);
        }
        return res.status(StatusCodes.OK).json({ token: result.token });
    }
}

module.exports = new AuthController();
