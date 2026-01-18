'use strict'

const express = require('express')
const router = express.Router()
const asyncHandler = require('../utils/asyncHandler')
const productController = require('../controllers/product')
const { protect, restrictTo } = require('../middlewares/auth')
const setAuditFields = require('../middlewares/setAuditFields')

router.post(
  '/',
  protect,
  restrictTo('admin'),
  setAuditFields,
  asyncHandler(productController.createProduct),
)
router.get(
  '/drafts',
  protect,
  restrictTo('admin'),
  asyncHandler(productController.getAllDraftProducts),
)
router.get('/published', asyncHandler(productController.getAllPublishedProducts))
router.patch(
  '/publish/:id',
  protect,
  restrictTo('admin'),
  asyncHandler(productController.publishProduct),
)
router.patch(
  '/unpublish/:id',
  protect,
  restrictTo('admin'),
  asyncHandler(productController.unPublishProduct),
)
router.get('/search/:keySearch', asyncHandler(productController.searchProducts))

module.exports = router
