'use strict'

const User = require('@models/user')

const findAllUsers = async ({
  filter = {},
  limit = 50,
  page = 1,
  sort = 'createdAt',
  select = '',
}) => {
  const skip = (Number(page) - 1) * Number(limit)
  const sortBy = sort === 'ctime' ? '_id' : sort

  return await User.find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(Number(limit))
    .select(select)
    .lean()
    .exec()
}

const findUserById = async (userId, select = '') => {
  return await User.findById(userId).select(select)
}

const findUserByEmail = async (email, select = '') => {
  return await User.findOne({ email }).select(select)
}

const createUser = async ({ name, email, password, role = 'user' }) => {
  const newUser = await User.create({
    name,
    email,
    password,
    role,
  })
  return newUser
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
  createUser,
  updateUserById,
  deleteUserById,
}
