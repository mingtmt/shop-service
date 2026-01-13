'use strict'

const UsersService = require('../services/users')
const { OK, Created } = require('../core/successResponse')

class UsersController {
  getAllUsers = async (req, res) => {
    new OK({
      message: 'Get all users success',
      data: await UsersService.getAllUsers(),
    }).send(res)
  }

  getUserById = async (req, res) => {
    new OK({
      message: `Get user ${req.params.id} success`,
      data: await UsersService.getUserById(req.params.id),
    }).send(res)
  }

  createUser = async (req, res) => {
    new Created({
      message: 'User registered successfully',
      data: await UsersService.createUser(req.body),
    }).send(res)
  }

  updateUser = async (req, res) => {
    new OK({
      message: 'User updated successfully',
      data: await UsersService.updateUser(req.params.id, req.body),
    }).send(res)
  }

  deleteUser = async (req, res) => {
    new OK({
      message: 'User deleted successfully',
      metadata: await UsersService.deleteUser(req.params.id),
    }).send(res)
  }
}

module.exports = new UsersController()
