var express = require("express");
const router = express.Router();

const dealerController = require("../../controllers/+user/dealer");

router.post("/add-dealer", dealerController.addDealer);
router.get("/get-dealers", dealerController.getDealers);
router.get("/get-dealer-ledger", dealerController.getDealersLedger);
router.put(
  "/redeem-request/:transactionId",
  dealerController.decideRedeemRequest
);

module.exports = { routes: router };
