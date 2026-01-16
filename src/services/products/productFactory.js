'use strict'

const productTypes = require('./productTypes')
const { BadRequestError } = require('../../core/errorResponse')

class ProductFactory {
  static createProduct(category, payload) {
    const productClass = productTypes[category]
    if (!productClass) throw new BadRequestError('Invalid Category')

    return new productClass(payload).createProduct()
  }
}

module.exports = ProductFactory
