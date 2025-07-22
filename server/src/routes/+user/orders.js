var express = require("express");
const router = express.Router();

const ordersController = require("./../../controllers/+user/orders");

router.get("/my-orders/:userId", ordersController.getMyOrders);
router.post("/", ordersController.order);

module.exports = { routes: router };
