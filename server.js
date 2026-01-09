'use strict';

const app = require('./src/app');
const env = require('./src/configs/env');
const logger = require('./src/configs/logger');

const server = app.listen(env.PORT, () => {
  logger.info(`Server running on port ${env.PORT}`);
});

process.on('SIGINT', () => {
  server.close(() => logger.info('Server closed'));
});
