import React from "react";
import "./Star.css";

import {FaStar,FaStarHalfAlt} from 'react-icons/fa'
import { AiOutlineStar} from 'react-icons/ai'



const Star = ({ rating, count }) => {
  const productRating = Array.from({ length: 5 }, (elem, index) => {
    return (
      <span key={index}>
        {rating >= index + 1 ? (
          <FaStar className="rating-icon" />
         
        ) :rating >= index + 0.5 ? (
          <FaStarHalfAlt className="rating-icon" />
        ) : (
          <AiOutlineStar className="rating-icon" />
        ) }
      </span>
    );
  });
  return (
    <>
      <div className="stars">
        {productRating}
        
      </div>
    </>
  );
};

export default Star;
