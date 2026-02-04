'use strict'

const CartRepository = require('@repositories/cart')
const ProductRepository = require('@repositories/product')
const { NotFoundError, BadRequestError } = require('@core/errorResponse')

class CheckoutService {
  static async checkoutReview({ userId, cartId, products }) {
    const foundCart = await CartRepository.findById(cartId)
    if (!foundCart) {
      throw new NotFoundError({ message: 'Cart not found' })
    }

    if (foundCart.state !== 'active') {
      throw new NotFoundError({ message: 'Cart is not active' })
    }

    const productInCart = await ProductRepository.checkProductInCart(products)
    if (!productInCart || productInCart.length === 0) {
      throw new BadRequestError('Order wrong!!!')
    }

    const totalPrice = productInCart.reduce((acc, product) => {
      return acc + product.price * product.quantity
    }, 0)

    // TODO: get ship fee
    const feeShip = 30000
    // TODO: get discount amount
    const totalDiscount = 0

    const totalCheckout = totalPrice + feeShip - totalDiscount

    return {
      productInCart,
      checkoutOrder: {
        totalPrice,
        feeShip,
        totalDiscount,
        totalCheckout,
      },
    }
  }
}

module.exports = CheckoutService
