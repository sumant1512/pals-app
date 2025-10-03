const { body, validationResult } = require("express-validator");
const { ERROR_500 } = require("./../../utils/constant");
const ProductModel = require("../../models/Product");

const validateAddProduct = [
  body("productName").notEmpty().withMessage("Product name is required."),
  body("productType").notEmpty().withMessage("Product type is required."),
  body("image").notEmpty().withMessage("Product Image is required."),
  body("shortDescription")
    .notEmpty()
    .withMessage("Product description is missing."),
  body("packSize")
    .isArray({ min: 1 })
    .withMessage("At least one pack size is required"),
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
      shortDescription: req.body.shortDescription,
      longDescription: req.body.longDescription,
      packSize: req.body.packSize,
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
    return res.status(500).send({ error: ERROR_500, status: false });
  }
};

const updateProduct = async (req, res, next) => {
  const productId = req.params.id;
  const updatedData = req.body;
  if (!productId) {
    return res
      .status(404)
      .json({ message: "Product not found.", status: false });
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
        status: true,
      });
    } else {
      return res
        .status(404)
        .json({ message: "Product not found.", status: false });
    }
  } catch (error) {
    // Exception error
    return res.status(500).send({ error: ERROR_500, status: false });
  }
};

const getAllProductDetails = async (req, res, next) => {
  try {
    // Reading all the products
    const products = await ProductModel.find();
    if (products) {
      // Sending Products
      return res.status(200).send({ products: products, status: true });
    } else {
      // No Products found
      return res
        .status(404)
        .send({ message: "No Products Available.", status: true });
    }
  } catch (error) {
    // Exception error
    return res.status(500).send({ error: error, status: false });
  }
};

const getProducts = async (req, res, next) => {
  try {
    const products = await ProductModel.find();

    if (!products || products.length === 0) {
      return res
        .status(404)
        .send({ message: "No Products Available.", status: true });
    }

    // Map products to return only required fields + priceStartingFrom
    const formattedProducts = products.map((product) => {
      let priceStartingFrom = 0;
      if (product.packSize && product.packSize.length > 0) {
        const lastPack = product.packSize[product.packSize.length - 1];
        priceStartingFrom = lastPack.mrp * (1 - (lastPack.discount || 0) / 100);
      }

      return {
        productName: product.productName,
        productType: product.productType,
        shortDescription: product.shortDescription,
        image: product.image,
        priceStartingFrom,
      };
    });

    return res.status(200).send({ products: formattedProducts, status: true });
  } catch (error) {
    return res.status(500).send({ error: error.message, status: false });
  }
};

const getProductDetails = async (req, res, next) => {
  try {
    // Reading product details
    const productId = req.params.id;
    const productDetails = await ProductModel.findById(productId).lean();
    if (productDetails) {
      // Sending Products
      return res
        .status(200)
        .send({ productDetails: productDetails, status: true });
    } else {
      // No Products found
      return res
        .status(404)
        .send({ message: "No Products Available.", status: true });
    }
  } catch (error) {
    // Exception error
    return res.status(500).send({ error: error, status: false });
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
        status: true,
      });
    } else {
      res.status(404).json({ message: "Product not available.", status: true });
    }
  } catch (error) {
    // Exception error
    res.status(500).send({ error: ERROR_500, status: false });
  }
};

module.exports = {
  addProduct,
  validateAddProduct,
  updateProduct,
  getProducts,
  getAllProductDetails,
  getProductDetails,
  deleteProduct,
};
