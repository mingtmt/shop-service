'use strict'

const { smartphone } = require('@models/electronic')
const Product = require('./base')
const { createProductDetails } = require('@repositories/product')

class Smartphone extends Product {
  async createProduct() {
    const detailsPayload = {
      ...this.payload.attributes,
      createdBy: this.payload.createdBy,
      updatedBy: this.payload.updatedBy,
    }

    const newSmartphone = await createProductDetails(smartphone, detailsPayload)
    if (!newSmartphone) throw new Error('Create smartphone details error')

    const newProduct = await super.createProduct(newSmartphone._id)
    if (!newProduct) throw new Error('Create product base error')

    return newProduct
  }
}

module.exports = Smartphone
