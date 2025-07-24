import React, { useEffect } from "react";
import './home.css';
import ProductCard from "../product/productCard";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const dispatch = useDispatch();
    const { products, error } = useSelector((state) => state.products);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        dispatch(getProduct());
    }, [dispatch, error]);

    return (
        <main>
            <MetaData title="Ecomarce" />

            {/* HERO SECTION */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Welcome to <span>Ecomarce</span></h1>
                    <div className="hero-tagline">Your one-stop shop for tech, fashion, and more. Discover exclusive deals and new arrivals every day!</div>
                    <Link to="/products" className="btn-primary">Shop Now <span style={{marginLeft: '8px', fontWeight: 'bold'}}>&rarr;</span></Link>
                </div>
            </section>

            {/* WHY SHOP WITH US SECTION */}
            <section className="why-shop">
                <div className="why-shop-item">
                    <span className="why-icon">🚚</span>
                    <p>Free Shipping</p>
                </div>
                <div className="why-shop-item">
                    <span className="why-icon">🔒</span>
                    <p>Secure Payment</p>
                </div>
                <div className="why-shop-item">
                    <span className="why-icon">↩️</span>
                    <p>Easy Returns</p>
                </div>
                <div className="why-shop-item">
                    <span className="why-icon">💬</span>
                    <p>24/7 Support</p>
                </div>
            </section>

            <hr className="section-divider" />
            <div className="product-list-center">
              <h2 className="product-list"><span className="header-icon">🛍️</span>Products</h2>
            </div>
            <section className="product-sec">
                {products && products.slice(0, 8).map((product) => (
                    <ProductCard key={product._id} Product={product} className="product-card" />
                ))}
            </section>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
                <Link to="/products" className="btn-primary home-more-btn">More</Link>
            </div>
        </main>
    );
};

export default Home;
