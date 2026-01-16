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

module.exports = router
