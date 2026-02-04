'use strict'

const Inventory = require('@models/inventory')
const BaseRepository = require('./base')

class InventoryRepository extends BaseRepository {
  constructor() {
    super(Inventory)
  }

  async insertInventory({ productId, location = 'warehouse', stock = 0 }) {
    return await Inventory.create({
      productId,
      location,
      stock,
    })
  }

  async addStockToInventory({ productId, location = 'warehouse', stock = 0 }) {
    const query = { productId },
      update = { $inc: { stock }, $set: { location } },
      options = { upsert: true, new: true }

    return await Inventory.findOneAndUpdate(query, update, options)
  }

  async resevationInventory({ productId, cartId, quantity }) {
    const query = {
      productId,
      stock: { $gte: quantity }, // check if stock is enough
    }

    const update = {
      $inc: { stock: -quantity }, // decrement stock
      $push: {
        reservations: {
          quantity,
          cartId,
          createOn: new Date(),
        },
      },
    }

    const options = { new: true, upsert: true }

    return await Inventory.findOneAndUpdate(query, update, options)
  }
}

module.exports = new InventoryRepository()
