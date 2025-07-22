var express = require("express");
const router = express.Router();

const cartController = require("../../controllers/+user/cart");

router.get("/my-cart/:userId", cartController.getMyCart);
router.put(
  "/update-cart-item/:cartItemId",
  cartController.updateCartItemQuantity
);
router.post("/add", cartController.cart);
router.delete("/:userId", cartController.deleteCart);

module.exports = { routes: router };
