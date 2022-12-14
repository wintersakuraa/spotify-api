const { StatusCodes } = require('http-status-codes');
const roleService = require('../services/role.service');
const roleValidation = require('../auxiliaries/validations/role.validation');
const ApiError = require('../auxiliaries/errors/api.error');

class RoleController {
    async getAllRoles(req, res, next) {
        const result = await roleService.getAllRoles();
        if (result.err) {
            return next(result.err);
        }
        
        return res.status(StatusCodes.OK).json(result.roles);
    }

    async createRole(req, res, next) {
        const { error } = roleValidation(req.body);
        if (error) {
            const errorMessages = error.details.map((e) => e.message).join(', ');
            return next(ApiError.badRequest(errorMessages));
        }

        const result = await roleService.createRole(req.body);
        if (result.err) {
            return next(result.err);
        }

        return res.status(StatusCodes.CREATED).json(result.role);
    }

    async getRoleByTitle(req, res, next) {
        const roleTitle = req.params.title;
        if (!roleTitle) {
            return next(ApiError.badRequest('No role provided'));
        }

        const result = await roleService.getRoleById(roleTitle);
        if (result.err) {
            return next(result.err);
        }

        return res.status(StatusCodes.OK).json(result.role);
    }

    async updateRole(req, res, next) {
        const { error } = roleValidation(req.body);
        if (error) {
            const errorMessages = error.details.map((e) => e.message).join(', ');
            return next(ApiError.badRequest(errorMessages));
        }

        const roleTitle = req.params.title;
        if (!roleTitle) {
            return next(ApiError.badRequest('No role provided'));
        }

        const result = await roleService.updateRole(req.body, roleTitle);
        if (result.err) {
            return next(result.err);
        }

        return res.status(StatusCodes.OK).json(result.role);
    }

    async deleteRole(req, res, next) {
        const roleTitle = req.params.title;
        if (!roleTitle) {
            return next(ApiError.badRequest('No role provided'));
        }

        const err = await roleService.deleteRole(roleTitle);
        if (err) {
            return next(err);
        }

        return res.status(StatusCodes.OK).json({ message: 'Deleted successfully' });
    }

    async addRole(req, res, next) {
        const { error } = roleValidation(req.body);
        if (error) {
            const errorMessages = error.details.map((e) => e.message).join(', ');
            return next(ApiError.badRequest(errorMessages));
        }

        const userId = req.params.userId;
        if (!userId) {
            return next(ApiError.badRequest('No userId provided'));
        }

        const err = await roleService.addRole(req.body.title, userId);
        if (err) {
            return next(err);
        }

        return res.status(StatusCodes.OK).json({ message: 'Role added successfully' });
    }

    async removeRole(req, res, next) {
        const { error } = roleValidation(req.body);
        if (error) {
            const errorMessages = error.details.map((e) => e.message).join(', ');
            return next(ApiError.badRequest(errorMessages));
        }

        const userId = req.params.userId;
        if (!userId) {
            return next(ApiError.badRequest('No userId provided'));
        }

        const err = await roleService.removeRole(req.body.title, userId);
        if (err) {
            return next(err);
        }

        return res.status(StatusCodes.OK).json({ message: 'Role removed successfully' });
    }
}

module.exports = new RoleController();
