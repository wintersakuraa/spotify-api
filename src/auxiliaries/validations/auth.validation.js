const Joi = require('joi');

const authRegisterValidation = (data) => {
    const registerSchema = Joi.object({
        username: Joi.string().min(2).max(36).required(),
        email: Joi.string().email().min(3).required(),
        password: Joi.string().min(6).max(20).required(),
    });

    return registerSchema.validate(data, { abortEarly: false });
};

const authLoginValidation = (data) => {
    const loginSchema = Joi.object({
        email: Joi.string().email().min(3).required(),
        password: Joi.string().min(6).max(20).required(),
    });

    return loginSchema.validate(data, { abortEarly: false });
};

module.exports = {
    authRegisterValidation,
    authLoginValidation,
};
