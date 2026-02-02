'use strict'

const express = require('express')
const router = express.Router()
const asyncHandler = require('@utils/asyncHandler')
const productController = require('@controllers/product')
const { protect, restrictTo } = require('@middlewares/auth')
const setAuditFields = require('@middlewares/setAuditFields')
const uploadImage = require('@middlewares/uploadImage')

// guest
router.get('/', asyncHandler(productController.getAllProducts))
router.get('/:slug', asyncHandler(productController.getProductBySlug))
router.get('/search/:keySearch', asyncHandler(productController.searchProducts))

//user
router.use(protect)

// admin
router.use(restrictTo('admin'))
router.post(
  '/',
  uploadImage.single('thumbnail'),
  setAuditFields,
  asyncHandler(productController.createProduct),
)
router.patch('/:id', setAuditFields, asyncHandler(productController.updateProduct))
router.delete('/:id', asyncHandler(productController.deleteProduct))

module.exports = router
