'use strict'

const express = require('express')
const router = express.Router()
const asyncHandler = require('../utils/asyncHandler')
const productsController = require('../controllers/products')
const { protect, restrictTo } = require('../middlewares/auth')

router.post('/', protect, restrictTo('admin'), asyncHandler(productsController.createProduct))

module.exports = router
