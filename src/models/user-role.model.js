const sequelize = require('../services/db.service');
const { DataTypes } = require('sequelize');

const UserRole = sequelize.define('user_role', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

module.exports = UserRole;
