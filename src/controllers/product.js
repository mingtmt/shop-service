'use strict'

const ProductFactory = require('@services/product_will_remove/productFactory')
const ProductService = require('@services/product')
const { OK, Created } = require('@core/successResponse')

class ProductController {
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
    const products = await ProductService.getAllProducts(req.query)

    new OK({
      message: 'Get all products successfully',
      data: products,
      metadata: {
        limit: req.query.limit || 50,
        page: req.query.page || 1,
        total: products.length,
      },
    }).send(res)
  }

  getProductBySlug = async (req, res) => {
    const product = await ProductService.getProductBySlug(req.params.slug)

    new OK({
      message: 'Get product by slug successfully',
      data: product,
    }).send(res)
  }

  createProduct = async (req, res) => {
    const thumbUrl = req.file ? req.file.path : null

    const payload = {
      ...req.body,
      thumbnail: thumbUrl,
    }

    const product = await ProductService.createProduct(payload)

    req.fileProcessed = true

    new Created({
      message: 'Product created successfully',
      data: product,
    }).send(res)
  }

  updateProduct = async (req, res) => {
    const product = await ProductService.updateProduct(req.params.id, req.body)

    new OK({
      message: 'Product updated successfully',
      data: product,
    }).send(res)
  }
}

module.exports = new ProductController()
