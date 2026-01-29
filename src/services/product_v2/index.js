'use strict'

const ProductFactory = require('./factory')

class ProductService {
  static async createProduct(payload) {
    const type = payload.category
    return await ProductFactory.createProduct(type, payload)
  }
}

module.exports = ProductService
