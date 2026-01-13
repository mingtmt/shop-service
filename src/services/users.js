'use strict'

const User = require('../models/user')
const { BadRequestError, NotFoundError, ConflictError } = require('../core/errors')

class UsersService {
  static getAllUsers = async (filter = {}) => {
    const users = await User.find(filter).lean()
    return users
  }

  static getUserById = async (id) => {
    const user = await User.findById(id).lean()

    if (!user) {
      throw new NotFoundError('User not found')
    }

    return user
  }

  static createUser = async (userData) => {
    if (!userData || typeof userData !== 'object') {
      throw new BadRequestError('Invalid user data')
    }

    const { name, email, password } = userData

    if (!name || !email || !password) {
      throw new BadRequestError('Name, email and password are required')
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      throw new ConflictError('Email already exists')
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
      throw new BadRequestError('Invalid update data')
    }

    if (updateData.password) {
      throw new BadRequestError('Use changePassword method to update password')
    }

    const user = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true },
    ).lean()

    if (!user) throw new NotFoundError('User not found')

    return user
  }

  static deleteUser = async (id) => {
    const user = await User.findByIdAndDelete(id)

    if (!user) throw new NotFoundError('User not found')

    return { message: 'User deleted successfully' }
  }
}

module.exports = UsersService
