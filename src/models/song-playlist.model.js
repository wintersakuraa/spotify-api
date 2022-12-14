const sequelize = require('../services/db.service');
const { DataTypes } = require('sequelize');

const SongPlaylist = sequelize.define('song_playlist', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

module.exports = SongPlaylist;
