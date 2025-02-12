import { Rate } from 'antd';
import { useState } from 'react';

import './RatingStars.css';
import postRating from '../../services/postRating';

function RatingStars({ movieID, disabled }) {
  const [value, setValue] = useState(0);

  const storedRatings = JSON.parse(localStorage.getItem('myRatings'));
  const myRatingOfThisMovie = storedRatings[movieID];
  if (value !== myRatingOfThisMovie) setValue(myRatingOfThisMovie);

  const rateMovie = (stars, id) => {
    setValue(stars);
    postRating(stars, id);
  };

  return (
    <div className="ratingStars">
      <Rate
        allowHalf
        value={value}
        disabled={disabled}
        onChange={(stars) => rateMovie(stars, movieID)}
        style={{ fontSize: '16px' }}
        count={10}
      />
    </div>
  );
}

export default RatingStars;
