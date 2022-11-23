const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../Controllers/paymentController");
const router = express.Router();
const { isAuthenticatedUser } = require("../MiddleWare/auth");

router.route("/payment/process").post( isAuthenticatedUser,processPayment);

router.route("/stripeapikey").get(isAuthenticatedUser,sendStripeApiKey);

module.exports = router;
