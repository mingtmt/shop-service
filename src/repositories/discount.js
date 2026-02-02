'use strict'

const Discount = require('@models/discount')
const BaseRepository = require('./base')

class DiscountRepository extends BaseRepository {
  constructor() {
    super(Discount)
  }

  async findByCode(code, select = '') {
    return await Discount.findOne({ code }).select(select)
  }
}

module.exports = new DiscountRepository()
