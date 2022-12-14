const User = require('./user.model');
const Playlist = require('./playlist.model');
const SongPlaylist = require('./song-playlist.model');
const Song = require('./song.model');
const Album = require('./album.model');
const Role = require('./role.model');
const UserRole = require('./user-role.model');

User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

User.hasMany(Playlist);
Playlist.belongsTo(User);

User.hasMany(Song);
Song.belongsTo(User);

User.hasMany(Album);
Album.belongsTo(User);

Playlist.belongsToMany(Song, { through: SongPlaylist });
Song.belongsToMany(Playlist, { through: SongPlaylist });

Album.hasMany(Song);
Song.belongsTo(Album);

module.exports = {
    User,
    Playlist,
    SongPlaylist,
    Song,
    Album,
    Role,
    UserRole,
};
