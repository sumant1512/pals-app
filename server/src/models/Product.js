const mongoose = require("mongoose");

const PackSizeSchema = new mongoose.Schema({
  mrp: { type: Number, required: true },
  size: { type: String, required: true },
  discount: { type: Number, default: 0 },
});

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productType: {
      type: String,
      required: true,
      enum: ["Interior", "Exterior", "All Rounder"],
    },
    image: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
      required: true,
    },
    packSize: { type: [PackSizeSchema], validate: (v) => v.length > 0 },
  },
  { timestamps: true, collection: "Product" }
);

const Product = mongoose.model("Product", ProductSchema);
Product.createIndexes();
module.exports = Product;
