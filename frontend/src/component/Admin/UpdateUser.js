import React, { Fragment, useEffect, useState } from "react";
import "./NewProduct.css";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import SideBar from "./SideBar";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Button1 from "@mui/material/Button";
import {
  clearErrors,
  getUserDetails,
  updateUser,
} from "../../actions/userAction";
import { toast } from "react-toastify";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import { useNavigate, useParams } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    error: updateError,
    isUpdated,
    loading: updateLoading,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(id, myForm));
  };

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
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
      toast.success("User Updated Successfully", {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      dispatch({ type: UPDATE_USER_RESET });
      navigate("/admin/users");
    }
  }, [dispatch, error, navigate, isUpdated, updateError, id, user]);

  return (
    <Fragment>
      <MetaData title="Update User --Admin" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading && <LinearProgress color="secondary" />}
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateUserSubmitHandler}
          >
            <h1>Update User</h1>
            <div>
              <PersonIcon />
              <input
                type="text"
                placeholder="User Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="User Email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div>
              <VerifiedUserIcon />
              <select onChange={(e) => setRole(e.target.value)} value={role}>
                <option value="">Choose Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            <Button1
              id="createProductBtn"
              type="submit"
              disabled={updateLoading ? true : false}
            >
              Update User
            </Button1>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
