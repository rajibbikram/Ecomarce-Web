import React, { useState } from "react";
import { Link } from "react-router-dom";
import Search from "../../Search/Search";
import LoginSignUp from "../../User/LoginSignUp"; // adjust path as needed
import './header.css';
import { useSelector } from "react-redux";

const Header = () => {
    const [showLogin, setShowLogin] = useState(false);
    const { loading, error, isAuthenticated } = useSelector((state) => state.user || { loading: false, error: null, isAuthenticated: false });

    return (
        <header className="ecom-header">
            <div className="logo">Ecomarce</div>

            <nav className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/">Abouts</Link>
                <Link to="/">Contact</Link>
            </nav>

            <div className="search-section">
                <Search />
            </div>

            <div className="header-icons">
                <Link to="/"><i className="fas fa-shopping-cart"></i></Link>
                <span onClick={() => setShowLogin(true)}>
                    <i className="fa-solid fa-right-to-bracket"></i>
                </span>
            </div>

            <div className="menu-toggle"><i className="fas fa-bars"></i></div>

            {showLogin && (
                <div className="login-modal-overlay" onClick={() => setShowLogin(false)}>
                    <div className="login-modal" onClick={e => e.stopPropagation()}>
                        <LoginSignUp onClose={() => setShowLogin(false)} />
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
