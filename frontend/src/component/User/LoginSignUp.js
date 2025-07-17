import React, { Fragment, useRef, useState } from "react";
import "./LoginSignUp.css";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch } from "react-redux";  // Uncomment when using Redux
 import { login, register } from "../actions/userActions";  // Uncomment when using Redux actions

const LoginSignUp = ({ onClose }) => {
 const dispatch = useDispatch(); // Uncomment when using Redux actions

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  // Login states
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");

  // Register states
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    console.log("Login submit called");
    // Uncomment to dispatch login action
     dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    console.log("Register submit called");
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    console.log("Sign Up Form Submitted");
    // Uncomment to dispatch register action
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

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");
      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");
      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <Fragment>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            position: "fixed",
            top: 2,
            left: 4,
            background: "#eee",
            border: "none",
            borderRadius: "4px",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            fontWeight: "bold",
            zIndex: 2200,
          }}
        >
          Back
        </button>
      )}
      <div className="LoginSignUpContainer">
        <div className="loginSignUpBox">
          <div>
            <div className="login_signUp_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
              <button ref={switcherTab}></button>
            </div>
          </div>

          {/* Login Form */}
          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setloginEmail(e.target.value)}
              />
            </div>

            <div className="loginPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setloginPassword(e.target.value)}
              />
            </div>

            <Link to="/password/forget">Forget Password?</Link>

            <input type="submit" value="Login" className="loginBtn" />
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
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={registerDataChange}
              />
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

            <input type="submit" value="Register" className="signUpBtn" />
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Fragment>
  );
};

export default LoginSignUp;
