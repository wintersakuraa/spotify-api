const userService = require('../services/user.service');
const ApiError = require('../auxiliaries/errors/api.error');
const { StatusCodes } = require('http-status-codes');
const { updateUserValidation } = require('../auxiliaries/validations/user.validation');

class UserController {
    async getUser(req, res, next) {
        const result = await userService.getCurrentUser(req.user.id);
        if (result.err) {
            return next(result.err);
        }

        const user = result.user.dataValues;
        delete user.password;
        return res.status(StatusCodes.OK).json({ user: user });
    }

    async updateUser(req, res, next) {
        const { error } = updateUserValidation(req.body);
        if (error) {
            const errorMessages = error.details.map((e) => e.message).join(', ');
            return next(ApiError.badRequest(errorMessages));
        }

        const result = await userService.updateUser(req.body, req.user.id);
        if (result.err) {
            return next(result.err);
        }

        const user = result.user.dataValues;
        delete user.password;
        return res.status(StatusCodes.OK).json({ user: user });
    }

    async getAllUsers(req, res) {
        const result = await userService.getAllUsers();
        return res.status(StatusCodes.OK).json(result.users);
    }
}

module.exports = new UserController();
