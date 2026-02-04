'use strict'

const Order = require('@models/order')
const BaseRepository = require('./base')

class OrderRepository extends BaseRepository {
  constructor() {
    super(Order)
  }
}

module.exports = new OrderRepository()
