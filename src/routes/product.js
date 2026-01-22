'use strict'

const express = require('express')
const router = express.Router()
const asyncHandler = require('@utils/asyncHandler')
const productController = require('@controllers/product')
const { protect, restrictTo } = require('@middlewares/auth')
const setAuditFields = require('@middlewares/setAuditFields')
const uploadImage = require('@middlewares/uploadImage')

// guest
router.get('/search/:keySearch', asyncHandler(productController.searchProducts))
router.get('/', asyncHandler(productController.getAllProducts))
router.get('/:id', asyncHandler(productController.getProductById))

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
router.get('/drafts', asyncHandler(productController.getAllDraftProducts))
router.get('/published', asyncHandler(productController.getAllPublishedProducts))
router.patch('/publish/:id', setAuditFields, asyncHandler(productController.publishProduct))
router.patch('/unpublish/:id', setAuditFields, asyncHandler(productController.unPublishProduct))
router.patch('/:id', setAuditFields, asyncHandler(productController.updateProduct))

module.exports = router
