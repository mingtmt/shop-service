'use strict'

const User = require('../models/user')

class UsersService {
  static getAllUsers = async (filter = {}) => {
    const users = await User.find(filter)
    return users
  }

  static getUserById = async (id) => {
    const user = await User.findById(id)

    if (!user) {
      const error = new Error('User not found')
      error.statusCode = 404
      throw error
    }

    return user
  }

  static createUser = async (userData) => {
    if (!userData || typeof userData !== 'object') {
      const error = new Error('Invalid user data')
      error.statusCode = 400
      throw error
    }

    const { name, email, password } = userData

    if (!name || !email || !password) {
      const error = new Error('Name, email and password are required')
      error.statusCode = 400
      throw error
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      const error = new Error('Email already exists')
      error.statusCode = 409
      throw error
    }

    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
    })

    const savedUser = await newUser.save()
    return savedUser
  }
}

module.exports = UsersService
