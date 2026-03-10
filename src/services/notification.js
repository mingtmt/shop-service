'use strict'

const NotificationRepository = require('@repositories/notification')

class NotificationService {
  static async pushNotiToSystem({
    type = 'ORDER-001',
    senderId = 1,
    receiverId = 1,
    options = {},
  }) {
    let content

    if (type === 'ORDER-001') {
      content = 'Your order has been successfully placed'
    } else if (type === 'ORDER-002') {
      content = 'Your order has failed'
    } else if (type === 'PROMOTION-001') {
      content = 'New promotion has been added'
    } else if (type === 'SHOP-001') {
      content = 'New product has been added'
    }

    return NotificationRepository.create({
      type,
      senderId,
      receiverId,
      content,
      options,
    })
  }
}

module.exports = NotificationService
