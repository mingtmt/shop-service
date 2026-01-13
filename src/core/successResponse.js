'use strict'

const { StatusCode } = require('./constants')

class SuccessResponse {
  constructor({ message, statusCode, data }) {
    this.message = message
    this.statusCode = statusCode
    this.data = data
  }

  send(res, headers = {}) {
    return res.status(this.statusCode).json(this)
  }
}

class OK extends SuccessResponse {
  constructor({ message, data }) {
    super({ message, statusCode: StatusCode.OK, data })
  }
}

class Created extends SuccessResponse {
  constructor({ message, data }) {
    super({ message, statusCode: StatusCode.CREATED, data })
  }
}

module.exports = {
  OK,
  Created,
}
