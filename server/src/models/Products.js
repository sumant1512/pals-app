const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  pigmentPrice: {
    type: Number,
    required: true,
    default: 5,
  },
  isShadeEnabled: {
    type: Boolean,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
    default: Date.now,
  },
});

const Product = mongoose.model("product", ProductSchema);
Product.createIndexes();
module.exports = Product;
