import React from "react";
import './productCard.css';
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const ProductCard = ({ Product }) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "#ffd700",
        size: window.innerWidth < 600 ? 20 : 25,
        value: Product.ratings,
        isHalf: true,
    };

    return (
        <Link className="product" to={`/product/${Product._id}`}>
            <img src={Product.images[0].url} alt={Product.name} />
            <p>{Product.name}</p>
            <div>
                <ReactStars {...options} />
            </div>

            <span>({Product.numOfReviews} Reviews)
            </span>

            <span>Rs.{Product.price}</span>
        </Link>
    );
};

export default ProductCard;
