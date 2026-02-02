'use strict'

const ProductFactory = require('./productFactory')
const ProductRepository = require('@repositories/product_v2')

class ProductService {
  static async getAllProducts(query) {
    const { page, limit, sort, ...filter } = query
    return await ProductRepository.findAll({
      filter,
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 50,
      sort: sort || 'createdAt',
      select: '-__v',
    })
  }

  static async createProduct(payload) {
    const type = payload.category
    return await ProductFactory.createProduct(type, payload)
  }
}

module.exports = ProductService
