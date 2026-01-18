'use strict'

const Product = require('../../models/product')

class ProductService {
  constructor({ name, description, price, thumb, category, attributes, createdBy, updatedBy }) {
    this.name = name
    this.description = description
    this.price = price
    this.thumb = thumb
    this.category = category
    this.attributes = attributes
    this.createdBy = createdBy
    this.updatedBy = updatedBy
  }

  async createProduct(productId) {
    const product = await Product.create({
      _id: productId,
      name: this.name,
      description: this.description,
      price: this.price,
      thumb: this.thumb,
      category: this.category,
      attributes: productId,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy,
    })

    return product
  }
}

module.exports = ProductService
