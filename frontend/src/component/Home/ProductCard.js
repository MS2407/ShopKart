import React from "react";
import { NavLink } from "react-router-dom";
import { Rating } from "@mui/material";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <NavLink className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt="product"></img>
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
