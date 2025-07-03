import React from "react";
import './header.css';

const Header = () => {
    return (
        <header className="ecom-header">
        <div className="logo">Ecomarce</div>
    
        <nav className="nav-links">
            <a href="/">Home</a>
            <a href="/">Shop</a>
            <a href="/">Deals</a>
            <a href="/">Contact</a>
        </nav>
    
        <div className="header-icons">
            <a href="/"><i className="fas fa-search"></i></a>
            <a href="/"><i className="fas fa-shopping-cart"></i></a>
        </div>
    
        <div className="menu-toggle"><i className="fas fa-bars"></i></div>
    </header>
    );
};

export default Header;
