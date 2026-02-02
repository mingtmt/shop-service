'use strict'

const ProductFactoryResolver = require('./product.factory')
const ProductRepository = require('@repositories/product_v2')
const { NotFoundError } = require('@core/errorResponse')

class ProductService {
  static async getAllProducts(query) {
    const { page, limit, sort, ...filter } = query
    return await ProductRepository.findAll({
      filter,
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 50,
      sort: sort || 'createdAt',
      select: 'name price thumbnail',
    })
  }

  static async getProductById(id) {
    const product = await ProductRepository.findById(id)

    if (!product) {
      throw new NotFoundError({ message: 'Product not found' })
    }

    return product
  }

  static async getProductBySlug(slug) {
    const product = await ProductRepository.findBySlug(slug)

    if (!product) {
      throw new NotFoundError({ message: 'Product not found' })
    }

    return product
  }

  static async createProduct(payload) {
    const type = payload.category
    return await ProductFactoryResolver.createProduct(type, payload)
  }

  static async updateProduct(id, payload) {
    const product = await ProductRepository.findById(id)
    if (!product) {
      throw new NotFoundError({ message: 'Product not found' })
    }

    const type = payload.category
    return await ProductFactoryResolver.updateProduct(type, id, payload)
  }
}

module.exports = ProductService
