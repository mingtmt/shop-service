'use strict'

const Product = require('@models/product')
const { Tablet } = require('@models/electronic')
const ProductService = require('../productService')

class TabletService extends ProductService {
  async createProduct() {
    const newTablet = await Tablet.create({
      ...this.attributes,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy,
    })

    const newProduct = await super.createProduct(newTablet._id)

    return await Product.findById(newProduct._id)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
  }
}

module.exports = TabletService
