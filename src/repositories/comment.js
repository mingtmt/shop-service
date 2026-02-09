'use strict'

const comment = require('@models/comment')
const BaseRepository = require('./base')

class CommentRepository extends BaseRepository {
  constructor() {
    super(comment)
  }

  async maxRightValue(productId) {
    return await comment.findOne(
      {
        productId: productId,
      },
      'right',
      { sort: { right: -1 } },
    )
  }

  async updateMany(filter, payload) {
    return await comment.updateMany(filter, payload)
  }
}

module.exports = new CommentRepository()
