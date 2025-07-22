const express = require("express");
const router = express.Router();

const {
  addProduct,
  validateAddProduct,
  updateProduct,
  getProducts,
  deleteProduct,
} = require("./../../controllers/+product/product");

router.post("/", validateAddProduct, addProduct);
router.put("/:id", updateProduct);
router.get("/", getProducts);
router.delete("/:id", deleteProduct);

module.exports = { routes: router };
