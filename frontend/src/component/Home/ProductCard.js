import React from "react";
import { NavLink } from "react-router-dom";
import { Rating } from "@mui/material";
import "../Home/Home.css";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <NavLink className="productCard" to={`/product/${product._id}`}>
      <div className="imageCard">
        <img src={product.images[0].url} alt="product"></img>
      </div>
      <p>{product.name}</p>
      <div>
        <Rating {...options} />
        <span>({product.numOfReviews} Reviews)</span>
      </div>
      <span>Rs.{product.price}</span>
    </NavLink>
  );
};

export default ProductCard;
