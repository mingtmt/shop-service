'use strict'

const UsersService = require('../services/users')

class UsersController {
  getAllUsers = async (req, res, next) => {
    try {
      const users = await UsersService.getAllUsers()
      res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  }

  getUserById = async (req, res, next) => {
    try {
      const user = await UsersService.getUserById(req.params.id)
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

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
