'use strict'

const Product = require('@models/product')
const { getSelectData, getUnSelectData } = require('@utils')

const findProductById = async (id, select = '') => {
  return await Product.findById(id).select(select)
}

const findProductBySlug = async (slug, select = '') => {
  return await Product.findOne({ slug }).select(select)
}

const createProduct = async (payload) => {
  return await Product.create(payload)
}

const createProductDetails = async (model, payload) => {
  return await model.create(payload)
}

const queryProducts = async ({ query, limit, skip }) => {
  return await Product.find(query)
    .populate('createdBy', 'name email')
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit)
    .exec()
}

const publishProduct = async ({ id, updatedBy }) => {
  return await Product.findByIdAndUpdate(id, {
    updatedBy: updatedBy,
    isDraft: false,
    isPublished: true,
  })
}

const unPublishProduct = async ({ id, updatedBy }) => {
  return await Product.findByIdAndUpdate(id, {
    updatedBy: updatedBy,
    isDraft: true,
    isPublished: false,
  })
}

const searchProducts = async ({ keySearch }) => {
  const regexSearch = new RegExp(keySearch)
  const results = await Product.find(
    {
      isDraft: false,
      isPublished: true,
      $text: { $search: regexSearch },
    },
    {
      score: { $meta: 'textScore' },
    },
  ).sort({ score: { $meta: 'textScore' } })

  return results
}

const getAllProducts = async ({ limit, sort, page, filter, select }) => {
  const skip = (page - 1) * limit
  const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
  const products = await Product.find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(getSelectData(select))

  return products
}

const getProductById = async ({ id, unSelect }) => {
  const product = await Product.findById(id).select(getUnSelectData(unSelect))

  return product
}

const updateProductById = async ({ id, payload, model, isNew = true }) => {
  const product = await model.findByIdAndUpdate(id, payload, { new: isNew })

  return product
}

module.exports = {
  findProductById,
  findProductBySlug,
  createProduct,
  createProductDetails,
  queryProducts,
  publishProduct,
  unPublishProduct,
  searchProducts,
  getAllProducts,
  getProductById,
  updateProductById,
}
