import React, { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import "./header.css";
import { SpeedDial, SpeedDialAction } from "@mui/lab";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../actions/userAction";

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handlers for navigation
  const dashboard = () => navigate("/dashboard");
  const orders = () => navigate("/orders");
  const account = () => navigate("/account");
  const logoutUser = () => {
    dispatch(logout());
    alert("Logout Successfully!");
  };

  // Action list
  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
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
      <SpeedDial
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
            style={{ width: 40, height: 40, borderRadius: "50%" }}
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
