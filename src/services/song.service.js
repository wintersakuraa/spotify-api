const ApiError = require('../auxiliaries/errors/api.error');
const { Song, Album, Playlist, SongPlaylist } = require('../models');

class SongService {
    async createSong(createSongDto, userId) {
        try {
            const usersAlbums = await Album.findAll({ where: { userId: userId } });
            const findAlbum = usersAlbums.find((album) => album.id === createSongDto.albumId);
            if (!findAlbum) {
                return {
                    song: null,
                    err: ApiError.badRequest('No album with such id'),
                };
            }

            const song = await Song.create({
                title: createSongDto.title,
                genre: createSongDto.genre,
                albumId: createSongDto.albumId,
                userId: userId,
            });
            return { song: song, err: null };
        } catch (e) {
            return { song: null, err: ApiError.badRequest(e.message) };
        }
    }

    async getAllSongs() {
        try {
            const songs = await Song.findAll();
            return { songs: songs, err: null };
        } catch (e) {
            return { songs: null, err: ApiError.badRequest(e.message) };
        }
    }

    async getSongById(songId) {
        try {
            const song = await Song.findOne({ where: { id: songId } });
            if (!song) {
                return {
                    song: null,
                    err: ApiError.badRequest('No such song'),
                };
            }

            return { song: song, err: null };
        } catch (e) {
            return { song: null, err: ApiError.badRequest(e.message) };
        }
    }

    async updateSong(updateSongDto, songId, userId) {
        try {
            const song = await Song.findOne({ where: { id: songId } });
            if (!song) {
                return {
                    song: null,
                    err: ApiError.badRequest('No such song'),
                };
            }

            if (song.userId !== userId) {
                return {
                    song: null,
                    err: ApiError.badRequest(
                        'Trying to update song that does not belong to current user',
                    ),
                };
            }

            for (let field of Object.keys(updateSongDto)) {
                await song.update({ [field]: updateSongDto[field] });
                await song.save();
            }

            return { song: song, err: null };
        } catch (e) {
            return { song: null, err: ApiError.badRequest(e.message) };
        }
    }

    async deleteSong(songId, userId) {
        try {
            const song = await Song.findOne({ where: { id: songId } });
            if (!song) {
                return ApiError.badRequest('No such song');
            }

            if (song.userId !== userId) {
                return ApiError.badRequest(
                    'Trying to delete song that does not belong to current user',
                );
            }

            await song.destroy();
            return null;
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }

    async addSongToPlaylist(playlistId, songId, userId) {
        try {
            const song = await Song.findOne({ where: { id: songId } });
            if (!song) {
                return ApiError.badRequest('No such song');
            }

            const playlist = await Playlist.findOne({ where: { id: playlistId } });
            if (!playlist) {
                return ApiError.badRequest('No such playlist');
            }

            if (playlist.userId !== userId) {
                return ApiError.badRequest(
                    'Trying to operate with playlist that does not belong to current user',
                );
            }

            await SongPlaylist.create({ playlistId: playlistId, songId: songId });
            return null;
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }

    async removeSongFromPlaylist(playlistId, songId, userId) {
        try {
            const song = await Song.findOne({ where: { id: songId } });
            if (!song) {
                return ApiError.badRequest('No such song');
            }

            const playlist = await Playlist.findOne({ where: { id: playlistId } });
            if (!playlist) {
                return ApiError.badRequest('No such playlist');
            }

            if (playlist.userId !== userId) {
                return ApiError.badRequest(
                    'Trying to operate with playlist that does not belong to current user',
                );
            }

            const songPlaylist = await SongPlaylist.findOne({
                where: { playlistId: playlistId, songId: songId },
            });
            await songPlaylist.destroy();
            return null;
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }
}

module.exports = new SongService();
