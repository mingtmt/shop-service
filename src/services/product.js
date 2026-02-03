'use strict'

const ProductFactoryResolver = require('./product.factory')
const ProductRepository = require('@repositories/product')
const { NotFoundError } = require('@core/errorResponse')

class ProductService {
  static async getAllProducts(query) {
    const { page, limit, sort, ...filter } = query
    return await ProductRepository.findAll({
      filter: {
        isPublished: true,
        ...filter,
      },
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

  static async searchProducts(query) {
    const { keySearch } = query
    return await ProductRepository.searchProducts(keySearch)
  }

  static async createProduct(payload) {
    return await ProductFactoryResolver.createProduct(payload.type, payload)
  }

  static async updateProduct(id, payload) {
    const product = await ProductRepository.findById(id)
    if (!product) {
      throw new NotFoundError({ message: 'Product not found' })
    }

    return await ProductFactoryResolver.updateProduct(payload.type, id, payload)
  }

  static async deleteProduct(id, payload) {
    const product = await ProductRepository.findById(id)
    if (!product) {
      throw new NotFoundError({ message: 'Product not found' })
    }

    return await ProductFactoryResolver.deleteProduct(payload.type, id)
  }
}

module.exports = ProductService
