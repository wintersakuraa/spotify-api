const express = require('express');
const cors = require('cors');
const generalConfig = require('./src/configs/general.config');
const sequelize = require('./src/services/db.service');
const router = require('./src/routes');
const models = require('./src/models/index');
const Logger = require('./src/libs/logger');
const errorHandlingMiddleware = require('./src/middlewares/error-handling.middleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', router);

// Error Handling
app.use(errorHandlingMiddleware);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(generalConfig.server.port, () => {
            Logger.info(`Server is listening on PORT: ${generalConfig.server.port}`);
        });
    } catch (e) {
        Logger.error(e);
    }
};

start();
