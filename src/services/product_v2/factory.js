'use strict'

const Smartphone = require('./smartphone')

class ProductFactory {
  static productRegistry = {
    smartphone: Smartphone,
    // add new product type here
  }

  static async createProduct(type, payload) {
    const productClass = this.productRegistry[type]
    if (!productClass) throw new Error(`Invalid Product Type: ${type}`)

    return new productClass(payload).createProduct()
  }
}

module.exports = ProductFactory
