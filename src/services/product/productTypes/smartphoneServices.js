'use strict'

const Product = require('../../../models/product')
const { Smartphone } = require('../../../models/electronic')
const ProductService = require('../productService')
const { updateProductById } = require('../../../repositories/product')
const { removeUndefined, updateNestedObjectParser } = require('../../../utils')

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

  async updateProduct(id) {
    console.log(this)
    const payload = removeUndefined(this)
    console.log(payload)

    if (payload.attributes) {
      await updateProductById({
        id,
        payload: updateNestedObjectParser(payload.attributes),
        model: Smartphone,
      })
    }

    const updatedProduct = await super.updateProduct({
      id,
      payload: updateNestedObjectParser(payload),
    })
    return await Product.findById(updatedProduct._id)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .populate('attributes', 'os simType displayTechnology')
  }
}

module.exports = SmartphoneService
