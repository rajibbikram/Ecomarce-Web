import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "../../Search/Search";
import LoginSignUp from "../../User/LoginSignUp";
import UserOptions from "./UserOptions";
import { useSelector } from "react-redux";
import "./header.css";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { loading, error, isAuthenticated, user } =
    useSelector((state) => state.user) || {};

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeOverlays = () => {
    setNavOpen(false);
    setShowLogin(false);
  };

  return (
    <>
      {/* mobile dark‑out */}
      <div
        className={`mobile-nav-overlay ${navOpen ? "active" : ""}`}
        onClick={closeOverlays}
      />

      <header className={`ecom-header ${scrolled ? "scrolled" : ""}`}>
        <div className="logo">Ecomarce</div>

        {/* main nav */}
        <nav className={`nav-links ${navOpen ? "active" : ""}`}>
          <Link to="/" onClick={() => setNavOpen(false)}>
            Home
          </Link>
          <Link to="/products" onClick={() => setNavOpen(false)}>
            Products
          </Link>
          <Link to="/about" onClick={() => setNavOpen(false)}>
            About
          </Link>
          <Link to="/contact" onClick={() => setNavOpen(false)}>
            Contact
          </Link>
          {/* Removed the search-in-drawer here */}
        </nav>

        {/* search stays visible on tablet‑plus */}
        <div className="search-section">
          <Search />
        </div>

        {/* cart + login */}
        <div className="header-icons">
          <Link to="/Cart">
            <i className="fas fa-shopping-cart" />
          </Link>
          {isAuthenticated ? (
            <UserOptions user={user} />
          ) : (
            <span onClick={() => setShowLogin(true)}>
              <i className="fa-solid fa-right-to-bracket" />
            </span>
          )}
        </div>

        {/* hamburger / close */}
        <button
          className="menu-toggle"
          aria-label="toggle menu"
          onClick={() => setNavOpen((p) => !p)}
        >
          <i className={`fas ${navOpen ? "fa-times" : "fa-bars"}`} />
        </button>
      </header>

      {/* login modal */}
      {showLogin && (
        <div className="login-modal-overlay" onClick={closeOverlays}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <LoginSignUp onClose={closeOverlays} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
