'use strict'

const Discount = require('@models/discount')
const { getUnSelectData, getSelectData } = require('@utils')

const getAllDiscountCodeSelect = async ({ limit, page, sort, filter, select }) => {
  const skip = (page - 1) * limit
  const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
  const documents = await Discount.find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(getSelectData(select))

  return documents
}

const getAllDiscountCodeUnSelect = async ({ limit, page, sort, filter, unSelect }) => {
  const skip = (page - 1) * limit
  const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
  const documents = await Discount.find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(getUnSelectData(unSelect))

  return documents
}

module.exports = {
  getAllDiscountCodeSelect,
  getAllDiscountCodeUnSelect,
}
