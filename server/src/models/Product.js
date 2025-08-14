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
  price: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  isShadeEnabled: {
    type: Boolean,
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
  },
  { collection: "Product" }
);

const Product = mongoose.model("Product", ProductSchema);
Product.createIndexes();
module.exports = Product;

