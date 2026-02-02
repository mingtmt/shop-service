'use strict'

const { smartphone } = require('@models/electronic')
const BaseProductFactory = require('./base-product.factory')
const { removeUndefined, updateNestedObjectParser } = require('@utils')
const ProductRepository = require('@repositories/product_v2')

class SmartphoneFactory extends BaseProductFactory {
  async createProduct() {
    const newProduct = await super.createProduct()

    if (!newProduct) throw new Error('Create Base Product Error')

    const { attributes, createdBy, updatedBy } = this.payload
    const newSmartphonePayload = {
      _id: newProduct._id,
      ...attributes,
      createdBy,
      updatedBy,
    }

    const newSmartphone = await ProductRepository.createByModel(smartphone, newSmartphonePayload)
    if (!newSmartphone) {
      await ProductRepository.deleteById(newProduct._id)
      throw new Error('Create New Smartphone Error')
    }

    return newSmartphone
  }

  async updateProduct(id) {
    const payload = removeUndefined(this.payload)

    if (payload.attributes) {
      await ProductRepository.updateByModel({
        model: smartphone,
        id,
        payload: updateNestedObjectParser(payload.attributes),
      })
    }

    const updatedProduct = await super.updateProduct(id, updateNestedObjectParser(payload))

    return updatedProduct
  }
}

module.exports = SmartphoneFactory
