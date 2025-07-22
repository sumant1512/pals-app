var express = require("express");
const router = express.Router();

const productController = require("../../controllers/+open/products");

router.get("/product-list", productController.getProductList);

router.get("/product-details/:id", productController.getProductDetails);

module.exports = { routes: router };
