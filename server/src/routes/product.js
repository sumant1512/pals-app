const express = require("express");
const router = express.Router();

const productController = require("./../../controllers/product");

router.post("/add", productController.addProduct);
router.put("/update/:id", productController.updateProduct);
router.get("/", productController.getProducts);
router.delete("/delete/:id", productController.deleteProduct);

module.exports = { routes: router };
