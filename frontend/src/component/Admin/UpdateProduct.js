import React, { Fragment, useEffect, useState } from "react";
import "./NewProduct.css";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import SideBar from "./SideBar";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Button1 from "@mui/material/Button";
import {
  clearErrors,
  getProductDetails,
  updateProduct,
} from "../../actions/productAction";
import { toast } from "react-toastify";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate, useParams } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { error, product } = useSelector((state) => state.productDetails);
  const {
    error: updateError,
    isUpdated,
    loading,
  } = useSelector((state) => state.delUpProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImagesPreview, setoldImagesPreview] = useState([]);

  const categories = ["Laptop", "Footwear", "Clothes", "Camera", "SmartPhone"];

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(updateProduct(id, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setoldImagesPreview([]);
    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      setoldImagesPreview([]);
      console.log(oldImagesPreview);
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setoldImagesPreview(product.images);
    }
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError, {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Product Updated Successfully", {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      dispatch({ type: UPDATE_PRODUCT_RESET });
      navigate("/admin/products");
    }
  }, [dispatch, error, navigate, isUpdated, updateError, id, product]);

  return (
    <Fragment>
      <MetaData title="Update Product --Admin" />

      <div className="outerLimit">
        <div className="dashboard">
          <SideBar />
          <div className="newProductContainer">
            {loading && <LinearProgress color="secondary" />}
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={updateProductSubmitHandler}
            >
              <h1>Update Product</h1>
              <div>
                <SpellcheckIcon />
                <input
                  type="text"
                  placeholder="Product Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <AttachMoneyIcon />
                <input
                  type="number"
                  placeholder="Price"
                  required
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </div>
              <div>
                <DescriptionIcon />
                <textarea
                  placeholder="Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="2"
                  cols="30"
                ></textarea>
              </div>
              <div>
                <AccountTreeIcon />
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <option value=""> Choose Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <StorageIcon />
                <input
                  type="number"
                  placeholder="Stock"
                  required
                  onChange={(e) => setStock(e.target.value)}
                  value={stock}
                />
              </div>
              <div id="createProductFormFile">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  multiple
                  onChange={updateProductImagesChange}
                />
              </div>

              <Button1
                id="createProductBtn"
                type="submit"
                disabled={loading ? true : false}
              >
                Update
              </Button1>
            </form>

            <div id="createProductFormImage" style={{ zIndex: 3 }}>
              {imagesPreview &&
                imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview"></img>
                ))}
            </div>
            <div id="createProductFormImage" style={{ zIndex: 2 }}>
              {oldImagesPreview &&
                oldImagesPreview.map((image, index) => (
                  <img key={index} src={image.url} alt="Product Preview" />
                ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
