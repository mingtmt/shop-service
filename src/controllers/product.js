'use strict'

const ProductFactory = require('../services/product/productFactory')
const { Created } = require('../core/successResponse')

class ProductController {
  createProduct = async (req, res) => {
    const product = await ProductFactory.createProduct(req.body.category, req.body)

    new Created({
      message: 'Product created successfully',
      data: product,
    }).send(res)
  }
}

module.exports = new ProductController()
