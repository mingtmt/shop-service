'use strict'

const UsersService = require('../services/users')

class UsersController {
  async getAllUsers(req, res, next) {
    try {
      const users = await UsersService.getAllUsers()
      res.status(200).json({
        success: true,
        count: users.length,
        data: users,
      })
    } catch (error) {
      next(error)
    }
  }

  async getUserById(req, res, next) {
    try {
      const user = await UsersService.getUserById(req.params.id)
      res.status(200).json({
        success: true,
        data: user,
      })
    } catch (error) {
      next(error)
    }
  }

  async register(req, res, next) {
    try {
      const user = req.body
      const savedUser = await UsersService.createUser(user)
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: savedUser,
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UsersController()
