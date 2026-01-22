'use strict'

const ProductFactory = require('../services/product/productFactory')
const { OK, Created } = require('../core/successResponse')

class ProductController {
  createProduct = async (req, res) => {
    const thumbUrl = req.file ? req.file.path : null

    const payload = {
      ...req.body,
      thumbnail: thumbUrl,
    }

    const product = await ProductFactory.createProduct(req.body.category, payload)

    req.fileProcessed = true

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
    const { updatedBy } = req.body
    const product = await ProductFactory.publishProduct({ id: req.params.id, updatedBy })

    new OK({
      message: 'Product published successfully',
      data: product,
    }).send(res)
  }

  unPublishProduct = async (req, res) => {
    const { updatedBy } = req.body
    const product = await ProductFactory.unPublishProduct({ id: req.params.id, updatedBy })

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

  getAllProducts = async (req, res) => {
    const products = await ProductFactory.getAllProducts(req.query)

    new OK({
      message: 'Get all products successfully',
      data: products,
    }).send(res)
  }

  getProductById = async (req, res) => {
    const product = await ProductFactory.getProductById(req.params.id)

    new OK({
      message: 'Get product by id successfully',
      data: product,
    }).send(res)
  }

  updateProduct = async (req, res) => {
    const product = await ProductFactory.updateProduct({ id: req.params.id, payload: req.body })

    new OK({
      message: 'Product updated successfully',
      data: product,
    }).send(res)
  }
}

module.exports = new ProductController()
