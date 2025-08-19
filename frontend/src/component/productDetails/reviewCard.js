import React from "react";
import ReactStars from "react-rating-stars-component";
import "./reviewCard.css";

const STAR_COUNT = 5;
const STAR_SIZE = 20;
const STAR_INACTIVE_COLOR = "rgba(20,20,20,0.1)";
const STAR_ACTIVE_COLOR = "#ffd700";

const getInitial = (name) => name?.charAt(0).toUpperCase() || "U";

const ReviewCard = ({ review }) => {
  const {
    avatar = null,
    name = "Unknown",
    rating = 0,
    comment = "No comment provided.",
    date = null,
  } = review || {};

  return (
    <div className="reviewCard">
      <div className="reviewCardHeader">
        <div className="reviewAvatar">
          {avatar ? (
            <img src={avatar} alt={name} />
          ) : (
            <span className="avatarInitial">{getInitial(name)}</span>
          )}
        </div>

        <span className="reviewerName">{name}</span>

        <ReactStars
          count={STAR_COUNT}
          value={rating}
          edit={false}
          size={STAR_SIZE}
          isHalf={true}
          color={STAR_INACTIVE_COLOR}
          activeColor={STAR_ACTIVE_COLOR}
        />
      </div>

      <p className="reviewComment">{comment}</p>

      {date && (
        <span className="reviewDate">
          {new Date(date).toLocaleDateString()}
        </span>
      )}
    </div>
  );
};

export default ReviewCard;
