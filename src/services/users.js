'use strict'

const User = require('../models/user')
const { BadRequestError, NotFoundError, ConflictError } = require('../core/errorResponse')

class UsersService {
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

  static createUser = async (userData) => {
    if (!userData || typeof userData !== 'object') {
      throw new BadRequestError({ message: 'Invalid user data' })
    }

    const { name, email, password } = userData

    if (!name || !email || !password) {
      throw new BadRequestError({ message: 'Name, email and password are required' })
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      throw new ConflictError({
        message: 'Email already exists',
        errorCode: 'EMAIL_DUPLICATE',
        metadata: {
          email: userData.email,
        },
      })
    }

    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
    })

    const savedUser = await newUser.save()
    return savedUser
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

module.exports = UsersService
