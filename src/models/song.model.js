const sequelize = require('../services/db.service');
const { DataTypes } = require('sequelize');

const Song = sequelize.define('song', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    genre: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Song;
