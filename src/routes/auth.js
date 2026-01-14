'use strict'

const express = require('express')
const router = express.Router()
const asyncHandler = require('../utils/asyncHandler')
const authController = require('../controllers/auth')
const { protect } = require('../middlewares/auth')

router.post('/register', asyncHandler(authController.register))
router.post('/login', asyncHandler(authController.login))
router.post('/refresh-token', asyncHandler(authController.refreshToken))

router.post('/logout', protect, asyncHandler(authController.logout))
router.get('/me', protect, asyncHandler(authController.getCurrentUser))

module.exports = router
