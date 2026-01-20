'use strict'

const productTypes = require('./productTypes')
const { BadRequestError } = require('../../core/errorResponse')
const {
  queryProducts,
  publishProduct,
  unPublishProduct,
  searchProducts,
  getAllProducts,
  getProductById,
} = require('../../models/repositories/product')

class ProductFactory {
  static createProduct = async (category, payload) => {
    const productClass = productTypes[category]
    if (!productClass) throw new BadRequestError('Invalid Category')

    return new productClass(payload).createProduct()
  }

  static updateProduct = async ({ id, payload }) => {
    const productClass = productTypes[payload.category]
    if (!productClass) throw new BadRequestError('Invalid Category')

    return new productClass(payload).updateProduct(id)
  }

  static getAllDraftProducts = async ({ limit = 50, skip = 0 }) => {
    const query = { isDraft: true, isPublished: false }

    return await queryProducts({ query, limit, skip })
  }

  static getAllPublishedProducts = async ({ limit = 50, skip = 0 }) => {
    const query = { isDraft: false, isPublished: true }

    return await queryProducts({ query, limit, skip })
  }

  static publishProduct = async ({ id, updatedBy }) => {
    return await publishProduct({ id, updatedBy })
  }

  static unPublishProduct = async ({ id, updatedBy }) => {
    return await unPublishProduct({ id, updatedBy })
  }

  static searchProducts = async ({ keySearch }) => {
    return await searchProducts({ keySearch })
  }

  static getAllProducts = async ({
    limit = 50,
    sort = 'ctime',
    page = 1,
    filter = { isPublished: true },
  }) => {
    return await getAllProducts({ limit, sort, page, filter, select: ['name', 'price', 'thumb'] })
  }

  static getProductById = async (id) => {
    return await getProductById({ id, unSelect: ['__v'] })
  }
}

module.exports = ProductFactory
