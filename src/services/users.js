'use strict'

const bcrypt = require('bcryptjs')
const logger = require('../configs/logger')
const User = require('../models/user')

class UsersService {
  static getAllUsers = async () => {
    try {
      const users = await User.find({})
      return users
    } catch (error) {
      logger.error(`Error getting all users: ${error}`)
      throw new Error('Error getting all users')
    }
  }

  static getUserById = async (id) => {
    try {
      const user = await User.findById(id)
      return user
    } catch (error) {
      logger.error(`Error getting user by id: ${error}`)
      throw new Error('Error getting user by id')
    }
  }

  static createUser = async (user) => {
    const { name, email, password } = user

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    try {
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      })

      const savedUser = await newUser.save()
      return savedUser
    } catch (error) {
      logger.error(`Error creating user: ${error}`)
      throw new Error('Error creating user')
    }
  }
}

module.exports = UsersService
