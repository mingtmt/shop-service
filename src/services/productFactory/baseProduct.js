'use strict'

const { createProduct } = require('@repositories/product')

class Product {
  constructor(payload) {
    this.payload = payload
  }

  async createProduct(productId) {
    const newProduct = await createProduct({
      ...this.payload,
      _id: productId,
    })

    return newProduct
  }
}

module.exports = Product
