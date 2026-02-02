'use strict'

const ProductRepository = require('@repositories/product_v2')

class BaseProductFactory {
  constructor(payload) {
    this.payload = payload
  }

  async createProduct() {
    const newProduct = await ProductRepository.create(this.payload)

    return newProduct
  }

  async updateProduct(id, payload) {
    const updatedProduct = await ProductRepository.updateById({
      id,
      payload: payload,
    })

    return updatedProduct
  }
}

module.exports = BaseProductFactory
