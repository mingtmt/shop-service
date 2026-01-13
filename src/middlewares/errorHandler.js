'use strict'

const logger = require('../configs/logger')

const errorHandler = (err, req, res, next) => {
  logger.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    body: req.body,
    params: req.params,
  })

  let statusCode = err.statusCode || 500
  let message = err.message || 'Internal Server Error'
  let code = err.code || 'INTERNAL_ERROR'

  // Handle MongoDB Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400
    code = 'VALIDATION_ERROR'
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ')
  }

  // Handle MongoDB Duplicate Key Error (E11000)
  if (err.code === 11000) {
    statusCode = 409
    code = 'DUPLICATE_ERROR'

    // Extract field name from error message
    const field = Object.keys(err.keyPattern)[0]
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`
  }

  // Handle MongoDB Cast Error (invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = 400
    code = 'INVALID_ID'
    message = `Invalid ${err.path}: ${err.value}`
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401
    code = 'INVALID_TOKEN'
    message = 'Invalid token. Please login again.'
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401
    code = 'EXPIRED_TOKEN'
    message = 'Token expired. Please login again.'
  }

  // Response
  const response = {
    success: false,
    code,
    message,
  }

  // Add stack trace to response in development environment
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack
    response.error = err
  }

  res.status(statusCode).json(response)
}

module.exports = errorHandler
