'use strict'

const Inventory = require('@models/inventory')

const insertInventory = async ({ productId, location = 'warehouse', stock = 0 }) => {
  return await Inventory.create({
    productId,
    location,
    stock,
  })
}

module.exports = {
  insertInventory,
}
