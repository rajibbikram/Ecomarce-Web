// components/ForgotPassword/ForgotPassword.jsx
import React, { Fragment, useEffect, useState } from "react";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../actions/userAction";        
import { CLEAR_ERROR } from "../../constants/userConstants";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERROR });
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message]);

  return (
    <Fragment>
      <div className="forgotPasswordContainer">
        <button
          className="profile-back-btn"
          onClick={() => navigate(-1)}
          aria-label="Go Back"
          type="button"
        >
          &#8592; Back
        </button>

        <div className="forgotPasswordUpBox">
          <h2>Forgot Password</h2>

          <form className="forgotPasswordForm" onSubmit={forgotPasswordSubmit}>
            <div className="forgotPasswordEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <input
              type="submit"
              value={loading ? "Loading..." : "Send"}
              className="forgotPasswordBtn"
              disabled={loading}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
