const jwt = require("jsonwebtoken");
const generateOTP = require("../../utils/otp-generator");
const { sendOtpEmail } = require("./../../utils/email");

const User = require("../../models/User");
const Session = require("../../models/Session");
const { ERROR_500 } = require("./../../utils/constant");
const AUTH_SECRET_KEY = "palsshop!123";

const sendOtp = async (req, res, next) => {
  const { mobile } = req.body;

  if (!mobile) {
    return res
      .status(400)
      .json({ message: "Mobile number is required.", status: false });
  }

  try {
    // Searching user in db
    const user = await User.findOne({ mobile });
    if (user) {
      const loginOtp = await generateOTP(6);

      try {
        if (user?.email) {
          await sendOtpEmail(user.email, "OTP from PALS' PAINT", loginOtp);
        }
        user.otp = loginOtp;
        await user.save();

        return res.json({
          message: "Otp Sent to you registered email and mobile number.",
          userType: user.userType,
          status: true,
        });
      } catch (err) {
        console.error(err);
        user.otp = null;
        await user.save();
        return res.status(500).json({ success: false, error: err.message });
      }
    }

    return res.status(404).json({
      message: "User not registered.",
      status: false,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error, status: true });
  }
};

const verifyOtp = async (req, res, next) => {
  const { mobile, otp } = req.body;

  if (!mobile || !otp) {
    return res
      .status(400)
      .json({ message: "Mobile and Otp is required.", status: false });
  }

  try {
    // Searching user in db
    const user = await User.findOne({ mobile });

    // Checking user and verifying OTP
    if (!user || user.otp !== otp) {
      // Response when invalid credentials.
      return res
        .status(400)
        .json({ message: "Invalid Mobile or OTP.", status: false });
    }

    const data = {
      id: user.id,
    };

    const authToken = await jwt.sign(data, AUTH_SECRET_KEY);

    await Session.create({
      userId: user._id,
      token: authToken,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    });

    user.otp = null;
    await user.save();

    // Response when user logged in.
    res
      .status(200)
      .json({ message: "User Logged in.", authToken: authToken, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error, status: false });
  }
};

const userInfo = async (req, res, next) => {
  try {
    // Ensure user ID is present from middleware
    if (!req.user || !req.user.id) {
      return res.status(400).json({
        message: "User authentication failed. Missing user ID. Contact Admin.",
        status: false,
      });
    }

    const userInfo = await User.findById(req.user.id);

    // Check if user exists
    if (!userInfo) {
      return res.status(404).json({
        message: "User not found. Contact Admin.",
        status: false,
      });
    }

    // Build user data
    const userData = {
      name: userInfo.name,
      mobile: userInfo.mobile,
      userType: userInfo.userType,
      totalCredit: userInfo.totalCredit,
      totalDebit: userInfo.totalDebit,
      availableCredit: userInfo.availableCredit,
      lockedCredit: userInfo?.lockedCredit,
      shop: userInfo.shop,
      address: userInfo.address,
      pin: userInfo.pin,
      city: userInfo.city,
      state: userInfo.state,
    };

    return res.status(200).json({
      message: "User info fetched successfully.",
      data: userData,
      status: true,
    });
  } catch (error) {
    console.error("Internal server error in userInfo:", error);
    return res.status(500).json({
      message: "Internal server error. Please try again later.",
      status: false,
    });
  }
};

const logout = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header is provided
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided", status: false });
    }

    const token = authHeader.split(" ")[1];

    // Delete the session from DB
    const result = await Session.deleteOne({ token });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Session not found or already logged out",
        status: false,
      });
    }

    return res.status(200).json({ message: "Logout successful", status: true });
  } catch (error) {
    console.error("Logout error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: false });
  }
};

const isAuthenticated = (req, res, next) => {
  res.send({ message: "Token is valid!", userId: req.userData });
};

module.exports = {
  sendOtp: sendOtp,
  verifyOtp: verifyOtp,
  userInfo: userInfo,
  logout: logout,
  isAuthenticated: isAuthenticated,
};
