require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const connectToMongoDB = require("./src/utils/mongoose");
connectToMongoDB();

// controller Imports
const couponRoutes = require("./src/routes/+user/coupon");
const dealerRoutes = require("./src/routes/+user/dealer");
const fanDeckRoutes = require("./src/routes/+open/fan-deck");
const authenticationRoutes = require("./src/routes/+user/authentication");
const productRoutes = require("./src/routes/+products/product");
const { authorize, adminAuthorize } = require("./src/utils/auth");

const port = process.env.PORT || 8080;

var app = express();

app.use(cors({ origin: true }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.json({ limit: "50mb" }));

// Health-check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: true,
    uptime: process.uptime(), // how long the process has been running
    timestamp: new Date().toISOString(), // current time
  });
});

// app.use("/admin/color", auth, colorRoutes.routes);
// app.use("/admin/dimension", auth, dimensionRoutes.routes);
// app.use("/admin/product-name", auth, productNameRoutes.routes);
// app.use("/cashier/product", auth, productCashierRoutes.routes);
// app.use("/admin/product", auth, productAdminRoutes.routes);
// app.use("/cashier/client", auth, clientRoutes.routes);
// app.use("/cashier/invoice", auth, invoiceRoutes.routes);

//without auth
app.use("/api/auth", authenticationRoutes.routes); // Api includes createUser, VerifyOtp and isAuthenticated
app.use("/api/coupon", authorize, couponRoutes.routes); // Api includes coupon generation and redemption
app.use("/api/dealer", adminAuthorize, dealerRoutes.routes); // Api dealer ledger
app.use("/api/product", productRoutes.routes); // Api products
app.use("/fan-deck", fanDeckRoutes.routes);

app.listen(port, () => console.log(`server is running at port - ${port}`));
