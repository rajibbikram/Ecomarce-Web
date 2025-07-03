import React from "react";
import './footer.css';

const Footer = () => {
  return (
    <>
      <footer className="ecom-footer">
        <div className="footer-content">
            <div className="footer-section">
                <h3>ShopEase</h3>
                <p>Your one-stop shopping destination</p>
            </div>
            <div className="footer-section">
                <h4>Quick Links</h4>
                <a href="/">Home</a>
                <a href="/">Shop</a>
                <a href="/">Contact</a>
            </div>
            <div className="footer-section">
                <h4>Follow Us</h4>
                <div className="social-links">
                    <a href="/"><i className="fab fa-facebook"></i></a>
                    <a href="/"><i className="fab fa-twitter"></i></a>
                    <a href="/"><i className="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
        <div className="footer-bottom">
            &copy; 2025 Ecomarce. All rights reserved.
        </div>
    </footer>
    </>
  );
};

export default Footer;
