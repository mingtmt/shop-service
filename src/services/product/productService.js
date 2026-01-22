'use strict'

const Product = require('@models/product')
const { updateProductById } = require('@repositories/product')
const { insertInventory } = require('@repositories/inventory')

class ProductService {
  constructor({
    name,
    description,
    price,
    thumbnail,
    stock,
    category,
    attributes,
    createdBy,
    updatedBy,
  }) {
    this.name = name
    this.description = description
    this.price = price
    this.thumbnail = thumbnail
    this.stock = stock
    this.category = category
    this.attributes = attributes
    this.createdBy = createdBy
    this.updatedBy = updatedBy
  }

  async createProduct(productId) {
    const newProduct = await Product.create({
      ...this,
      _id: productId,
    })

    if (newProduct) {
      await insertInventory({ productId: newProduct._id, stock: this.quantity })
    }

    return newProduct
  }

  async updateProduct({ id, payload }) {
    return await updateProductById({ id, payload, model: Product })
  }
}

module.exports = ProductService
