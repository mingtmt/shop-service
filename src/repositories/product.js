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

  async searchProducts(keySearch) {
    const regexSearch = new RegExp(keySearch, 'i')

    return await Product.find({
      isPublished: true,
      $or: [{ name: { $regex: regexSearch } }, { slug: { $regex: regexSearch } }],
    })
      .sort({ createdAt: -1 })
      .select('name thumbnail price')
      .lean()
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

  async deleteByModel(model, id) {
    return await model.findByIdAndDelete(id)
  }

  async checkProductInCart(products) {
    return await Promise.all(
      products.map(async (product) => {
        const foundProduct = await this.findById(product.productId)
        if (foundProduct) {
          return {
            ...product,
            price: foundProduct.price,
          }
        }
      }),
    )
  }
}

module.exports = new ProductRepository()
