const playlistService = require('../services/playlist.service');
const ApiError = require('../auxiliaries/errors/api.error');
const { StatusCodes } = require('http-status-codes');
const { playlistValidation } = require('../auxiliaries/validations/playlist.validation');

class PlaylistController {
    async getAllPlaylists(req, res, next) {
        const userId = req.user.id;
        const result = await playlistService.getAllPlaylists(userId);
        if (result.err) {
            return next(result.err);
        }

        return res.status(StatusCodes.OK).json(result.playlists);
    }

    async createPlaylist(req, res, next) {
        const { error } = playlistValidation(req.body);
        if (error) {
            const errorMessages = error.details.map((e) => e.message).join(', ');
            return next(ApiError.badRequest(errorMessages));
        }

        const userId = req.user.id;
        const result = await playlistService.createPlaylist(req.body, userId);
        if (result.err) {
            return next(result.err);
        }

        return res.status(StatusCodes.CREATED).json(result.playlist);
    }

    async getPlaylistById(req, res, next) {
        const userId = req.user.id;
        const playlistId = req.params.id;
        if (!playlistId || isNaN(playlistId)) {
            return next(ApiError.badRequest('Wrong set of parameters'));
        }

        const result = await playlistService.getPlaylistById(playlistId, userId);
        if (result.err) {
            return next(result.err);
        }

        return res.status(StatusCodes.OK).json(result.playlist);
    }

    async updatePlaylist(req, res, next) {
        const { error } = playlistValidation(req.body);
        if (error) {
            const errorMessages = error.details.map((e) => e.message).join(', ');
            return next(ApiError.badRequest(errorMessages));
        }

        const userId = req.user.id;
        const playlistId = req.params.id;
        if (!playlistId || isNaN(playlistId)) {
            return next(ApiError.badRequest('Wrong set of parameters'));
        }

        const result = await playlistService.updatePlaylist(req.body, playlistId, userId);
        if (result.err) {
            return next(result.err);
        }

        return res.status(StatusCodes.OK).json(result.playlist);
    }

    async deletePlaylist(req, res, next) {
        const userId = req.user.id;
        const playlistId = req.params.id;
        if (!playlistId || isNaN(playlistId)) {
            return next(ApiError.badRequest('Wrong set of parameters'));
        }

        const err = await playlistService.deletePlaylist(playlistId, userId);
        if (err) {
            return next(err);
        }

        return res.status(StatusCodes.OK).json({ message: 'Deleted successfully' });
    }

    async getSongsFromPlaylist(req, res, next) {
        const userId = req.user.id;
        const playlistId = req.params.id;
        if (!playlistId || isNaN(playlistId)) {
            return next(ApiError.badRequest('Wrong set of parameters'));
        }

        const result = await playlistService.getSongsFromPlaylist(playlistId, userId);
        if (result.err) {
            return next(result.err);
        }

        return res.status(StatusCodes.OK).json(result.songs);
    }
}

module.exports = new PlaylistController();
