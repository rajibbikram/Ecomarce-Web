import React, { useState } from "react";
import { Link } from "react-router-dom";
import Search from "../../Search/Search";
import LoginSignUp from "../../User/LoginSignUp";
import UserOptions from "./UserOptions";
import { useSelector } from "react-redux";
import "./header.css";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user) || {};

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">
            <span role="img" aria-label="cart">🛒</span> Ecomarce
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
            </ul>
            <div className="d-flex align-items-center gap-3">
              <div className="d-none d-lg-block">
                <Search />
              </div>
              {isAuthenticated && (
                <Link to="/cart" className="btn btn-outline-primary position-relative">
                  <i className="fas fa-shopping-cart"></i>
                </Link>
              )}
              {isAuthenticated ? (
                <UserOptions user={user} />
              ) : (
                <button className="btn btn-primary" onClick={() => setShowLogin(true)}>
                  <i className="fa-solid fa-right-to-bracket me-2" />Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* login modal */}
      {showLogin && (
        <div className="login-modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="login-modal" onClick={e => e.stopPropagation()}>
            <LoginSignUp onClose={() => setShowLogin(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
