const { User, Role } = require('../models');
const ApiError = require('../auxiliaries/errors/api.error');

class UserService {
    async getCurrentUser(id) {
        try {
            const user = await User.findOne({ where: { id: id } });
            if (!user) {
                return {
                    user: null,
                    err: ApiError.notFound('No user with such id'),
                };
            }

            return { user: user, err: null };
        } catch (e) {
            return { user: null, err: ApiError.notFound(e.message) };
        }
    }

    async updateUser(updateUserDto, id) {
        try {
            const user = await User.findOne({ where: { id: id } });
            if (!user) {
                return {
                    user: null,
                    err: ApiError.notFound('No user with such id'),
                };
            }

            await user.update({ username: updateUserDto.username });
            await user.save();

            return { user: user, err: null };
        } catch (e) {
            return { user: null, err: ApiError.notFound(e.message) };
        }
    }

    async getAllUsers() {
        try {
            const users = await User.findAll({
                include: [Role],
            });

            users.forEach((user) => {
                delete user.dataValues.password;
            });

            return { users: users, err: null };
        } catch (e) {
            return { users: null, err: ApiError.notFound(e.message) };
        }
    }
}

module.exports = new UserService();
