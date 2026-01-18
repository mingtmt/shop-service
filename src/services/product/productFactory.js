'use strict'

const productTypes = require('./productTypes')
const { BadRequestError } = require('../../core/errorResponse')
const {
  queryProducts,
  publishProduct,
  unPublishProduct,
  searchProducts,
} = require('../../models/repositories/product')

class ProductFactory {
  static createProduct(category, payload) {
    const productClass = productTypes[category]
    if (!productClass) throw new BadRequestError('Invalid Category')

    return new productClass(payload).createProduct()
  }

  static getAllDraftProducts({ limit = 50, skip = 0 }) {
    const query = { isDraft: true, isPublished: false }

    return queryProducts({ query, limit, skip })
  }

  static getAllPublishedProducts({ limit = 50, skip = 0 }) {
    const query = { isDraft: false, isPublished: true }

    return queryProducts({ query, limit, skip })
  }

  static publishProduct(id, updatedBy) {
    return publishProduct(id, updatedBy)
  }

  static unPublishProduct(id, updatedBy) {
    return unPublishProduct(id, updatedBy)
  }

  static searchProducts({ keySearch }) {
    return searchProducts({ keySearch })
  }
}

module.exports = ProductFactory
