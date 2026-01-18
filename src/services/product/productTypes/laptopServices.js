'use strict'

const Product = require('../../../models/product')
const { Laptop } = require('../../../models/electronic')
const ProductService = require('../productService')

class LaptopService extends ProductService {
  async createProduct() {
    const newLaptop = await Laptop.create({
      ...this.attributes,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy,
    })

    const newProduct = await super.createProduct(newLaptop._id)

    return await Product.findById(newProduct._id)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
  }
}

module.exports = LaptopService
