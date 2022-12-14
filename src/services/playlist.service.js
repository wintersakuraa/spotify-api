const { Playlist, Song, SongPlaylist } = require('../models');
const ApiError = require('../auxiliaries/errors/api.error');

class PlaylistService {
    async getAllPlaylists(userId) {
        try {
            const playlists = await Playlist.findAll({ where: { userId: userId } });
            return { playlists: playlists, err: null };
        } catch (e) {
            return { playlists: null, err: ApiError.badRequest(e.message) };
        }
    }

    async createPlaylist(createPlaylistDto, userId) {
        try {
            const playlist = await Playlist.create({
                title: createPlaylistDto.title,
                userId: userId,
            });
            return { playlist: playlist, err: null };
        } catch (e) {
            return { playlist: null, err: ApiError.badRequest(e.message) };
        }
    }

    async getPlaylistById(playlistId, userId) {
        try {
            const playlist = await Playlist.findOne({ where: { id: playlistId } });
            if (!playlist) {
                return {
                    playlist: null,
                    err: ApiError.badRequest('No such playlist'),
                };
            }

            if (playlist.userId !== userId) {
                return {
                    songs: null,
                    err: ApiError.badRequest(
                        'Trying to get playlist that does not belong to current user',
                    ),
                };
            }

            return { playlist: playlist, err: null };
        } catch (e) {
            return { playlist: null, err: ApiError.badRequest(e.message) };
        }
    }

    async updatePlaylist(updatePlaylistDto, playlistId, userId) {
        try {
            const playlist = await Playlist.findOne({ where: { id: playlistId } });
            if (!playlist) {
                return {
                    playlist: null,
                    err: ApiError.badRequest('No such playlist'),
                };
            }

            if (playlist.userId !== userId) {
                return {
                    songs: null,
                    err: ApiError.badRequest(
                        'Trying to get playlist that does not belong to current user',
                    ),
                };
            }

            await playlist.update({ title: updatePlaylistDto.title });
            await playlist.save();
            return { playlist: playlist, err: null };
        } catch (e) {
            return { playlist: null, err: ApiError.badRequest(e.message) };
        }
    }

    async deletePlaylist(playlistId, userId) {
        try {
            const playlist = await Playlist.findOne({ where: { id: playlistId } });
            if (!playlist) {
                return ApiError.badRequest('No such playlist');
            }

            if (playlist.userId !== userId) {
                return ApiError.badRequest(
                    'Trying to get playlist that does not belong to current user',
                );
            }

            await playlist.destroy();
            return null;
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }

    async getSongsFromPlaylist(playlistId, userId) {
        try {
            const playlist = await Playlist.findOne({ where: { id: playlistId } });
            if (!playlist) {
                return {
                    songs: null,
                    err: ApiError.badRequest('No such playlist'),
                };
            }

            if (playlist.userId !== userId) {
                return {
                    songs: null,
                    err: ApiError.badRequest(
                        'Trying to operate with playlist that does not belong to current user',
                    ),
                };
            }

            const songsPlaylist = await SongPlaylist.findAll({ where: { playlistId: playlistId } });
            const songs = [];
            for (let item of songsPlaylist) {
                const song = await Song.findOne({ where: { id: item.dataValues.songId } });
                if (!song) {
                    return {
                        songs: null,
                        err: ApiError.badRequest(`No song with id ${item.dataValues.songId}`),
                    };
                }

                songs.push(song);
            }

            return { songs: songs, err: null };
        } catch (e) {
            return { songs: null, err: ApiError.badRequest(e.message) };
        }
    }
}

module.exports = new PlaylistService();
