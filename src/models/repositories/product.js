'use strict'

const Product = require('../product')

const queryProducts = async ({ query, limit, skip }) => {
  return await Product.find(query)
    .populate('createdBy', 'name email')
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit)
    .exec()
}

const publishProduct = async (id, updatedBy) => {
  return await Product.findByIdAndUpdate(id, {
    updatedBy: updatedBy,
    isDraft: false,
    isPublished: true,
  })
}

const unPublishProduct = async (id, updatedBy) => {
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

module.exports = {
  queryProducts,
  publishProduct,
  unPublishProduct,
  searchProducts,
}
