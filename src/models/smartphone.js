'use strict'

const mongoose = require('mongoose')

const smartphoneSchema = new mongoose.Schema(
  {
    manufacturer: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
    },
    model: {
      type: String,
      required: [true, 'Model is required'],
      trim: true,
    },
    series: String,
    releaseYear: Number,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Created by is required'],
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    collection: 'smartphones',
  },
)

const Smartphone = mongoose.model('Smartphone', smartphoneSchema)

module.exports = Smartphone
