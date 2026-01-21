'use strict'

const { BadRequestError, ConflictError, NotFoundError } = require('../../core/errorResponse')
const Discount = require('../../models/discount')
const { getAllDiscountCodeUnSelect } = require('../repositories/discount')
const { getAllProducts } = require('../repositories/product')

class DiscountService {
  static createDiscountCode = async (payload) => {
    const {
      name,
      description,
      type,
      value,
      code,
      startDate,
      endDate,
      maxUse,
      perUserLimit,
      isActive,
      minOrderValue,
      applyTo,
      productIds,
    } = payload

    if (new Date(startDate) > new Date(endDate)) {
      throw new BadRequestError({ message: 'Start date should be before end date' })
    }

    if (new Date() > new Date(startDate) || new Date() < new Date(endDate)) {
      throw new BadRequestError({ message: 'Invalid start date or end date' })
    }

    const foundDiscount = await Discount.findOne({ code })
    if (foundDiscount && foundDiscount.isActive) {
      throw new ConflictError({ message: 'Discount code already exists' })
    }

    const newDiscount = Discount.create({
      name,
      description,
      type,
      value,
      code,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      maxUse,
      perUserLimit,
      isActive,
      minOrderValue: minOrderValue || 0,
      applyTo,
      productIds: applyTo === 'all' ? [] : productIds,
    })

    return newDiscount
  }

  static getAllProductsByDiscountCode = async ({ code, limit, page }) => {
    const foundDiscount = await Discount.findOne({ code })
    if (!foundDiscount && !foundDiscount.isActive) {
      throw new NotFoundError({ message: 'Discount code not found' })
    }

    const { applyTo, productIds } = foundDiscount
    let products
    if (applyTo === 'all') {
      products = await getAllProducts({
        limit: +limit,
        page: +page,
        sort: 'ctime',
        filter: {
          isPublished: true,
        },
        select: ['name'],
      })
    } else if (applyTo === 'specific') {
      products = await getAllProducts({
        limit: +limit,
        page: +page,
        sort: 'ctime',
        filter: {
          isPublished: true,
          _id: { $in: productIds },
        },
        select: ['name'],
      })
    }

    return products
  }

  static getAllDiscountCode = async ({ limit, page }) => {
    const discounts = await getAllDiscountCodeUnSelect({
      limit: +limit,
      page: +page,
      sort: 'ctime',
      filter: {
        isActive: true,
      },
      unSelect: ['__v'],
    })

    return discounts
  }
}

module.exports = DiscountService
