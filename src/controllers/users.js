'use strict'

const UserService = require('@services/user')
const { OK } = require('@core/successResponse')

class UsersController {
  getAllUsers = async (req, res) => {
    const users = await UserService.getAllUsers()

    new OK({
      message: 'Get all users successfully',
      data: users,
      metadata: {
        total: users.length,
      },
    }).send(res)
  }

  getUserById = async (req, res) => {
    const user = await UserService.getUserById(req.params.id)

    new OK({
      message: 'Get user successfully',
      data: user,
    }).send(res)
  }

  updateUser = async (req, res) => {
    const updatedUser = await UserService.updateUser(req.params.id, req.body)

    new OK({
      message: 'User updated successfully',
      data: updatedUser,
    }).send(res)
  }

  deleteUser = async (req, res) => {
    await UserService.deleteUser(req.params.id)

    new OK({
      message: 'User deleted successfully',
      data: null,
    }).send(res)
  }
}

module.exports = new UsersController()
