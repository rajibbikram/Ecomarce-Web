import React from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import './About.css';
import bikalp from '../../image/bikalp.jpg';
import Rajib from '../../image/rajib.jpg';

const AboutPage = () => {
  return (
    <div className="about-container">
      <MetaData title="About Us - Ecomarce" />
      

      <div className="about-content container my-5">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h2>Our Story</h2>
            <p>
              Founded in 2023, Ecomarce has quickly grown to become a leading e-commerce platform, 
              offering a wide range of products to customers worldwide. Our mission is to provide 
              high-quality products with exceptional customer service.
            </p>
            <p>
              What started as a small online store has now transformed into a comprehensive 
              shopping destination, thanks to our dedicated team and loyal customers.
            </p>
          </div>
          <div className="col-lg-6">
            <img 
              src="/images/about-hero.jpg" 
              alt="Our Team" 
              className="img-fluid rounded shadow"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/default-about.jpg';
              }}
            />
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="about-icon mb-3">
                  <i className="fas fa-shipping-fast fa-3x text-primary"></i>
                </div>
                <h4>Fast Delivery</h4>
                <p>We deliver your orders quickly and efficiently to your doorstep.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="about-icon mb-3">
                  <i className="fas fa-shield-alt fa-3x text-primary"></i>
                </div>
                <h4>Secure Payments</h4>
                <p>Your transactions are safe with our secure payment gateway.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="about-icon mb-3">
                  <i className="fas fa-headset fa-3x text-primary"></i>
                </div>
                <h4>24/7 Support</h4>
                <p>Our customer support team is always here to help you.</p>
              </div>
            </div>
          </div>
        </div>

        {/* New Team Section */}
        <div className="team-section text-center mt-5">
          <h2>Meet Our Team</h2>
          <p className="lead mb-4">The passionate people behind Ecomarce</p>

          <div className="row justify-content-center">
            {/* Card 1 */}
            <div className="col-md-5 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={Rajib}
                  alt="Rajib Bikram Shah"
                  className="card-img-top rounded-circle mx-auto mt-4"
                  style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-avatar.png";
                  }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Rajib Bikram Shah</h5>
                  <h6 className="text-muted">Founder & CEO</h6>
                  <p className="card-text">
                    Passionate about building innovative e-commerce solutions that simplify online shopping for everyone.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-md-5 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={bikalp}
                  alt="Bikalpa Tharu"
                  className="card-img-top rounded-circle mx-auto mt-4"
                  style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-avatar.png";
                  }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Bikalpa Tharu</h5>
                  <h6 className="text-muted">Chief Technology Officer</h6>
                  <p className="card-text">
                    Expert in backend development and cloud infrastructure, ensuring our platform is fast, reliable, and secure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <h2>Why Choose Us?</h2>
          <p className="lead">We're committed to providing the best shopping experience</p>
          
          <div className="row mt-4">
            <div className="col-md-6 text-start">
              <ul className="list-unstyled">
                <li className="mb-3">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  Wide selection of quality products
                </li>
                <li className="mb-3">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  Competitive prices and regular discounts
                </li>
                <li className="mb-3">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  Easy returns and exchanges
                </li>
              </ul>
            </div>
            <div className="col-md-6 text-start">
              <ul className="list-unstyled">
                <li className="mb-3">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  User-friendly shopping experience
                </li>
                <li className="mb-3">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  Fast and reliable shipping
                </li>
                <li className="mb-3">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  Secure payment options
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section py-5 bg-light">
        <div className="  text-center">
          <h2>Ready to Shop?</h2>
          <p className="lead mb-4">Discover our amazing collection of products today!</p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
