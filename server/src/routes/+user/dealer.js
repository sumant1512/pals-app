var express = require("express");
const router = express.Router();

const dealerController = require("../../controllers/+user/dealer");

router.post("/add", dealerController.addDealer);
router.get("/get", dealerController.getDealers);
router.get("/get-ledger", dealerController.getDealersLedger);
router.put(
  "/redeem-request/:transactionId",
  dealerController.decideRedeemRequest
);

module.exports = { routes: router };
