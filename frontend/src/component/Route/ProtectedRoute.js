import React, { Fragment } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, loading, isAdminPath, isAdmin }) => {
  if (isAuthenticated === false && loading === false && isAdminPath === false) {
    return <Navigate to="/login" />;
  }

  if (isAdminPath === true && loading === false && isAdmin === false) {
    return <Navigate to="/" />;
  }

  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};

export default ProtectedRoute;
