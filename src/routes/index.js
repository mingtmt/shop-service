'use strict'

const express = require('express')
const router = express.Router()
const authRouter = require('./auth')
const usersRouter = require('./users')
const productRouter = require('./product')

router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/products', productRouter)

module.exports = router
