const albumService = require('../services/album.service');
const ApiError = require('../auxiliaries/errors/api.error');
const { StatusCodes } = require('http-status-codes');
const { albumValidation } = require('../auxiliaries/validations/album.validation');

class AlbumController {
    async createAlbum(req, res, next) {
        const { error } = albumValidation(req.body);
        if (error) {
            const errorMessages = error.details.map((e) => e.message).join(', ');
            return next(ApiError.badRequest(errorMessages));
        }

        const userId = req.user.id;
        const result = await albumService.createAlbum(req.body, userId);
        if (result.err) {
            return next(result.err);
        }

        return res.status(StatusCodes.CREATED).json(result.album);
    }

    async getAllAlbums(req, res, next) {
        const result = await albumService.getAllAlbums();
        if (result.err) {
            return next(result.err);
        }

        return res.status(StatusCodes.OK).json(result.albums);
    }

    async getAlbumById(req, res, next) {
        const albumId = req.params.id;
        if (!albumId || isNaN(albumId)) {
            return next(ApiError.badRequest('Wrong set of parameters'));
        }

        const result = await albumService.getAlbumById(albumId);
        if (result.err) {
            return next(result.err);
        }

        return res.status(StatusCodes.OK).json(result.album);
    }

    async updateAlbum(req, res, next) {
        const { error } = albumValidation(req.body);
        if (error) {
            const errorMessages = error.details.map((e) => e.message).join(', ');
            return next(ApiError.badRequest(errorMessages));
        }

        const userId = req.user.id;
        const albumId = req.params.id;
        if (!albumId || isNaN(albumId)) {
            return next(ApiError.badRequest('Wrong set of parameters'));
        }

        const result = await albumService.updateAlbum(req.body, albumId, userId);
        if (result.err) {
            return next(result.err);
        }

        return res.status(StatusCodes.OK).json(result.album);
    }

    async deleteAlbum(req, res, next) {
        const userId = req.user.id;
        const albumId = req.params.id;
        if (!albumId || isNaN(albumId)) {
            return next(ApiError.badRequest('Wrong set of parameters'));
        }

        const err = await albumService.deleteAlbum(albumId, userId);
        if (err) {
            return next(err);
        }

        return res.status(StatusCodes.OK).json({ message: 'Deleted successfully' });
    }

    async getSongsFromAlbum(req, res, next) {
        const userId = req.user.id;
        const albumId = req.params.id;
        if (!albumId || isNaN(albumId)) {
            return next(ApiError.badRequest('Wrong set of parameters'));
        }

        const result = await albumService.getSongsFromAlbum(albumId, userId);
        if (result.err) {
            return next(result.err);
        }

        return res.status(StatusCodes.OK).json(result.songs);
    }
}

module.exports = new AlbumController();
