import { Typography } from "@mui/material";
import "./ConfirmOrder.css";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import CheckOutSteps from "./CheckOutSteps";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pinCode}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order ©ShopKart™" />
      <CheckOutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div className="confirmShippingArea">
          <Typography>Shipping Info</Typography>
          <div className="confirmShippingAreaBox">
            <div>
              <p>Name:</p>
              <span>{user && user.name}</span>
            </div>
            <div>
              <p>Phone:</p>
              <span>{shippingInfo.phoneNo}</span>
            </div>
            <div>
              <p>Address:</p>
              <span>{address}</span>
            </div>
          </div>

          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product"></img>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity} X {item.price} ={" "}
                      <b>Rs.{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="orderSummary">
          <Typography>Order Summary</Typography>
          <div>
            <div>
              <p>Subtotal:</p>
              <span>Rs.{subtotal}</span>
            </div>
            <div>
              <p>Shipping Charges:</p>
              <span>Rs.{shippingCharges}</span>
            </div>
            <div>
              <p>GST(18% Applicable):</p>
              <span>Rs.{tax}</span>
            </div>
          </div>
          <div className="orderSummaryTotal">
            <p>
              <b>Total:</b>
            </p>
            <span>Rs.{totalPrice}</span>
          </div>
          <button onClick={proceedToPayment}>Proceed To Payment</button>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
