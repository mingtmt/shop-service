'use strict'

require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const routes = require('./routes')

const app = express()

// middlewares
app.use(express.json())
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
app.use(helmet())
app.use(compression())

// routes
app.use('/api/v1', routes)

module.exports = app
