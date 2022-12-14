const songService = require('../services/song.service');
const ApiError = require('../auxiliaries/errors/api.error');
const { StatusCodes } = require('http-status-codes');
const {
    createSongValidation,
    updateSongValidation,
    playlistSongValidation,
} = require('../auxiliaries/validations/song.validation');

class SongController {
    async createSong(req, res, next) {
        const { error } = createSongValidation(req.body);
        if (error) {
            const errorMessages = error.details.map((e) => e.message).join(', ');
            return next(ApiError.badRequest(errorMessages));
        }

        const userId = req.user.id;
        const result = await songService.createSong(req.body, userId);
        if (result.err) {
            return next(result.err);
        }

        return res.status(StatusCodes.CREATED).json(result.song);
    }

    async getAllSongs(req, res, next) {
        const result = await songService.getAllSongs();
        if (result.err) {
            return next(result.err);
        }

        return res.status(StatusCodes.OK).json(result.songs);
    }

    async getSongById(req, res, next) {
        const songId = req.params.id;
        if (!songId || isNaN(songId)) {
            return next(ApiError.badRequest('Wrong set of parameters'));
        }

        const result = await songService.getSongById(songId);
        if (result.err) {
            return next(result.err);
        }

        return res.status(StatusCodes.OK).json(result.song);
    }

    async updateSong(req, res, next) {
        const { error } = updateSongValidation(req.body);
        if (error) {
            const errorMessages = error.details.map((e) => e.message).join(', ');
            return next(ApiError.badRequest(errorMessages));
        }

        const userId = req.user.id;
        const songId = req.params.songId;
        if (!songId || isNaN(songId)) {
            return next(ApiError.badRequest('Wrong set of parameters'));
        }

        const result = await songService.updateSong(req.body, songId, userId);
        if (result.err) {
            return next(result.err);
        }

        return res.status(StatusCodes.OK).json(result.song);
    }

    async deleteSong(req, res, next) {
        const userId = req.user.id;
        const songId = req.params.songId;
        if (!songId || isNaN(songId)) {
            return next(ApiError.badRequest('Wrong set of parameters'));
        }

        const err = await songService.deleteSong(songId, userId);
        if (err) {
            return next(err);
        }

        return res.status(StatusCodes.OK).json({ message: 'Deleted successfully' });
    }

    async addSongToPlaylist(req, res, next) {
        const { error } = playlistSongValidation(req.body);
        if (error) {
            const errorMessages = error.details.map((e) => e.message).join(', ');
            return next(ApiError.badRequest(errorMessages));
        }

        const userId = req.user.id;
        const songId = req.params.songId;
        if (!songId || isNaN(songId)) {
            return next(ApiError.badRequest('Wrong set of parameters'));
        }

        const err = await songService.addSongToPlaylist(req.body.playlistId, songId, userId);
        if (err) {
            return next(err);
        }

        return res.status(StatusCodes.OK).json({ message: 'Added successfully' });
    }

    async removeSongFromPlaylist(req, res, next) {
        const { error } = playlistSongValidation(req.body);
        if (error) {
            const errorMessages = error.details.map((e) => e.message).join(', ');
            return next(ApiError.badRequest(errorMessages));
        }

        const userId = req.user.id;
        const songId = req.params.songId;
        if (!songId || isNaN(songId)) {
            return next(ApiError.badRequest('Wrong set of parameters'));
        }

        const err = await songService.removeSongFromPlaylist(req.body.playlistId, songId, userId);
        if (err) {
            return next(err);
        }

        return res.status(StatusCodes.OK).json({ message: 'Removed successfully' });
    }
}

module.exports = new SongController();
