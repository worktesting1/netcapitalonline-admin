import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const adminToken = JSON.parse(sessionStorage.getItem("adminToken"));
  return adminToken ? <Outlet /> : <Navigate to={"/auth/login"} />;
};

export default PrivateRoute;
