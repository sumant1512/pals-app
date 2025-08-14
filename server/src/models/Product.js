const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    required: true,
    enum: ["Interior", "Exterior"]
  },
  image: {
    type: String,
    required: true,
  },
  isShadeEnabled: {
    type: Boolean,
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

const Product = mongoose.model("Productsssss", ProductSchema);
Product.createIndexes();
module.exports = Product;

