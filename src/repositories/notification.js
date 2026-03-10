'use strict'

const notification = require('@models/notification')
const BaseRepository = require('./base')

class NotificationRepository extends BaseRepository {
  constructor() {
    super(notification)
  }
}

module.exports = new NotificationRepository()
