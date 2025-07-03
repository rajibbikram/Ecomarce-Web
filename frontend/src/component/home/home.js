import React, { useEffect } from "react";
import './home.css';
import ProductCard from "../product/productCard";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productActions";  
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    return (
        <main>
            <MetaData title="Ecomarce" />
            <section className="hero">
                <div className="hero-content">
                    <h1>Discover the Latest Deals</h1>
                    <p>Shop top categories and get up to <span>50% OFF</span></p>
                    <Link to="/" className="btn-primary">Shop Now</Link>
                </div>
            </section>
            <h2 className="product-list">Products</h2>
            <section className="product-sec">
                {products && products.map((product) => (
                    <ProductCard key={product._id} Product={product} />
                ))}
            </section>
        </main>
    );
};

export default Home;
