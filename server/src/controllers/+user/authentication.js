const jwt = require("jsonwebtoken");

const connection = require("./../../utils/mysql-connection");
const generateOTP = require("../../utils/otp-generator");

const User = require("../../models/User");
const { ERROR_500 } = require("./../../utils/constant");
const AUTH_SECRET_KEY = "palsshop!123";

const createUser = async (req, res, next) => {
  const { mobile, name } = req.body;

  if (!mobile || !name) {
    return res
      .status(400)
      .json({ message: "Mobile number and Name is required." });
  }

  try {
    // Searching user in db
    const user = await User.findOne({ mobile });
    if (user) {
      return res.status(400).send("User already exists");
    }

    // Creating user in mongodb
    User.create({
      name,
      mobile,
    })
      .then(async (user) => {
        const otp = await generateOTP(6);
        user.otp = otp;
        await user.save();
        return res.json({
          message: "Otp Sent to you registered mobile number.",
          otp: otp,
        });
      }) // returning repsonse
      .catch((err) => res.json({ error: err })); // returning db error
  } catch (error) {
    console.log(error);
    res.status(500).send(ERROR_500);
  }
};

const verifyOtp = async (req, res, next) => {
  const { mobile, otp } = req.body;

  if (!mobile || !otp) {
    return res.status(400).json({ message: "Mobile and Otp is required." });
  }

  try {
    // Searching user in db
    const user = await User.findOne({ mobile });

    // Checking user and verifying OTP
    if (!user || user.otp !== otp) {
      // Response when invalid credentials.
      return res.status(400).json({ message: "Invalid Mobile or OTP." });
    }

    const data = {
      id: user.id,
    };

    const authToken = await jwt.sign(data, AUTH_SECRET_KEY);

    // Response when user logged in.
    res.status(200).json({ message: "User Logged in.", authToken: authToken });
  } catch (error) {
    console.log(error);
    res.status(500).send(ERROR_500);
  }
};

const logout = (req, res, next) => {
  const userId = req.params.id;
  const query = `UPDATE users SET authToken = NULL WHERE userId = ${userId}`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json({ message: "Logout successful" });
  });
};

const isAuthenticated = (req, res, next) => {
  res.send({ message: "Token is valid!", userId: req.userData });
};

module.exports = {
  createUser: createUser,
  verifyOtp: verifyOtp,
  logout: logout,
  isAuthenticated: isAuthenticated,
};
