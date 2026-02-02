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

  async createSpecificProduct(product_id) {
    throw new Error("Method 'createSpecificProduct' must be implemented")
  }

  async updateProduct(id) {
    const updatedProduct = await ProductRepository.updateById({
      id,
      updateData: this.payload,
    })

    return updatedProduct
  }
}

module.exports = BaseProductFactory
