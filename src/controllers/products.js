'use strict'

const ProductsService = require('../services/products')
const { Created } = require('../core/successResponse')

class ProductsController {
  createProduct = async (req, res) => {
    const product = await ProductsService.createProduct(req.body.category, req.body)

    new Created({
      message: 'Product created successfully',
      data: product,
    }).send(res)
  }
}

module.exports = new ProductsController()
