'use strict'

const mongoose = require('mongoose')
const app = require('./src/app')
const env = require('./src/configs/env')
const logger = require('./src/configs/logger')
const db = require('./src/configs/database')

let server

const startServer = async () => {
  try {
    await db.connect()

    server = app.listen(env.PORT, () => {
      logger.info(`Server running on port ${env.PORT}`)
    })
  } catch (error) {
    logger.error('Failed to start server:', error)
    process.exit(1)
  }
}

const exitHandler = async () => {
  try {
    if (server) {
      await new Promise((resolve) => server.close(resolve))
      logger.info('Server Express closed')
    }

    await mongoose.connection.close(false)
    logger.info('Mongoose connection closed')

    process.exit(0)
  } catch (err) {
    logger.error('Error closing server:', err)
    process.exit(1)
  }
}

process.on('SIGINT', () => {
  console.log('System interrupt signal detected. Exiting...')
  exitHandler()
})

process.on('SIGTERM', () => {
  console.log('System termination signal detected. Exiting...')
  exitHandler()
})

process.once('SIGUSR2', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected through nodemon restart')
    process.kill(process.pid, 'SIGUSR2')
  })
})

startServer()
