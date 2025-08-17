const jwt = require("jsonwebtoken");
const Session = require("../models/Session");
const User = require("../models/User");
const AUTH_SECRET_KEY = "palsshop!123";

const authorize = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized", status: false });

  const token = getToken(authHeader);

  try {
    const decoded = jwt.verify(token, AUTH_SECRET_KEY);
    const session = await Session.findOne({ token });

    if (!session)
      return res.status(401).json({
        message: "Session expired. Please login to continue.",
        status: false,
      });

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token", status: false });
  }
};

const adminAuthorize = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized", status: false });

  const token = getToken(authHeader);

  try {
    const decoded = jwt.verify(token, AUTH_SECRET_KEY);
    const session = await Session.findOne({ token });

    if (!session)
      return res
        .status(401)
        .json({
          message: "Session expired. Please login to continue.",
          status: false,
        });

    req.user = decoded;

    const user = await User.findOne({ _id: req.user.id });

    if (user.userType !== "Admin") {
      return res.status(403).json({
        message: "Access denied. Contact administrator.",
        status: false,
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token", status: false });
  }
};

const getToken = (bearerToekn) => {
  return bearerToekn.split(" ")[1];
};

module.exports = {
  authorize: authorize,
  adminAuthorize: adminAuthorize,
};
