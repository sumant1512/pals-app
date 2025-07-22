require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const connectToMongoDB = require("./src/utils/mongoose");
connectToMongoDB();

// controller Imports
const productRoutes = require("./src/routes/+product/product");
const fanDeckRoutes = require("./src/routes/+open/fan-deck");
const authenticationRoutes = require("./src/routes/+user/authentication");
const orderRoutes = require("./src/routes/+user/orders");
const cartRoutes = require("./src/routes/+user/cart");
const { authorize } = require("./src/utils/auth");

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

// app.use("/admin/color", auth, colorRoutes.routes);
// app.use("/admin/dimension", auth, dimensionRoutes.routes);
// app.use("/admin/product-name", auth, productNameRoutes.routes);
// app.use("/cashier/product", auth, productCashierRoutes.routes);
// app.use("/admin/product", auth, productAdminRoutes.routes);
// app.use("/cashier/client", auth, clientRoutes.routes);
// app.use("/cashier/invoice", auth, invoiceRoutes.routes);

//without auth
app.use("/api/auth", authenticationRoutes.routes); // Api includes createUser, VerifyOtp and isAuthenticated
app.use("/api/product", productRoutes.routes); // Api includes crud operation fo product
app.use("/fan-deck", fanDeckRoutes.routes);
app.use("/order", authorize, orderRoutes.routes);
app.use("/cart", authorize, cartRoutes.routes);

app.listen(port, () => console.log(`server is running at port - ${port}`));
