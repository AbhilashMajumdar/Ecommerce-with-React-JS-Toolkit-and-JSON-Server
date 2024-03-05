import React from 'react'
import { FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";

const ProductRating = ({rating}) => {
  return (
    <>
        <span>
            {rating >= 1 ? <FaStar color='yellow'/> : rating >= 0.5 ? <FaRegStarHalfStroke color='yellow' /> : <FaRegStar color='yellow'/>}
        </span>
        <span>
            {rating >= 2 ? <FaStar color='yellow'/> : rating >= 1.5 ? <FaRegStarHalfStroke color='yellow'/> : <FaRegStar color='yellow'/>}
        </span>
        <span>
            {rating >= 3 ? <FaStar color='yellow'/> : rating >= 2.5 ? <FaRegStarHalfStroke color='yellow'/> : <FaRegStar color='yellow'/>}
        </span>
        <span>
            {rating >= 4 ? <FaStar color='yellow'/> : rating >= 3.5 ? <FaRegStarHalfStroke color='yellow'/> : <FaRegStar color='yellow'/>}
        </span>
        <span>
            {rating >= 5 ? <FaStar color='yellow'/> : rating >= 4.5 ? <FaRegStarHalfStroke color='yellow'/> : <FaRegStar color='yellow'/>}
        </span>
    </>
  )
}

export default ProductRating 