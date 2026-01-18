'use strict'

const mongoose = require('mongoose')

const DOCUMENT_NAME = 'Electronic'
const COLLECTION_NAME = 'electronics'

// 1. Base Electronic Schema
const electronicSchema = new mongoose.Schema(
  {
    manufacturer: { type: String, required: true }, // Apple, Samsung
    model: { type: String, required: true }, // iPhone 15 Pro
    release_year: Number,
    specs: { type: mongoose.Schema.Types.Mixed }, // sub information
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
    discriminatorKey: 'type',
  },
)

const Electronic = mongoose.model(DOCUMENT_NAME, electronicSchema)

electronicSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

// Smartphone Schema
const Smartphone = Electronic.discriminator(
  'Smartphone',
  new mongoose.Schema({
    os: { type: String, required: true }, // iOS, Android
    simType: { type: String, enum: ['nano-sim', 'esim', 'dual-sim'] },
    displayTechnology: String, // OLED, IPS
  }),
)

// Tablet Schema
const Tablet = Electronic.discriminator(
  'Tablet',
  new mongoose.Schema({
    is_wifi_only: { type: Boolean, default: true },
    screen_size: String, // 11 inch, 12.9 inch
    stylus_support: { type: Boolean, default: false },
  }),
)

// Laptop Schema
const Laptop = Electronic.discriminator(
  'Laptop',
  new mongoose.Schema({
    processor: String, // Intel i9, M3 Max
    hard_drive: String, // SSD 1TB
    ram: String, // 32GB
    keyboard_backlight: Boolean,
  }),
)

module.exports = {
  Electronic,
  Smartphone,
  Tablet,
  Laptop,
}
