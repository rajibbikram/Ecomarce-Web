import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./header.css";
import { SpeedDial, SpeedDialAction } from "@mui/lab";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // ✅ Fixed import
import { useNavigate } from "react-router-dom";
import { logout } from "../../../actions/userAction";
import { Backdrop } from "@mui/material";
import { toast } from 'react-toastify';

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  // Handlers for navigation
  const dashboard = () => navigate("/admin/dashboard");
  const orders = () => navigate("/orders");
  const account = () => navigate("/account");
  const cart = () => navigate("/cart");
  const logoutUser = () => {
    dispatch(logout());
    toast.success("Logout successful!", {
      position: "top-center",
      autoClose: 2000,
    });
    // Redirect to login page after logout
    navigate("/login");
  };

  // Action list
  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ShoppingCartIcon />, name: `Cart(${cartItems.length})`, func: cart }, 
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  // If admin, prepend Dashboard option
  if (user?.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "11" }} />
      <SpeedDial
        className="speedDial"
        ariaLabel="User Options"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        icon={
          <img
            className="SpeedDialIcon"
            src={user?.avatar?.url || "/Profile.png"}
            alt="Profile"
            style={{ width: 50, height: 50, borderRadius: "50%" }}
          />
        }
      >
        {options.map(({ icon, name, func }) => (
          <SpeedDialAction
            key={name}
            icon={icon}
            tooltipTitle={name}
            onClick={func}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
