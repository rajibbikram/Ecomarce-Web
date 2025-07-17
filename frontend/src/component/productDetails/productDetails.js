import React, { Fragment, useEffect, useState } from "react";
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productActions";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import MetaData from "../layout/MetaData";
import ReviewCard from "./reviewCard";
import Loader from "../layout/Loader";

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);

    // Review modal state
    const [showReview, setShowReview] = useState(false);
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewComment, setReviewComment] = useState("");

    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );

    useEffect(() => {
        dispatch(getProductDetails(id));
    }, [dispatch, id]);

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "#ffd700",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product?.ratings || 0,
        isHalf: true,
    };

    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity <= 1) return;
        setQuantity(quantity - 1);
    };

    // Review form handlers
    const openReviewForm = () => setShowReview(true);
    const closeReviewForm = () => {
        setShowReview(false);
        setReviewRating(0);
        setReviewComment("");
    };
    const handleReviewSubmit = (e) => {
        e.preventDefault();
        // For now, just close the modal. Backend integration will come next.
        closeReviewForm();
    };

    // If still loading or product not loaded yet, show a fallback
    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (!product || !product._id) {
        return <div className="error">Product not found</div>;
    }

    return (
        <Fragment>
            <MetaData title={`${product.name} -- Ecomarce`} />
            <div className="ProductDetails">
                <div className="product-details-container">
                    <div className="product-images">
                        <Carousel>
                            {product.images &&
                                product.images.map((item, i) => (
                                    <img
                                        className="CarouselImage"
                                        key={item.url}
                                        src={item.url}
                                        alt={`${product.name} - ${i + 1}`}
                                    />
                                ))}
                        </Carousel>
                    </div>

                    <div className="product-info">
                        <div className="detailsBlock-1">
                            <h2>{product.name}</h2>
                            <p>Product # {product._id}</p>
                        </div>

                        <div className="detailsBlock-2">
                            <ReactStars {...options} />
                            <span>({product.numOfReviews} Reviews)</span>
                        </div>

                        <div className="detailsBlock-3">
                            <h1>₹{product.price}</h1>
                            <div className="detailsBlock-3-1">
                                <div className="detailsBlock-3-1-1">
                                    <button onClick={decreaseQuantity}>-</button>
                                    <input value={quantity} type="number" readOnly />
                                    <button onClick={increaseQuantity}>+</button>
                                </div>
                                <button className="add-to-cart-btn" disabled={product.Stock < 1}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        <p>
                            Status: {" "}
                            <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                {product.Stock < 1 ? "OutOfStock" : "InStock"}
                            </b>
                        </p>

                        <div className="detailsBlock-4">
                            Description: <p>{product.description}</p>
                        </div>

                        <button className="submitReview" onClick={openReviewForm}>Submit Review</button>

                        {showReview && (
                            <div className="reviewModal">
                                <div className="reviewModalContent">
                                    <h2>Submit Your Review</h2>
                                    <form onSubmit={handleReviewSubmit}>
                                        <div className="reviewStars">
                                            <ReactStars
                                                count={5}
                                                value={reviewRating}
                                                onChange={setReviewRating}
                                                size={30}
                                                activeColor="#ffd700"
                                            />
                                        </div>
                                        <textarea
                                            className="reviewTextarea"
                                            value={reviewComment}
                                            onChange={e => setReviewComment(e.target.value)}
                                            placeholder="Write your review here..."
                                            rows={4}
                                            required
                                        />
                                        <div className="reviewModalActions">
                                            <button type="button" onClick={closeReviewForm}>Cancel</button>
                                            <button type="submit" className="submitReview">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Reviews Section */}
                        <div className="productReviewsSection">
                            <h3>Customer Reviews</h3>
                            {product.reviews && product.reviews.length > 0 ? (
                                product.reviews.map((review, idx) => (
                                    <ReviewCard key={review._id || idx} review={review} />
                                ))
                            ) : (
                                <p className="noReviews">No reviews yet.</p>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ProductDetails;
