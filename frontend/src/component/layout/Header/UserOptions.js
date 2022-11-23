import React, { Fragment, useState } from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Profile from "../../../images/Profile.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import Backdrop from "@mui/material/Backdrop";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logOut } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {cartItems} = useSelector((state)=> state.cart)

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ShoppingCartIcon style={{color: cartItems.length >0 ?"tomato":"unset" }}/>, name: `Cart(${cartItems.length})`, func: cart },
    { icon: <ExitToAppIcon />, name: "LogOut", func: logout },
  ];

  if (user.role === "admin") {
    options.unshift({ icon: <DashboardIcon />, name: "DashBoard", func: dash });
  }

  function orders() {
    navigate("/orders");
  }
  function dash() {
    navigate("/admin/dashboard");
  }
  function account() {
    navigate("/account");
  }
  function cart() {
    navigate("/cart");
  }
  function logout() {
    redirect("/login");

    dispatch(logOut());
    toast.success("Logout Successfully", {
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

  return (
    <Fragment>
      <Backdrop open={open}  style={{ zIndex: "11" }}/>
      <SpeedDial
        className="speedDial"
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        style={{ zIndex: "11" }}
        direction="down"
        icon={
          <img
            src={user.avatar.url ? user.avatar.url : Profile}
            className="speedDialIcon"
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
