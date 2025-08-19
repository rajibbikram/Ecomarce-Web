import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../layout/Loader";

const ProductRoute = ({ element }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation();

  // Show loader while checking authentication
  if (loading) {
    return <Loader />;
  }

  // If authenticated, render the protected component
  if (isAuthenticated) {
    return element;
  }

  // If not authenticated, redirect to login with return location
  return <Navigate to="/login" replace state={{ from: location }} />;
};

export default ProductRoute;
