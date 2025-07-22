var express = require("express");
const router = express.Router();

const fanDeckController = require("../../controllers/+open/fan-deck");

router.post("/generate-fan-deck", fanDeckController.generateFanDecks);

module.exports = { routes: router };
