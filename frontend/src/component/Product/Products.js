import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";

const categories = ["Laptop", "Footwear", "Clothes", "Camera", "SmartPhone"];

const Products = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 200000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };
  const ratingsHandler = (e, newRating) => {
    setRatings(newRating);
  };

  const resetFilter = (e) => {
    setPrice([0, 200000]);
    setCategory("");
    setRatings(0);
    navigate("/products");
  };

  const {
    products,
    error,
    productsCount,
    loading,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

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
    dispatch(getProducts(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Products ©ShopKart™" />
          <h2 className="productHeading">Ⓟⓡⓞⓓⓤⓒⓣⓢ</h2>
          {keyword && (
            <h2 className="keywordHeading">Search Results for : {keyword}</h2>
          )}
          {category && (
            <h2 className="searchHeading">
              Search Results for Category : {category}
            </h2>
          )}

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <button onClick={resetFilter} className="resetFilterBtn">
              Clear Filters
            </button>
            <fieldset>
              <br />

              <Typography component="legend">Price Range</Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                color="error"
                step={1000}
                min={0}
                max={200000}
                thumbSizeSmall
              />
            </fieldset>
            <fieldset>
              <Typography component="legend">Category</Typography>
              <ul className="categoryBox">
                {categories.map((cat) => (
                  <li
                    className={
                      cat === category
                        ? "category-link-active"
                        : "category-link"
                    }
                    key={cat}
                    onClick={() => setCategory(cat)}
                  >
                    ☛{cat}
                  </li>
                ))}
              </ul>
            </fieldset>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <br />

              <Slider
                value={ratings}
                onChange={ratingsHandler}
                min={0}
                max={5}
                color="error"
                valueLabelDisplay="on"
              />
            </fieldset>
          </div>

          {resultPerPage < filteredProductsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
