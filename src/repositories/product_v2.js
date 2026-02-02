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

  async createByModel(model, payload) {
    return await model.create(payload)
  }

  async updateByModel({ model, id, payload, isNew = true }) {
    return await model.findByIdAndUpdate(id, payload, {
      new: isNew,
      runValidators: true,
    })
  }
}

module.exports = new ProductRepository()
