'use strict'

const UsersService = require('../services/users')

class UsersController {
  register = async (req, res, next) => {
    try {
      const user = req.body
      const savedUser = await UsersService.createUser(user)
      res.status(201).json(savedUser)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UsersController()
