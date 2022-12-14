require('dotenv').config();

const DB_USER = process.env.DB_USER || '';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || '';
const DB_PORT = process.env.DB_PORT || '';
const DB_HOST = process.env.DB_HOST || '';

const dbConfig = {
    postgres: {
        username: DB_USER,
        password: DB_PASSWORD,
        name: DB_NAME,
        port: DB_PORT,
        host: DB_HOST,
    },
};

module.exports = dbConfig;
