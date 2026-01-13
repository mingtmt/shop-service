'use strict'

const express = require('express')
const router = express.Router()
const usersController = require('../../controllers/users')

router.post('/register', usersController.register.bind(usersController))
router.get('/', usersController.getAllUsers.bind(usersController))
router.get('/:id', usersController.getUserById.bind(usersController))

module.exports = router
