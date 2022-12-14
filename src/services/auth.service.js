const { User, Role, UserRole } = require('../models');
const bcrypt = require('bcrypt');
const generateToken = require('../auxiliaries/helpers/generate-token');
const ApiError = require('../auxiliaries/errors/api.error');

class AuthService {
    async register(registerDto) {
        try {
            const candidate = await User.findOne({ where: { email: registerDto.email } });
            if (candidate) {
                return {
                    token: '',
                    err: ApiError.badRequest('User with such email has already been created'),
                };
            }

            const hash = await bcrypt.hash(registerDto.password, 7);
            const role = await Role.findOne({ where: { title: 'USER' } });
            const user = await User.create({
                username: registerDto.username,
                email: registerDto.email,
                password: hash,
            });
            await UserRole.create({ userId: user.id, roleId: role.id });

            const token = generateToken(user.id, user.email, role.title);
            return { token: token, err: null };
        } catch (e) {
            return { token: null, err: ApiError.badRequest(e.message) };
        }
    }

    async login(loginDto) {
        try {
            const user = await User.findOne({
                where: { email: loginDto.email },
                include: Role,
            });

            if (!user) {
                return {
                    token: '',
                    err: ApiError.notFound('No user with such email'),
                };
            }

            const passwordCheck = bcrypt.compareSync(loginDto.password, user.password);
            if (!passwordCheck) {
                return {
                    token: '',
                    err: ApiError.badRequest('Invalid credentials'),
                };
            }

            const roles = user.roles.map((role) => role.title);
            const token = generateToken(user.id, user.email, roles);
            return { token: token, err: null };
        } catch (e) {
            return { token: null, err: ApiError.badRequest(e.message) };
        }
    }
}

module.exports = new AuthService();
