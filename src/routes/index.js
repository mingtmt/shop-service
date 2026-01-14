'use strict'

const express = require('express')
const router = express.Router()
const usersRouter = require('./users')
const authRouter = require('./auth')

router.use('/auth', authRouter)
router.use('/users', usersRouter)

module.exports = router
