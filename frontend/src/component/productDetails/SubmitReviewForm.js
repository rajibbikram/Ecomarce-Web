import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { submitReview } from "../../actions/reviewActions";
import { NEW_REVIEW_RESET } from "../../constants/reviewConstants";
import { useAlert } from "react-alert";

const SubmitReviewForm = ({ productId }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, success, error } = useSelector((state) => state.newReview);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const reviewData = { rating, comment, productId };
    dispatch(submitReview(reviewData));
  };

  useEffect(() => {
    if (success) {
      alert.success("Review Submitted Successfully!");
      dispatch({ type: NEW_REVIEW_RESET });
      setComment("");
      setRating(0);
    }

    if (error) {
      alert.error(error);
    }
  }, [dispatch, success, error, alert]);

  return (
    <form className="reviewForm" onSubmit={submitHandler}>
      <h3>Submit Your Review</h3>

      <ReactStars
        count={5}
        size={30}
        value={rating}
        isHalf={true}
        onChange={ratingChanged}
        activeColor="#ffd700"
      />

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
        required
      />

      <button type="submit" disabled={loading || rating === 0}>
        Submit Review
      </button>
    </form>
  );
};

export default SubmitReviewForm;
