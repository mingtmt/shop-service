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

  static async createModel({ model, payload }) {
    return await model.create(payload)
  }

  static async createProductAttribute(model, id, attributes) {
    return await model.create({
      _id: id,
      ...attributes,
    })
  }
}

module.exports = new ProductRepository()
