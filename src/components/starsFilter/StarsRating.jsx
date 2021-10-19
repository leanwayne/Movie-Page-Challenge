import React from 'react';
import { Rating } from 'react-simple-star-rating';

export default function StarsRating({rating, setRating}) {

    const handleRating = (rate) => {
        setRating(rate);
        if(rating === rate) setRating(0);
    };

    return (
        <div>
            <Rating onClick={handleRating} ratingValue={rating} stars={5} />
        </div>
    );
};