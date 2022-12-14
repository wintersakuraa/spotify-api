require('dotenv').config();

const PORT = process.env.PORT || 5005;
const SECRET_KEY = process.env.SECRET_KEY || 'super-secret';

const generalConfig = {
    server: {
        port: PORT,
    },
    jwt: {
        secretKey: SECRET_KEY,
    },
};

module.exports = generalConfig;
