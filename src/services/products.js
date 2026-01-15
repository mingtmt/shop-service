'use strict'

const { Product, Clothing, Electronic, Furniture } = require('../models/product')
const { BadRequestError } = require('../core/errorResponse')

class ProductFactory {
  static productRegistry = {}

  static registerProductType(category, classRef) {
    ProductFactory.productRegistry[category] = classRef
  }

  static createProduct(category, payload) {
    const productClass = ProductFactory.productRegistry[category]

    if (!productClass) {
      throw new BadRequestError({ message: 'Invalid product category' })
    }

    return new productClass(payload).createProduct()

    // switch (category) {
    //   case 'electronic':
    //     return new ElectronicService(payload).createProduct()
    //   case 'clothing':
    //     return new ClothingService(payload).createProduct()
    //   default:
    //     throw new BadRequestError({ message: 'Invalid product type' })
    // }
  }
}

class ProductsService {
  constructor({ name, description, price, image, category, attributes }) {
    this.name = name
    this.description = description
    this.price = price
    this.image = image
    this.category = category
    this.attributes = attributes
  }

  async createProduct() {
    return await Product.create(this)
  }
}

class ClothingService extends ProductsService {
  async createProduct() {
    const newClothing = await Clothing.create(this.attributes)

    if (!newClothing) {
      throw new BadRequestError({ message: 'Invalid clothing data' })
    }

    const newProduct = await super.createProduct()

    if (!newProduct) {
      throw new BadRequestError({ message: 'Invalid product data' })
    }

    return newProduct
  }
}

const ElectronicService = class ElectronicService extends ProductsService {
  async createProduct() {
    const newElectronic = await Electronic.create(this.attributes)

    if (!newElectronic) {
      throw new BadRequestError({ message: 'Invalid electronic data' })
    }

    const newProduct = await super.createProduct()

    if (!newProduct) {
      throw new BadRequestError({ message: 'Invalid product data' })
    }

    return newProduct
  }
}

const FurnitureService = class FurnitureService extends ProductsService {
  async createProduct() {
    const newFurniture = await Furniture.create(this.attributes)

    if (!newFurniture) {
      throw new BadRequestError({ message: 'Invalid furniture data' })
    }

    const newProduct = await super.createProduct()

    if (!newProduct) {
      throw new BadRequestError({ message: 'Invalid product data' })
    }

    return newProduct
  }
}

// register product types
ProductFactory.registerProductType('electronic', ElectronicService)
ProductFactory.registerProductType('clothing', ClothingService)
ProductFactory.registerProductType('furniture', FurnitureService)

module.exports = ProductFactory
