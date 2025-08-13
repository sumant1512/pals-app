const express = require("express");
const router = express.Router();

const productController = require("./../controllers/product");

router.post("/add",productController.validateAddProduct , productController.addProduct);
router.put("/update/:id", productController.updateProduct);
router.get("/get", productController.getProducts);
router.delete("/delete/:id", productController.deleteProduct);

module.exports = { routes: router };
