import React, { useEffect, useState } from "react";
import "./ResetPassword.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../actions/userAction";
import { toast } from "react-toastify";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";

import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import MetaData from "../layout/MetaData";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams(); // assuming /password/reset/:token

  const { error, success, loading } = useSelector(
    (state) => state.forgetPassword 
  );

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    dispatch(resetPassword(token, { password: newPassword, confirmPassword }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }

    if (success) {
      toast.success("Password updated successfully!");
      navigate("/login");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, success, navigate]);

  return (
    <>
      <MetaData title="Reset Password" />
      <div className="resetPasswordContainer">
        <button
          className="password-back-btn"
          onClick={() => navigate(-1)}
          aria-label="Go Back"
          type="button"
        >
          ← Back
        </button>

        <div className="resetPasswordUpBox">
          <h2>Reset Password</h2>

          <form className="resetPasswordForm" onSubmit={submitHandler}>
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
                onClick={() => setShowNewPassword(!showNewPassword)}
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
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
            </div>

            <button
              type="submit"
              className="resetPasswordBtn"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
