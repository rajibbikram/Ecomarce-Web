import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import "./orderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <Typography>Your order has been placed successfully!</Typography>

      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
