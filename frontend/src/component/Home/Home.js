import React, { Fragment, useEffect } from "react";
import "./Home.css";
import { CgMouse } from "react-icons/cg";
import ProductCard from "./ProductCard.js";
import { getProducts } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const Home = () => {
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    dispatch(getProducts());
  }, [dispatch, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Home ©ShopKart™" />
          <div className="banner">
            <LocalShippingIcon />

            <p>Welcome To ShopKart™</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
        
          </div>
          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <div className="allProductsBtn">
          <a href="/products">
              <button>
                View All <CgMouse />
              </button>
            </a>
          </div>
        
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
