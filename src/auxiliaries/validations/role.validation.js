const Joi = require('joi');

const roleValidation = (data) => {
    const roleSchema = Joi.object({
        title: Joi.string().required(),
    });

    return roleSchema.validate(data, { abortEarly: false });
};

module.exports = roleValidation;
