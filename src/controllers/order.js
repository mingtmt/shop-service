'use strict'

const CheckoutService = require('@services/order')
const { OK } = require('@core/successResponse')

class CheckoutController {
  checkoutReview = async (req, res) => {
    const checkout = await CheckoutService.checkoutReview({
      userId: req.user.id,
      cartId: req.body.cartId,
      products: req.body.products,
    })

    new OK({
      message: 'Checkout review success',
      data: checkout,
    }).send(res)
  }
}

module.exports = new CheckoutController()
