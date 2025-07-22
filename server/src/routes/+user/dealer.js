var express = require("express");
const router = express.Router();

const dealerController = require("../../controllers/+user/dealer");

router.get("/get-dealer-ledger", dealerController.getDealersLedger);

module.exports = { routes: router };
