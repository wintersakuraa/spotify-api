const { Role, UserRole } = require('../models');
const ApiError = require('../auxiliaries/errors/api.error');

class RoleService {
    async getAllRoles() {
        try {
            const roles = await Role.findAll();
            return { roles: roles, err: null };
        } catch (e) {
            return { roles: null, err: ApiError.badRequest(e.message) };
        }
    }

    async createRole(roleDto) {
        try {
            const role = await Role.findOne({ where: { title: roleDto.title } });
            if (role) {
                return {
                    role: null,
                    err: ApiError.badRequest('Role already exists'),
                };
            }

            const newRole = await Role.create({ title: roleDto.title });
            return { role: newRole, err: null };
        } catch (e) {
            return { role: null, err: ApiError.badRequest(e.message) };
        }
    }

    async getRoleById(roleTitle) {
        try {
            const role = await Role.findOne({ where: { title: roleTitle } });
            if (!role) {
                return {
                    role: null,
                    err: ApiError.badRequest('No such role'),
                };
            }

            return { role: role, err: null };
        } catch (e) {
            return { role: null, err: ApiError.badRequest(e.message) };
        }
    }

    async updateRole(roleDto, roleTitle) {
        try {
            const role = await Role.findOne({ where: { title: roleTitle } });
            if (!role) {
                return {
                    role: null,
                    err: ApiError.badRequest('No such role'),
                };
            }

            await role.update({ title: roleDto.title });
            await role.save();
            return { role: role, err: null };
        } catch (e) {
            return { role: null, err: ApiError.badRequest(e.message) };
        }
    }

    async deleteRole(roleTitle) {
        try {
            const role = await Role.findOne({ where: { title: roleTitle } });
            if (!role) {
                return ApiError.badRequest('No such role');
            }

            await role.destroy();
            return null;
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }

    async addRole(roleTitle, userId) {
        try {
            const role = await Role.findOne({ where: { title: roleTitle } });
            if (!role) {
                return ApiError.badRequest('No such role');
            }

            await UserRole.create({ roleId: role.id, userId: userId });
            return null;
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }

    async removeRole(roleTitle, userId) {
        try {
            const role = await Role.findOne({ where: { title: roleTitle } });
            if (!role) {
                return ApiError.badRequest('No such role');
            }

            const userRole = await UserRole.findOne({ where: { roleId: role.id, userId: userId } });
            await userRole.destroy();
            return null;
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }
}

module.exports = new RoleService();
