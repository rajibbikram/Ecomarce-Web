import React, { Fragment, useEffect, useState } from "react";
import "./UpdatePassword.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../actions/userAction";
import { toast } from "react-toastify";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";

import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Fallback to empty object to avoid destructuring undefined
  const {
    error = null,
    isUpdated = false,
    loading = false,
  } = useSelector((state) => state.passwordUpdate || {});

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password visibility states
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error("New password and confirm password do not match.");
    }

    dispatch(updatePassword({ oldPassword, newPassword, confirmPassword }));
  };

  // Password toggle functions
  const toggleOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: UPDATE_PASSWORD_RESET }); // clear error after toast
    }

    if (isUpdated) {
      toast.success("Password updated successfully!");
      navigate("/account");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, isUpdated, navigate]);

  return (
    <Fragment>
      <div className="updatePasswordContainer">
        {/* Back Button */}
        <button
          className="password-back-btn"
          onClick={() => navigate(-1)}
          aria-label="Go Back"
          type="button"
        >
          &#8592; Back
        </button>
        <div className="updatePasswordUpBox">
          <h2>Change Password</h2>

          <form className="updatePasswordForm" onSubmit={submitHandler}>
            <div className="loginPassword">
              <VpnKeyIcon />
              <input
                type={showOldPassword ? "text" : "password"}
                placeholder="Old Password"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={toggleOldPassword}
                aria-label={showOldPassword ? "Hide old password" : "Show old password"}
              >
                {showOldPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
            </div>

            <div className="loginPassword">
              <LockOpenIcon />
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={toggleNewPassword}
                aria-label={showNewPassword ? "Hide new password" : "Show new password"}
              >
                {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
            </div>

            <div className="loginPassword">
              <LockIcon />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={toggleConfirmPassword}
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
            </div>

            <button
              type="submit"
              className="updatePasswordBtn"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdatePassword;
