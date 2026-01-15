'use strict'

const mongoose = require('mongoose')
// const slugify = require('slugify')

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [3, 'Name must be at least 3 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    // slug: String,
    description: {
      type: String,
      trim: true,
      minlength: [3, 'Description must be at least 3 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0.01, 'Price must be at least 0.01'],
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
      trim: true,
      minlength: [3, 'Image must be at least 3 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['electronics', 'clothing', 'books', 'toys', 'appliances'],
    },
    attributes: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'products',
  },
)

// productSchema.pre('save', function (next) {
//   this.product_slug = slugify(this.product_name, { lower: true })
//   next()
// })

const Product = mongoose.model('Product', productSchema)

// Clothing Schema
const clothingSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, 'Brand is required'],
    },
    size: String,
    material: String,
  },
  {
    timestamps: true,
    collection: 'clothing',
  },
)

const Clothing = mongoose.model('Clothing', clothingSchema)

// Electronic Schema
const electronicSchema = mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, 'Brand is required'],
    },
    model: String,
    color: String,
  },
  {
    timestamps: true,
    collection: 'electronics',
  },
)

const Electronic = mongoose.model('Electronic', electronicSchema)

// Furniture Schema
const FurnitureSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, 'Brand is required'],
    },
    size: String,
    material: String,
  },
  {
    timestamps: true,
    collection: 'furnitures',
  },
)

const Furniture = mongoose.model('Furniture', FurnitureSchema)

module.exports = {
  Product,
  Clothing,
  Electronic,
  Furniture,
}
