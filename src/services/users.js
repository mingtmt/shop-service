'use strict'

const User = require('@models/user')
const { findAllUsers, findUserById, updateUserById, deleteUserById } = require('@repositories/user')
const { BadRequestError, NotFoundError } = require('@core/errorResponse')

class UserService {
  static getAllUsers = async (filter = {}) => {
    return await findAllUsers({ filter })
  }

  static getUserById = async (id) => {
    const user = await findUserById(id)

    if (!user) {
      throw new NotFoundError({ message: 'User not found' })
    }

    return user
  }

  static updateUser = async (id, updateData) => {
    if (!updateData || typeof updateData !== 'object') {
      throw new BadRequestError({ message: 'Invalid update data' })
    }

    if (updateData.password) {
      throw new BadRequestError({ message: 'Use changePassword method to update password' })
    }

    const user = await updateUserById({
      userId: id,
      updateData,
    })

    if (!user) throw new NotFoundError({ message: 'User not found' })

    return user
  }

  static deleteUser = async (id) => {
    const user = await deleteUserById(id)

    if (!user) throw new NotFoundError({ message: 'User not found' })

    return { message: 'User deleted successfully' }
  }
}

module.exports = UserService
