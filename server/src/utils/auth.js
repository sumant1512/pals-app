const jwt = require("jsonwebtoken");
const connection = require("./mysql-connection");
const AUTH_SECRET_KEY = "palsshop!123";
const config = process.env;

const authorize = async (req, res, next) => {
  // Reading auth token from headers
  const authToken = req.headers["auth-token"];

  // Checing if auth token exists
  if (!authToken) {
    return res.status(401).send("Unauthorized user.");
  }

  try {
    // Verifying token for authorization
    const data = await jwt.verify(authToken, AUTH_SECRET_KEY);

    // Setting user data to request
    req.userData = data;
    return next();
  } catch (error) {
    return res.status(401).send("Unauthorized user.");
  }
};

module.exports = {
  authorize: authorize,
};
