var express = require("express");
const router = express.Router();

const couponController = require("../../controllers/+user/coupon");
const { authorize, adminAuthorize } = require("../../utils/auth");

router.get("/get", adminAuthorize, couponController.getCoupons);
router.post("/generate", adminAuthorize, couponController.generateCoupons);
router.post("/scan", authorize, couponController.scanCoupon);
router.post("/redeem", authorize, couponController.redeemPoint);
router.get(
  "/get-redeem-request",
  adminAuthorize,
  couponController.getRedeemRequest
);
router.get("/transactions", authorize, couponController.getUserTransactions);
router.post(
  "/transactions-by-admin",
  adminAuthorize,
  couponController.getUserTransactionsByAdmin
);

module.exports = { routes: router };
