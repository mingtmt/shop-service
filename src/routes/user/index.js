'use strict'

const express = require('express')
const router = express.Router()
const asyncHandler = require('../../utils/asyncHandler')
const usersController = require('../../controllers/users')

router.post('/register', asyncHandler(usersController.createUser))
router.get('/', asyncHandler(usersController.getAllUsers))
router.get('/:id', asyncHandler(usersController.getUserById))
router.put('/:id', asyncHandler(usersController.updateUser))
router.delete('/:id', asyncHandler(usersController.deleteUser))

module.exports = router
