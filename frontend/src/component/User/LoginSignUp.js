import React, { useEffect, useRef, useState } from "react";
import "./LoginSignUp.css";
import { Link, useNavigate, Navigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { login, register, clearError } from "../../actions/userAction";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isAuthenticated, loading } = useSelector((state) => state.user);

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const { name, email, password } = user;
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/defaultAvatar.png");

  const [showBackButton, setShowBackButton] = useState(true);

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const toggleLoginPassword = () => {
    setShowLoginPassword(!showLoginPassword);
  };

  const toggleSignupPassword = () => {
    setShowSignupPassword(!showSignupPassword);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (isAuthenticated) {
      toast.success("Login successful!");
    }
  }, [dispatch, error, isAuthenticated]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");
      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    } else {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");
      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
    <>
      <MetaData title="Login or Sign Up" />
      <div className="LoginSignUpContainer">
        {/* Back Button */}
        {showBackButton && (
          <button
            className="login-back-btn"
            onClick={() => setShowBackButton(false)}
          >
            ← Back
          </button>
        )}

        <div className="loginSignUpBox">
          <div className="login_signUp_toggle">
            <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
            <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            <button ref={switcherTab}></button>
          </div>

          {/* Login Form */}
          <form
            className="loginForm shiftToNeutral"
            ref={loginTab}
            onSubmit={loginSubmit}
          >
            <div className="loginEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>

            <div className="loginPassword">
              <LockOpenIcon />
              <input
                type={showLoginPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={toggleLoginPassword}
                aria-label={showLoginPassword ? "Hide password" : "Show password"}
              >
                {showLoginPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
            </div>

            <Link to="/password/forgot">Forget Password?</Link>

            <input
              type="submit"
              value={loading ? "Loading..." : "Login"}
              className="loginBtn"
              disabled={loading}
            />
          </form>

          {/* Register Form */}
          <form
            className="signUpForm"
            ref={registerTab}
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
            <div className="signUpName">
              <FaceIcon />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={registerDataChange}
              />
            </div>

            <div className="signUpEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={registerDataChange}
              />
            </div>

            <div className="signUpPassword">
              <LockOpenIcon />
              <input
                type={showSignupPassword ? "text" : "password"}
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={registerDataChange}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={toggleSignupPassword}
                aria-label={showSignupPassword ? "Hide password" : "Show password"}
              >
                {showSignupPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
            </div>

            <div id="registerImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
              />
            </div>

            <input
              type="submit"
              value={loading ? "Loading..." : "Register"}
              className="signUpBtn"
              disabled={loading}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginSignUp;
