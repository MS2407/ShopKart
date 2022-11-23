import React, { Fragment } from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Typography } from "@mui/material";
import CartItemCard from "./CartItemCard";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const navigate = useNavigate();

  const increaseQty = (id, quantity, stock) => {
    if (stock <= quantity) {
      return;
    }
    const newQty = quantity + 1;

    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    if (quantity <= 1) {
      return;
    }
    const newQty = quantity - 1;

    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkOutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Fragment>
      <MetaData title={"Cart ©ShopKart™"} />
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button
                      onClick={() => decreaseQty(item.product, item.quantity)}
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly></input>
                    <button
                      onClick={() =>
                        increaseQty(item.product, item.quantity, item.stock)
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`Rs.${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}
          </div>
          <div className="cartGrossProfit">
            <div></div>
            <div className="cartGrossProfitBox">
              <p>Gross Total</p>
              <p>
                Rs.{cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0)}
              </p>
            </div>
          </div>
          <div className="checkOutBtn">
            <button onClick={checkOutHandler}>CheckOut</button>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
