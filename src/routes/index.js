'use strict'

const express = require('express')
const router = express.Router()
const authRouter = require('./auth')
const usersRouter = require('./user')
const productRouter = require('./product')
const cartRouter = require('./cart')

router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/products', productRouter)
router.use('/carts', cartRouter)

module.exports = router
