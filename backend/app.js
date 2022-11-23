const express = require("express");
const app = express();
const errorMiddleware = require("./MiddleWare/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

//connect config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

//Use to post  json
app.use(express.json({ limit: "50mb" }));

app.use(cookieParser());

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(fileUpload());

//Route Imports
const product = require("./Routes/productRoute");
const user = require("./Routes/userRoute");
const order = require("./Routes/orderRoute");
const payment = require("./Routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

//Middleware for error
app.use(errorMiddleware);

module.exports = app;
