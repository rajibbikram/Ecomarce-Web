import React, { Fragment, useEffect, useState } from "react";
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productActions";
import { addItemToCart } from "../../actions/cardAction";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import MetaData from "../layout/MetaData";
import ReviewCard from "./reviewCard";
import Loader from "../layout/Loader";
import { toast } from "react-toastify";

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [showReview, setShowReview] = useState(false);
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewComment, setReviewComment] = useState("");

    const { product, loading, error } = useSelector((state) => state.productDetails);
    const { isAuthenticated } = useSelector((state) => state.user);

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

    const addToCartHandler = () => {
        if (!isAuthenticated) {
            toast.error("Please login first!");
            return;
        }
        dispatch(addItemToCart(product._id, quantity));
        toast.success("Item added to cart!");
    };

    const openReviewForm = () => setShowReview(true);
    const closeReviewForm = () => {
        setShowReview(false);
        setReviewRating(0);
        setReviewComment("");
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        // You may want to dispatch review submission here
        closeReviewForm();
        toast.success("Review submitted!");
    };

    if (loading) return <Loader />;
    if (error) return <div className="error">Error: {error}</div>;
    if (!product || !product._id) return <div className="error">Product not found</div>;

    return (
        <Fragment>
            <MetaData title={`${product.name} -- Ecommerce`} />
            <div className="ProductDetails">
                <div className="product-details-container">
                    <div className="product-images">
                        <Carousel>
                            {product.images && product.images.map((item, i) => (
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
                            <h1>RS {product.price}</h1>
                            <div className="detailsBlock-3-1">
                                <div className="detailsBlock-3-1-1">
                                    <button onClick={decreaseQuantity}>-</button>
                                    <input value={quantity} type="number" readOnly />
                                    <button onClick={increaseQuantity}>+</button>
                                </div>
                                <button
                                    className="add-to-cart-button"
                                    disabled={product.Stock <= 0}
                                    onClick={addToCartHandler}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        <p>
                            Status:
                            <b className={product.Stock <= 0 ? "redColor" : "greenColor"}>
                                {product.Stock <= 0 ? "OutOfStock" : "InStock"}
                            </b>
                        </p>

                        <div className="detailsBlock-4">
                            Description: <p>{product.description}</p>
                        </div>

                        <button className="submitReview" onClick={openReviewForm}>
                            Submit Review
                        </button>

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
