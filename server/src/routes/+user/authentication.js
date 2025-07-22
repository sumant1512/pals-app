const express = require("express");
const router = express.Router();

const authenticationController = require("./../../controllers/+user/authentication");
const { authorize } = require("./../../utils/auth");

router.post("/createUser", authenticationController.createUser);
router.post("/verifyOtp", authenticationController.verifyOtp);
router.get(
  "/isAuthenticated",
  authorize,
  authenticationController.isAuthenticated
);
router.get("/logout/:id", authorize, authenticationController.logout);

module.exports = { routes: router };
