'use strict'

const Product = require('@models/product')
const BaseRepository = require('./base')

class ProductRepository extends BaseRepository {
  constructor() {
    super(Product)
  }

  async findBySlug(slug, select = '') {
    return await Product.findOne({ slug }).select(select)
  }
}

module.exports = new ProductRepository()
