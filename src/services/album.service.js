const { Album, Song } = require('../models');
const ApiError = require('../auxiliaries/errors/api.error');

class AlbumService {
    async createAlbum(createAlbumDto, userId) {
        try {
            const album = await Album.create({
                title: createAlbumDto.title,
                userId: userId,
            });
            return { album: album, err: null };
        } catch (e) {
            return { album: null, err: ApiError.badRequest(e.message) };
        }
    }

    async getAllAlbums() {
        try {
            const albums = await Album.findAll();
            return { albums: albums, err: null };
        } catch (e) {
            return { albums: null, err: ApiError.badRequest(e.message) };
        }
    }

    async getAlbumById(albumId) {
        try {
            const album = await Album.findOne({ where: { id: albumId } });
            if (!album) {
                return {
                    album: null,
                    err: ApiError.badRequest('No such album'),
                };
            }

            return { album: album, err: null };
        } catch (e) {
            return { album: null, err: ApiError.badRequest(e.message) };
        }
    }

    async updateAlbum(updateAlbumDto, albumId, userId) {
        try {
            const album = await Album.findOne({ where: { id: albumId } });
            if (!album) {
                return {
                    album: null,
                    err: ApiError.badRequest('No such album'),
                };
            }

            if (album.userId !== userId) {
                return {
                    album: null,
                    err: ApiError.badRequest(
                        'Trying to update album that does not belong to current user',
                    ),
                };
            }

            await album.update({ title: updateAlbumDto.title });
            await album.save();
            return { album: album, err: null };
        } catch (e) {
            return { album: null, err: ApiError.badRequest(e.message) };
        }
    }

    async deleteAlbum(albumId, userId) {
        try {
            const album = await Album.findOne({ where: { id: albumId } });
            if (!album) {
                return ApiError.badRequest('No such album');
            }

            if (album.userId !== userId) {
                return ApiError.badRequest(
                    'Trying to delete album that does not belong to current user',
                );
            }

            await album.destroy();
            return null;
        } catch (e) {
            return ApiError.badRequest(e.message)
        }

    }

    async getSongsFromAlbum(albumId, userId) {
        try {
            const album = await Album.findOne({ where: { id: albumId } });
            if (!album) {
                return {
                    songs: null,
                    err: ApiError.badRequest('No such album'),
                };
            }

            if (album.userId !== userId) {
                return {
                    songs: null,
                    err: ApiError.badRequest(
                        'Trying to operate with album that does not belong to current user',
                    ),
                };
            }

            const songs = await Song.findAll({ where: { albumId: album.id } });
            return { songs: songs, err: null };
        } catch (e) {
            return { songs: null, err: ApiError.badRequest(e.message) };
        }

    }
}

module.exports = new AlbumService();
