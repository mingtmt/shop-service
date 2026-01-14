'use strict'

const UsersService = require('../services/users')
const { OK, Created } = require('../core/successResponse')

class UsersController {
  getAllUsers = async (req, res) => {
    const users = await UsersService.getAllUsers()

    new OK({
      message: 'Get all users successfully',
      data: users,
      metadata: {
        total: users.length,
      },
    }).send(res)
  }

  getUserById = async (req, res) => {
    const user = await UsersService.getUserById(req.params.id)

    new OK({
      message: 'Get user successfully',
      data: user,
    }).send(res)
  }

  createUser = async (req, res) => {
    const newUser = await UsersService.createUser(req.body)

    new Created({
      message: 'User registered successfully',
      data: newUser,
    }).send(res, {
      Location: `/api/users/${newUser.id}`,
    })
  }

  updateUser = async (req, res) => {
    const updatedUser = await UsersService.updateUser(req.params.id, req.body)

    new OK({
      message: 'User updated successfully',
      data: updatedUser,
    }).send(res)
  }

  deleteUser = async (req, res) => {
    await UsersService.deleteUser(req.params.id)

    new OK({
      message: 'User deleted successfully',
      data: null,
    }).send(res)
  }
}

module.exports = new UsersController()
