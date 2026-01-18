'use strict'

const Product = require('../../../models/product')
const { Smartphone } = require('../../../models/electronic')
const ProductService = require('../productService')

class SmartphoneService extends ProductService {
  async createProduct() {
    const newSmartphone = await Smartphone.create({
      ...this.attributes,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy,
    })

    const newProduct = await super.createProduct(newSmartphone._id)

    return await Product.findById(newProduct._id)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .populate('attributes', 'os simType displayTechnology')
  }
}

module.exports = SmartphoneService
