const Joi = require('joi');

const updateUserValidation = (data) => {
    const updateUserSchema = Joi.object({
        username: Joi.string().min(2).max(36).required(),
    });

    return updateUserSchema.validate(data, { abortEarly: false });
};

module.exports = {
    updateUserValidation,
};
