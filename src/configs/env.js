'use strict'

require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI =
  process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET
const GRAFANA_URL = process.env.GRAFANA_URL
const GRAFANA_ID = process.env.GRAFANA_ID
const GRAFANA_WRITE_TOKEN = process.env.GRAFANA_WRITE_TOKEN

module.exports = {
  MONGODB_URI,
  PORT,
  JWT_SECRET,
  GRAFANA_URL,
  GRAFANA_ID,
  GRAFANA_WRITE_TOKEN,
}
