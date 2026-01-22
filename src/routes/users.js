'use strict'

const express = require('express')
const router = express.Router()
const asyncHandler = require('@utils/asyncHandler')
const usersController = require('@controllers/users')
const { protect, restrictTo } = require('@middlewares/auth')

//user
router.use(protect)
router.get('/:id', asyncHandler(usersController.getUserById))
router.patch('/:id', asyncHandler(usersController.updateUser))

// admin
router.use(restrictTo('admin'))
router.get('/', asyncHandler(usersController.getAllUsers))
router.delete('/:id', asyncHandler(usersController.deleteUser))

module.exports = router
