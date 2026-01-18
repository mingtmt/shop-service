'use strict'

const ProductFactory = require('../services/product/productFactory')
const { OK, Created } = require('../core/successResponse')

class ProductController {
  createProduct = async (req, res) => {
    const product = await ProductFactory.createProduct(req.body.category, req.body)

    new Created({
      message: 'Product created successfully',
      data: product,
    }).send(res)
  }

  getAllDraftProducts = async (req, res) => {
    new OK({
      message: 'Get all draft products successfully',
      data: await ProductFactory.getAllDraftProducts(req.query),
      metadata: {
        limit: req.query.limit || 50,
        skip: req.query.skip || 0,
      },
    }).send(res)
  }

  getAllPublishedProducts = async (req, res) => {
    new OK({
      message: 'Get all published products successfully',
      data: await ProductFactory.getAllPublishedProducts(req.query),
      metadata: {
        limit: req.query.limit || 50,
        skip: req.query.skip || 0,
      },
    }).send(res)
  }

  publishProduct = async (req, res) => {
    const product = await ProductFactory.publishProduct(req.params.id, req.user.id)

    new OK({
      message: 'Product published successfully',
      data: product,
    }).send(res)
  }

  unPublishProduct = async (req, res) => {
    const product = await ProductFactory.unPublishProduct(req.params.id, req.user.id)

    new OK({
      message: 'Product unpublished successfully',
      data: product,
    }).send(res)
  }

  searchProducts = async (req, res) => {
    const products = await ProductFactory.searchProducts(req.params)

    new OK({
      message: 'Search products successfully',
      data: products,
    }).send(res)
  }
}

module.exports = new ProductController()
