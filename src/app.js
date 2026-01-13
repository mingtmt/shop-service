'use strict'

require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

const app = express()

// middlewares
app.use(express.json())
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
app.use(helmet())
app.use(compression())

// routes
app.use('/api/v1', routes)

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})
app.use(errorHandler)

module.exports = app
