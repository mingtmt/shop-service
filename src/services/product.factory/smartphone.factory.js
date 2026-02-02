'use strict'

const { Smartphone } = require('@models/electronic')
const BaseProductFactory = require('./base-product.factory')
const { removeUndefined, updateNestedObjectParser } = require('@utils')
const ProductRepository = require('@repositories/product_v2')

class SmartphoneFactory extends BaseProductFactory {
  // async createProduct() {
  //   const newProduct = await super.createProduct()

  //   if (!newProduct) throw new Error('Create Base Product Error')

  //   const { attributes } = this.payload

  //   const newSmartphone = await ProductRepository.create({
  //     _id: newProduct._id, // Quan trọng: ID trùng nhau để join bảng
  //     ...attributes,
  //   })

  //   if (!newSmartphone) {
  //     // Rollback: Nếu tạo attribute thất bại, phải xóa luôn Product cha để tránh rác DB
  //     // await ProductRepository.deleteById(newProduct._id);
  //     throw new Error('Create Smartphone Attributes Error')
  //   }

  //   return newProduct
  // }

  async createSpecificProduct(product_id) {
    // 1. Lấy attributes từ payload (đây là dữ liệu riêng cho Smartphone)
    const { product_attributes } = this.payload

    // 2. Tạo document trong Collection Smartphones
    // Kỹ thuật: Dùng chung _id với Product cha để dễ join
    const newSmartphone = await ProductRepository.createModel({
      model: Smartphone, // Truyền Model Smartphone vào
      payload: {
        ...product_attributes,
        _id: product_id, // QUAN TRỌNG: Link 1-1 bằng ID
      },
    })

    return newSmartphone
  }

  async updateProduct(id) {
    const payload = removeUndefined(this)

    if (payload.attributes) {
      await ProductRepository.updateById({
        id,
        updateData: updateNestedObjectParser(payload.attributes),
      })
    }

    const updatedProduct = await super.updateProduct(id)

    return ProductRepository.findById(updatedProduct.id, '-__v')
  }
}

module.exports = SmartphoneFactory
