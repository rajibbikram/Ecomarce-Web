import React, { useEffect } from "react";
import './home.css';
import ProductCard from "../product/productCard";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import tech from "../../image/tech.jpg";
import fruits from "../../image/fruits.jpg";
import clothes from "../../image/clothes.jpeg"

const Home = () => {
    const dispatch = useDispatch();

    const { products, error } = useSelector((state) => state.products);

    useEffect(() => {
        if (error) {
            toast.error(error);  // <-- Replaced alert.error with toast.error
        }
        dispatch(getProduct());
    }, [dispatch, error]);

    return (
        <main>
            <MetaData title="Ecomarce" />

            <div className="hero-slider">
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="0"
                            className="btn11 active"
                            aria-current="true"
                            aria-label="Slide 1"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="1"
                            className="btn11"
                            aria-label="Slide 2"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="2"
                            className="btn11"
                            aria-label="Slide 3"
                        ></button>
                    </div>

                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={tech} className="d-block w-100" alt="tech" />
                        </div>
                        <div className="carousel-item">
                            <img src={fruits} className="d-block w-100" alt="tech" />
                        </div>
                        <div className="carousel-item">
                            <img src={clothes} className="d-block w-100" alt="tech" />
                        </div>
                    </div>

                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <section className="hero">
                <div className="hero-content">
                    <h1>Discover the<span> Latest Deals</span></h1>
                    <div className="hero-tagline">Your one-stop shop for tech, fashion, and fresh produce. Enjoy exclusive offers every day!</div>
                    <p>Shop top categories and get up to <span>50% OFF</span></p>
                    <Link to="/" className="btn-primary">Shop Now <span style={{marginLeft: '8px', fontWeight: 'bold'}}>&rarr;</span></Link>
                </div>
            </section>
            <hr className="section-divider" />
            <div className="product-list-center">
              <h2 className="product-list"><span className="header-icon">🛍️</span>Products</h2>
            </div>
            <section className="product-sec">
                {products && products.map((product) => (
                    <ProductCard key={product._id} Product={product} className="product-card" />
                ))}
            </section>
        </main>
    );
};

export default Home;
