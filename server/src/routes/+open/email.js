var express = require("express");
const router = express.Router();

const emailController = require("../../controllers/+open/email");

router.post("/contact", emailController.contactUs);

module.exports = { routes: router };
