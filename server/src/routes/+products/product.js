const express = require("express");
const router = express.Router();

const productController = require("../../controllers/+products/product");

router.post(
  "/add",
  productController.validateAddProduct,
  productController.addProduct
);
router.put("/update/:id", productController.updateProduct);
router.get("/get/:id", productController.getProductDetails);
router.get("/get", productController.getProducts);
router.delete("/delete/:id", productController.deleteProduct);

module.exports = { routes: router };
