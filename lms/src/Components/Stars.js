import React, { useState } from "react";

const Stars = ({ defaultRating = 5 }) => {
  const [rating, setRating] = useState(defaultRating);

  return (
    <div className="stars-container">
      {[1,2,3,4,5].map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? "filled" : ""}`}
          onClick={() => setRating(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Stars;
