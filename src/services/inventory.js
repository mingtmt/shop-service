'use strict'

const InventoryRepository = require('@repositories/inventory')
const ProductRepository = require('@services/product')
const { NotFoundError } = require('@core/errorResponse')

class InventoryService {
  static async insertInventory({ productId, location, stock }) {
    return await InventoryRepository.insertInventory({
      productId,
      location,
      stock,
    })
  }

  static async addStockToInventory({ productId, location, stock }) {
    const product = await ProductRepository.findById(productId)
    if (!product) {
      throw new NotFoundError({ message: 'Product not found' })
    }

    return await InventoryRepository.addStockToInventory({
      productId,
      location,
      stock,
    })
  }
}

module.exports = InventoryService
