'use strict'

const express = require('express')
const router = express.Router()
const authRouter = require('./auth')
const usersRouter = require('./user')
const productRouter = require('./product')
const cartRouter = require('./cart')
const inventoryRouter = require('./inventory')
const checkoutRouter = require('./order')
const commentRouter = require('./comment')

router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/products', productRouter)
router.use('/carts', cartRouter)
router.use('/inventories', inventoryRouter)
router.use('/checkout', checkoutRouter)
router.use('/comments', commentRouter)

module.exports = router
