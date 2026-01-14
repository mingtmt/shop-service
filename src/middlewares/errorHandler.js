'use strict'

const logger = require('../configs/logger')
const { StatusCode, ErrorCode } = require('../core/constants')
const { NotFoundError } = require('../core/errorResponse')

const errorHandler = (err, req, res, next) => {
  const error = err

  const statusCode = error.statusCode || StatusCode.INTERNAL_SERVER_ERROR
  const errorCode = error.errorCode || ErrorCode.INTERNAL_ERROR
  const message = error.message || 'Internal Server Error'

  const logData = {
    statusCode,
    errorCode,
    message,
    url: req.url,
    method: req.method,
  }

  if (statusCode >= 500) {
    logger.error('Critical Error:', {
      ...logData,
      stack: error.stack,
      body: req.body,
      params: req.params,
      query: req.query,
    })
  } else {
    logger.warn('Client Error:', logData)
  }

  const response = {
    success: false,
    error: {
      statusCode,
      code: errorCode,
      message,
    },
  }

  if (error.errors) {
    response.error.errors = error.errors
  }

  if (process.env.NODE_ENV === 'development') {
    response.error.stack = error.stack
    response.error.raw = error
  }

  res.status(statusCode).json(response)
}

const notFoundHandler = (req, res, next) => {
  next(new NotFoundError(`Route ${req.originalUrl} not found`))
}

module.exports = {
  errorHandler,
  notFoundHandler,
}
