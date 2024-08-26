// import React from "react";
import { Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  // const { userInfo } = useSelector((state) => state.auth);
  const userInfo = true;

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
