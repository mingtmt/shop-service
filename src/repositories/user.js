'use strict'

const User = require('@models/user')
const BaseRepository = require('./base')

class UserRepository extends BaseRepository {
  constructor() {
    super(User)
  }

  async findByEmail(email, select = '') {
    return await User.findOne({ email }).select(select)
  }
}

module.exports = new UserRepository()
