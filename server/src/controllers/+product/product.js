const { body, validationResult } = require("express-validator");
const { ERROR_500 } = require("./../../utils/constant");
const Product = require("../../models/Products");

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
    Product.create({
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
        });
      })
      .catch((error) => res.json({ error })); // Response when error while adding product to DB
  } catch (error) {
    // Exception error
    return res.status(500).send(ERROR_500);
  }
};

const updateProduct = async (req, res, next) => {
  const productId = req.params.id;
  const updatedData = req.body;
  if (!productId) {
    return res.status(404).json({ message: "Product not found." });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true, runValidators: true } // Options: return the updated document and validate
    );

    if (updatedProduct) {
      return res.status(200).json({
        message: "Product updated successfully.",
        product: updatedProduct,
      });
    } else {
      return res.status(404).json({ message: "Product not found." });
    }
  } catch (error) {
    // Exception error
    return res.status(500).json(ERROR_500);
  }
};

const getProducts = async (req, res, next) => {
  try {
    // Reading all the products
    const products = await Product.find();
    if (products) {
      // Sending Products
      return res.status(200).json({ products });
    } else {
      // No Products found
      return res.status(404).json({ message: "No Products Available." });
    }
  } catch (error) {
    // Exception error
    return res.status(500).send(ERROR_500);
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

    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (deletedProduct) {
      res.status(200).json({
        message: "Product deleted successfully.",
        product: deletedProduct,
      });
    } else {
      res.status(404).json({ message: "Product not available." });
    }
  } catch (error) {
    // Exception error
    res.status(500).send(ERROR_500);
  }
};

module.exports = {
  addProduct,
  validateAddProduct,
  updateProduct,
  getProducts,
  deleteProduct,
};
