const { Sequelize } = require('sequelize');
const dbConfig = require('../configs/db.config');

module.exports = new Sequelize(
    dbConfig.postgres.name,
    dbConfig.postgres.username,
    dbConfig.postgres.password,
    {
        dialect: 'postgres',
        host: dbConfig.postgres.host,
        port: dbConfig.postgres.port,
    },
);
