const Joi = require('joi');

const createSongValidation = (data) => {
    const createSongSchema = Joi.object({
        title: Joi.string().min(3).max(55).required(),
        genre: Joi.string().min(3).max(55).required(),
        albumId: Joi.number().positive().required(),
    });

    return createSongSchema.validate(data, { abortEarly: false });
};

const updateSongValidation = (data) => {
    const updateSongSchema = Joi.object({
        title: Joi.string().min(3).max(55).optional(),
        genre: Joi.string().min(3).max(55).optional(),
        albumId: Joi.number().positive().optional(),
    });

    return updateSongSchema.validate(data, { abortEarly: false });
};

const playlistSongValidation = (data) => {
    const addSongSchema = Joi.object({
        playlistId: Joi.number().positive().required(),
    });

    return addSongSchema.validate(data, { abortEarly: false });
};

module.exports = {
    createSongValidation,
    updateSongValidation,
    playlistSongValidation,
};
