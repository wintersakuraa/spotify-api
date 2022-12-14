const sequelize = require('../services/db.service');
const { DataTypes } = require('sequelize');

const Role = sequelize.define('role', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Role;
