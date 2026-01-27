'use strict'

const User = require('@models/user')

const findAllUsers = async ({ filter = {}, limit = 50, page, sort = 'ctime', select = '' }) => {
  const skip = (page - 1) * limit
  return await User.find(filter).sort(sort).skip(skip).limit(limit).select(select)
}

const findUserById = async (userId, select = '') => {
  return await User.findById(userId).select(select)
}

const findUserByEmail = async (email) => {
  return await User.findOne({ email })
}

const updateUserById = async ({ userId, updateData, isNew = true }) => {
  return await User.findByIdAndUpdate(userId, updateData, {
    new: isNew,
    runValidators: true,
  })
}

const deleteUserById = async (userId) => {
  return await User.findByIdAndDelete(userId)
}

module.exports = {
  findAllUsers,
  findUserById,
  findUserByEmail,
  updateUserById,
  deleteUserById,
}
