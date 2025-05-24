const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  ram: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
    min: 1,
  },
});

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    subcategory: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String], 
      default: [],
    },
    variants: {
      type: [variantSchema],
      required: true,
      validate: [arr => arr.length > 0, 'At least one variant is required'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
