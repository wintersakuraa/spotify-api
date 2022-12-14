const Joi = require('joi');

const albumValidation = (data) => {
    const albumSchema = Joi.object({
        title: Joi.string().min(3).max(55).required(),
    });

    return albumSchema.validate(data, { abortEarly: false });
};

module.exports = {
    albumValidation,
};
