'use strict'

const User = require('@models/user')
const { BadRequestError, NotFoundError } = require('@core/errorResponse')

class UserService {
  static getAllUsers = async (filter = {}) => {
    const users = await User.find(filter)
    return users
  }

  static getUserById = async (id) => {
    const user = await User.findById(id)

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

    const user = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true },
    )

    if (!user) throw new NotFoundError({ message: 'User not found' })

    return user
  }

  static deleteUser = async (id) => {
    const user = await User.findByIdAndDelete(id)

    if (!user) throw new NotFoundError({ message: 'User not found' })

    return { message: 'User deleted successfully' }
  }
}

module.exports = UserService
