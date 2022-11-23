import React, { Fragment, useEffect } from "react";
import "./MyOrders.css";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { myOrders } from "../../actions/orderAction";
import { toast } from "react-toastify";
import LaunchIcon from "@mui/icons-material/Launch";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params)=>{
        return(
          <Link to={`/order/${params.getValue(params.id,"id")}`}><LaunchIcon/></Link>
        )
      }
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
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
    }
    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title={user && `${user.name}'s - Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <br />
          <br />

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={25}
            autoHeight
            disableSelectionOnClick
            className="myOrdersTable"
          />
          <Typography id="myOrdersHeading">
            {user && user.name}'s Orders
          </Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
