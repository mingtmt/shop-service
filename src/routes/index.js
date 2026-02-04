'use strict'

const express = require('express')
const router = express.Router()
const authRouter = require('./auth')
const usersRouter = require('./user')
const productRouter = require('./product')
const cartRouter = require('./cart')
const checkoutRouter = require('./order')

router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/products', productRouter)
router.use('/carts', cartRouter)
router.use('/checkout', checkoutRouter)

module.exports = router
