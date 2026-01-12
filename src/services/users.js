'use strict'

const bcrypt = require('bcryptjs')
const logger = require('../configs/logger')
const User = require('../models/user')

class UsersService {
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
