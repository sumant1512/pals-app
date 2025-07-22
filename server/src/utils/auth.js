const jwt = require("jsonwebtoken");
const Session = require("../models/Session");
const AUTH_SECRET_KEY = "palsshop!123";

const authorize = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, AUTH_SECRET_KEY);
    const session = await Session.findOne({ token });

    if (!session) return res.status(401).json({ message: "Session expired" });

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = {
  authorize: authorize,
};
