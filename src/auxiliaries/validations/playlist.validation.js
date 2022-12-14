const Joi = require('joi');

const playlistValidation = (data) => {
    const playlistSchema = Joi.object({
        title: Joi.string().min(3).max(55).required(),
    });

    return playlistSchema.validate(data, { abortEarly: false });
};

module.exports = {
    playlistValidation,
};
