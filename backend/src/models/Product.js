import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      default: 'general',
    },
    externalId: {
      type: String,
      index: true,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', productSchema);

