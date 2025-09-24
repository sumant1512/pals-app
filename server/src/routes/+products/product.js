const express = require("express");
const router = express.Router();

const productController = require("../../controllers/+products/product");
const { adminAuthorize } = require("../../utils/auth");

router.post(
  "/add",
  adminAuthorize,
  productController.validateAddProduct,
  productController.addProduct
);
router.put("/update/:id", adminAuthorize, productController.updateProduct);
router.get("/get/:id", productController.getProductDetails);
router.get("/get", productController.getProducts);
router.get(
  "/get-all-details",
  adminAuthorize,
  productController.getAllProductDetails
);
router.delete("/delete/:id", adminAuthorize, productController.deleteProduct);

module.exports = { routes: router };
