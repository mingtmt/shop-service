'use strict'

const winston = require('winston')
const LokiTransport = require('winston-loki')
const { GRAFANA_URL, GRAFANA_ID, GRAFANA_WRITE_TOKEN } = require('./env')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  defaultMeta: { service: 'nodejs-backend' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),

    // winston-loki transport logs to Grafana Loki
    new LokiTransport({
      host: GRAFANA_URL,
      basicAuth: `${GRAFANA_ID}:${GRAFANA_WRITE_TOKEN}`,
      labels: { app: 'shop-service' },
      json: true,
      batching: true,
      interval: 5,
      batchSize: 10,
    }),
  ],
})

module.exports = logger
