'use strict'

const express = require('express')
const router = express.Router()
const usersController = require('../../controllers/users')

router.post('/register', usersController.register)
router.get('/', usersController.getAllUsers)
router.get('/:id', usersController.getUserById)

module.exports = router
