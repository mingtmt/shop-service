'use strict'

const { StatusCode, ErrorCode } = require('./constants')

class ErrorResponse extends Error {
  constructor(message, statusCode, errorCode) {
    super(message)
    this.statusCode = statusCode
    this.errorCode = errorCode
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

class BadRequestError extends ErrorResponse {
  constructor(message = 'Bad Request', errorCode = ErrorCode.BAD_REQUEST) {
    super(message, StatusCode.BAD_REQUEST, errorCode)
  }
}

class UnauthorizedError extends ErrorResponse {
  constructor(message = 'Unauthorized', errorCode = ErrorCode.UNAUTHORIZED) {
    super(message, StatusCode.UNAUTHORIZED, errorCode)
  }
}

class ForbiddenError extends ErrorResponse {
  constructor(message = 'Forbidden', errorCode = ErrorCode.FORBIDDEN) {
    super(message, StatusCode.FORBIDDEN, errorCode)
  }
}

class NotFoundError extends ErrorResponse {
  constructor(message = 'Not Found', errorCode = ErrorCode.NOT_FOUND) {
    super(message, StatusCode.NOT_FOUND, errorCode)
  }
}

class ConflictError extends ErrorResponse {
  constructor(message = 'Conflict', errorCode = ErrorCode.CONFLICT) {
    super(message, StatusCode.CONFLICT, errorCode)
  }
}

class ValidationError extends ErrorResponse {
  constructor(message = 'Validation Error', errors = []) {
    super(message, StatusCode.UNPROCESSABLE_ENTITY, ErrorCode.VALIDATION_ERROR)
    this.errors = errors
  }
}

class InternalError extends ErrorResponse {
  constructor(message = 'Internal Server Error') {
    super(message, StatusCode.INTERNAL_SERVER_ERROR, ErrorCode.INTERNAL_ERROR)
  }
}

module.exports = {
  ErrorResponse,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  ValidationError,
  InternalError,
}
