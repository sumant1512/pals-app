const { body, validationResult } = require("express-validator");
const { ERROR_500 } = require("./../utils/constant");
const ProductModel = require("../models/Product");

const validateAddProduct = [
  body("productName").notEmpty().withMessage("Product name is required."),
  body("productType").notEmpty().withMessage("Product type is required."),
  body("image").notEmpty().withMessage("Product Image is required."),
  body("pigmentPrice")
    .isInt()
    .withMessage("Pigment Price must be a positive number."),
];

const addProduct = async (req, res, next) => {
  // Validation of product
  const validationRes = await validationResult(req);

  if (!validationRes.isEmpty()) {
    return res.status(400).send({ errors: validationRes.array() });
  }

  try {
    // Creating product in database
    ProductModel.create({
      productName: req.body.productName,
      productType: req.body.productType,
      image: req.body.image,
      pigmentPrice: req.body.pigmentPrice,
      isShadeEnabled: req.body.isShadeEnabled,
    })
      .then(async (product) => {
        // Response when product is added
        return res.status(200).json({
          message: "Product added.",
          status: true,
        });
      })
      .catch((error) => res.status(402).send({ error: error, status: false })); // Response when error while adding product to DB
  } catch (error) {
    // Exception error
    return res.status(500).send({ error: ERROR_500, status: false});
  }
};

const updateProduct = async (req, res, next) => {
  const productId = req.params.id;
  const updatedData = req.body;
  if (!productId) {
    return res.status(404).json({ message: "Product not found.", status: false });
  }
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true, runValidators: true } // Options: return the updated document and validate
    );

    if (updatedProduct) {
      return res.status(200).json({
        message: "Product updated successfully.",
        product: updatedProduct,
        status: true
      });
    } else {
      return res.status(404).json({ message: "Product not found.", status: false });
    }
  } catch (error) {
    // Exception error
    return res.status(500).send({ error: ERROR_500, status: false});
  }
};

const getProducts = async (req, res, next) => {
  try {
    // Reading all the products
    const products = await ProductModel.find();
    if (products) {
      // Sending Products
      return res.status(200).send({ products: products, status: true });
    } else {
      // No Products found
      return res.status(404).send({ message: "No Products Available.", status: true });
    }
  } catch (error) {
    // Exception error
    return res.status(500).send({ error: error, status: false});
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    // Reading product id from params
    const productId = req.params.id;
    if (!productId) {
      // Response when product id is missing
      return res.status(404).json({ error: "Missing Product Id." });
    }

    const deletedProduct = await ProductModel.findByIdAndDelete(productId);
    if (deletedProduct) {
      res.status(200).json({
        message: "Product deleted successfully.",
        product: deletedProduct,
        status: true
      });
    } else {
      res.status(404).json({ message: "Product not available.", status: true });
    }
  } catch (error) {
    // Exception error
    res.status(500).send({ error: ERROR_500, status: false});
  }
};

module.exports = {
  addProduct,
  validateAddProduct,
  updateProduct,
  getProducts,
  deleteProduct,
};
