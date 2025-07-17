import React from "react";
import ReactStars from "react-rating-stars-component";
import "./ProductDetails.css";

const getInitial = (name) => name ? name.charAt(0).toUpperCase() : "U";

const ReviewCard = ({ review }) => {
  return (
    <div className="reviewCard">
      <div className="reviewCardHeader">
        <div className="reviewAvatar">
          {review.avatar ? (
            <img src={review.avatar} alt={review.name} />
          ) : (
            <span className="avatarInitial">{getInitial(review.name)}</span>
          )}
        </div>
        <span className="reviewerName">{review.name}</span>
        <ReactStars
          count={5}
          value={review.rating}
          edit={false}
          size={20}
          isHalf={true}
          color="rgba(20,20,20,0.1)"
          activeColor="#ffd700"
        />
      </div>
      <p className="reviewComment">{review.comment}</p>
      {review.date && (
        <span className="reviewDate">
          {new Date(review.date).toLocaleDateString()}
        </span>
      )}
    </div>
  );
};

export default ReviewCard;
