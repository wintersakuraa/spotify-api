const sequelize = require('../services/db.service');
const { DataTypes } = require('sequelize');

const Playlist = sequelize.define('playlist', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Playlist;
