const express = require("express");
const router = express.Router();

const authenticationController = require("./../../controllers/+user/authentication");
const { authorize } = require("./../../utils/auth");

router.post("/sendOtp", authenticationController.sendOtp);
router.post("/verify", authenticationController.verifyOtp);
router.get("/userInfo", authorize, authenticationController.userInfo);
router.get(
  "/isAuthenticated",
  authorize,
  authenticationController.isAuthenticated
);
router.get("/logout", authorize, authenticationController.logout);

module.exports = { routes: router };
