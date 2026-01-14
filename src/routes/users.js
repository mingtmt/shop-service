'use strict'

const express = require('express')
const router = express.Router()
const asyncHandler = require('../utils/asyncHandler')
const usersController = require('../controllers/users')
const { protect, restrictTo } = require('../middlewares/auth')

router.use(protect)

router.get('/', restrictTo('admin'), asyncHandler(usersController.getAllUsers))
router.get('/:id', asyncHandler(usersController.getUserById))
router.patch('/:id', asyncHandler(usersController.updateUser))
router.delete('/:id', restrictTo('admin'), asyncHandler(usersController.deleteUser))

module.exports = router
